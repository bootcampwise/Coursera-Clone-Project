import { prisma } from "../config/prisma";

export const enrollUser = async (userId: string, courseId: string) => {
  // Check if course exists
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) throw new Error("Course not found");

  if (course.status !== "Published")
    throw new Error("Course is not available for enrollment");

  // Check if already enrolled
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: { userId, courseId },
  });

  if (existingEnrollment)
    throw new Error("User already enrolled in this course");

  const enrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId,
      progress: 0,
      completed: false,
    },
    include: {
      course: {
        select: {
          title: true,
          thumbnail: true,
          instructor: { select: { name: true } },
        },
      },
    },
  });

  return enrollment;
};

export const getUserEnrollments = async (userId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          thumbnail: true,
          description: true,
          difficulty: true,
          category: true,
          instructor: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const courseIds = enrollments.map((e) => e.course.id);
  const reviews = await prisma.review.findMany({
    where: { userId, courseId: { in: courseIds } },
    select: { courseId: true, rating: true },
  });
  const reviewedByCourseId = new Map(
    reviews.map((r) => [r.courseId, r.rating]),
  );

  return enrollments.map((enrollment) => ({
    ...enrollment,
    hasReviewed: reviewedByCourseId.has(enrollment.course.id),
    myRating: reviewedByCourseId.get(enrollment.course.id) ?? null,
  }));
};

export const updateProgress = async (
  enrollmentId: string,
  userId: string,
  progress: number,
  completed: boolean,
) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });

  if (!enrollment) throw new Error("Enrollment not found");

  if (enrollment.userId !== userId) {
    throw new Error("Not authorized to update this enrollment");
  }

  const updatedEnrollment = await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progress,
      completed,
    },
  });

  return updatedEnrollment;
};

export const getCourseEnrollments = async (
  courseId: string,
  instructorId: string,
  userRole: string,
) => {
  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) throw new Error("Course not found");

  // Check ownership
  if (
    userRole.toLowerCase() !== "admin" &&
    course.instructorId !== instructorId
  ) {
    throw new Error("Not authorized to view enrollments for this course");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { courseId },
    include: {
      user: {
        select: { id: true, name: true, email: true, avatarUrl: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return enrollments;
};

export const getEnrollmentStatus = async (userId: string, courseId: string) => {
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId, courseId },
    select: { id: true },
  });

  return {
    isEnrolled: !!enrollment,
    enrollmentId: enrollment?.id || null,
  };
};

export const getStudentCourseProgress = async (
  userId: string,
  courseId: string,
) => {
  const [enrollment, modules] = await Promise.all([
    prisma.enrollment.findFirst({
      where: { userId, courseId },
      include: {
        lessonProgress: {
          select: { lessonId: true, completed: true, lastPlayed: true },
        },
      },
    }),
    prisma.module.findMany({
      where: { courseId },
      include: {
        lessons: {
          select: { id: true },
        },
      },
      orderBy: { order: "asc" },
    }),
  ]);

  if (!enrollment) return null;

  const completedLessonIds = new Set(
    enrollment.lessonProgress
      .filter((p) => p.completed)
      .map((p) => p.lessonId),
  );

  const moduleProgress = modules.map((module) => {
    const lessonIds = module.lessons.map((l) => l.id);
    const completedLessons = lessonIds.filter((id) =>
      completedLessonIds.has(id),
    ).length;
    const completed =
      lessonIds.length > 0 && completedLessons === lessonIds.length;
    return {
      moduleId: module.id,
      totalLessons: lessonIds.length,
      completedLessons,
      completed,
    };
  });

  return {
    enrollmentId: enrollment.id,
    progress: enrollment.progress,
    completed: enrollment.completed,
    lessonProgress: enrollment.lessonProgress,
    moduleProgress,
  };
};

export const updateLessonProgress = async (
  userId: string,
  enrollmentId: string,
  lessonId: string,
  data: {
    completed?: boolean;
    lastPlayed?: number;
    passed?: boolean;
    forceComplete?: boolean;
  },
) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });

  if (!enrollment) throw new Error("Enrollment not found");
  if (enrollment.userId !== userId) throw new Error("Unauthorized");

  const { completed: requestedCompleted, lastPlayed, passed, forceComplete } =
    data;

  // Enforce assessment and video completion rules
  let completed = requestedCompleted;
  if (completed) {
    const [lesson, existingProgress] = await Promise.all([
      prisma.lesson.findUnique({
        where: { id: lessonId },
        select: { type: true, duration: true },
      }),
      prisma.lessonProgress.findUnique({
        where: {
          enrollmentId_lessonId: { enrollmentId, lessonId },
        },
        select: { lastPlayed: true },
      }),
    ]);

    if (lesson?.type === "ASSESSMENT" && !passed) {
      completed = false;
    }

    if (lesson?.type === "VIDEO" && !forceComplete) {
      const duration = lesson.duration ?? 0;
      const lastPlayed =
        lastPlayed ?? existingProgress?.lastPlayed ?? 0;
      const watchedEnough =
        duration > 0 && lastPlayed >= Math.floor(duration * 0.98);
      if (!watchedEnough) completed = false;
    }
  }

  // Upsert lesson progress
  const progress = await prisma.lessonProgress.upsert({
    where: {
      enrollmentId_lessonId: {
        enrollmentId,
        lessonId,
      },
    },
    update: {
      ...(typeof lastPlayed === "number" ? { lastPlayed } : {}),
      completed,
    },
    create: {
      enrollmentId,
      lessonId,
      ...(typeof lastPlayed === "number" ? { lastPlayed } : {}),
      completed,
    },
  });

  // Recalculate course progress and completion
  // Progress: lesson-based completion percentage
  // Completion: module-based completion (all modules complete)
  const [totalLessons, completedLessons, modules, completedProgress] =
    await Promise.all([
      prisma.lesson.count({
        where: { module: { courseId: enrollment.courseId } },
      }),
      prisma.lessonProgress.count({
        where: { enrollmentId, completed: true },
      }),
      prisma.module.findMany({
        where: { courseId: enrollment.courseId },
        include: {
          lessons: {
            select: { id: true },
          },
        },
      }),
      prisma.lessonProgress.findMany({
        where: { enrollmentId, completed: true },
        select: { lessonId: true },
      }),
    ]);

  const completedLessonIds = new Set(
    completedProgress.map((p) => p.lessonId),
  );

  const totalModules = modules.length;
  const completedModules = modules.filter((module) => {
    if (!module.lessons || module.lessons.length === 0) return false;
    return module.lessons.every((lesson) =>
      completedLessonIds.has(lesson.id),
    );
  }).length;

  const newProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCompleted = totalModules > 0 && completedModules === totalModules;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progress: newProgress,
      completed: isCompleted,
    },
  });

  return progress;
};

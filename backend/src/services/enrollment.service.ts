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

  return enrollments;
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
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId, courseId },
    include: {
      lessonProgress: {
        select: { lessonId: true, completed: true, lastPlayed: true },
      },
    },
  });

  if (!enrollment) return null;

  return {
    enrollmentId: enrollment.id,
    progress: enrollment.progress,
    completed: enrollment.completed,
    lessonProgress: enrollment.lessonProgress,
  };
};

export const updateLessonProgress = async (
  userId: string,
  enrollmentId: string,
  lessonId: string,
  data: { completed?: boolean; lastPlayed?: number },
) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });

  if (!enrollment) throw new Error("Enrollment not found");
  if (enrollment.userId !== userId) throw new Error("Unauthorized");

  // Upsert lesson progress
  const progress = await prisma.lessonProgress.upsert({
    where: {
      enrollmentId_lessonId: {
        enrollmentId,
        lessonId,
      },
    },
    update: {
      ...data,
    },
    create: {
      enrollmentId,
      lessonId,
      ...data,
    },
  });

  // Recalculate course progress
  // 1. Get total lessons count
  const totalLessons = await prisma.lesson.count({
    where: { module: { courseId: enrollment.courseId } },
  });

  // 2. Get completed lessons count
  const completedLessons = await prisma.lessonProgress.count({
    where: { enrollmentId, completed: true },
  });

  // 3. Update enrollment progress
  const newProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCompleted = newProgress === 100;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progress: newProgress,
      completed: isCompleted,
    },
  });

  return progress;
};

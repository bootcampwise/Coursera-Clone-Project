import { prisma } from "../config/prisma";

export const enrollUser = async (userId: string, courseId: string) => {
  // Check if course exists
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) throw new Error("Course not found");

  if (!course.published)
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

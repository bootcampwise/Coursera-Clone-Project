import { prisma } from "../config/prisma";
import { verifyCourseOwnership } from "./course.service";

interface CreateLessonData {
  title: string;
  order: number;
  type?: "VIDEO" | "READING" | "ASSESSMENT";
  videoUrl?: string;
  content?: string;
  duration?: number;
}

interface UpdateLessonData {
  title?: string;
  type?: "VIDEO" | "READING" | "ASSESSMENT";
  videoUrl?: string;
  content?: string;
  duration?: number;
}

// Helper to get course ID from module
const getModuleCourseId = async (moduleId: string) => {
  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    select: { courseId: true },
  });
  if (!module) throw new Error("Module not found");
  return module.courseId;
};

// Helper to get course ID from lesson
const getLessonCourseId = async (lessonId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { module: { select: { courseId: true } } },
  });
  if (!lesson) throw new Error("Lesson not found");
  return lesson.module.courseId;
};

export const createLesson = async (
  moduleId: string,
  data: CreateLessonData,
  userId: string,
  userRole: string,
) => {
  const courseId = await getModuleCourseId(moduleId);
  await verifyCourseOwnership(courseId, userId, userRole);

  // STRICT VALIDATION: reject requests missing type
  if (!data.type) {
    throw new Error("Lesson type is required");
  }

  // Strict Type Enforcement: Clear unrelated fields
  if (data.type === "VIDEO") {
    data.content = undefined;
  } else if (data.type === "READING") {
    data.videoUrl = undefined;
    data.duration = undefined;
  } else if (data.type === "ASSESSMENT") {
    data.videoUrl = undefined;
    data.content = undefined;
  }

  return await prisma.lesson.create({
    data: {
      ...data,
      moduleId,
    },
  });
};

export const updateLesson = async (
  id: string,
  data: UpdateLessonData,
  userId: string,
  userRole: string,
) => {
  const courseId = await getLessonCourseId(id);
  await verifyCourseOwnership(courseId, userId, userRole);

  const updateData: any = { ...data };

  // If type is being updated, enforce exclusivity
  if (data.type) {
    if (data.type === "VIDEO") {
      updateData.content = null;
    } else if (data.type === "READING") {
      updateData.videoUrl = null;
      updateData.duration = null;
    } else if (data.type === "ASSESSMENT") {
      updateData.videoUrl = null;
      updateData.content = null;
    }
  }

  return await prisma.lesson.update({
    where: { id },
    data: updateData,
  });
};

export const deleteLesson = async (
  id: string,
  userId: string,
  userRole: string,
) => {
  const courseId = await getLessonCourseId(id);
  await verifyCourseOwnership(courseId, userId, userRole);

  return await prisma.lesson.delete({
    where: { id },
  });
};

export const reorderLessons = async (
  lessonOrders: { id: string; order: number }[],
  userId: string,
  userRole: string,
) => {
  // Check ownership for the first lesson to validate permission
  if (lessonOrders.length > 0) {
    const courseId = await getLessonCourseId(lessonOrders[0].id);
    await verifyCourseOwnership(courseId, userId, userRole);
  }

  const updates = lessonOrders.map((item) =>
    prisma.lesson.update({
      where: { id: item.id },
      data: { order: item.order },
    }),
  );
  return await prisma.$transaction(updates);
};

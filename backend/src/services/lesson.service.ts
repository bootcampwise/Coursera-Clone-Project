import { prisma } from "../config/prisma";
import { verifyCourseOwnership } from "./course.service";
import type { Question, ExtractError } from '../types';

interface CreateLessonData {
  title: string;
  order: number;
  type?: "VIDEO" | "READING" | "ASSESSMENT";
  description?: string;
  videoUrl?: string;
  content?: string;
  duration?: number;
}

interface UpdateLessonData {
  title?: string;
  type?: "VIDEO" | "READING" | "ASSESSMENT";
  description?: string;
  videoUrl?: string | null;
  content?: string | null;
  duration?: number | null;
}


const validateAssessmentJSON = (content: string) => {
  try {
    const data = JSON.parse(content);

    
    if (!data.title || typeof data.title !== "string")
      throw new Error("Assessment title is required.");
    if (!Array.isArray(data.questions) || data.questions.length === 0)
      throw new Error("Assessment must have at least one question.");
    if (typeof data.passingScore !== "number")
      throw new Error("Passing score must be a number.");

    
    data.questions.forEach((q: Question, index: number) => {
      if (!q.question || typeof q.question !== "string")
        throw new Error(`Question ${index + 1} text is missing.`);
      if (!Array.isArray(q.options) || q.options.length !== 4)
        throw new Error(`Question ${index + 1} must have exactly 4 options.`);
      if (
        typeof q.correctAnswerIndex !== "number" ||
        q.correctAnswerIndex < 0 ||
        q.correctAnswerIndex > 3
      ) {
        throw new Error(
          `Question ${index + 1} has an invalid correctAnswerIndex (must be 0-3).`,
        );
      }
    });

    return true;
  } catch (err: unknown) {
    const error = err as ExtractError;
    throw new Error(`Invalid Assessment JSON: ${error.message}`);
  }
};


const getModuleCourseId = async (moduleId: string) => {
  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    select: { courseId: true },
  });
  if (!module) throw new Error("Module not found");
  return module.courseId;
};


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

  
  if (!data.type) {
    throw new Error("Lesson type is required");
  }

  
  if (data.type === "VIDEO") {
    data.content = undefined;
  } else if (data.type === "READING") {
    data.videoUrl = undefined;
    data.duration = undefined;
  } else if (data.type === "ASSESSMENT") {
    data.videoUrl = undefined;
    
    if (data.content) {
      validateAssessmentJSON(data.content);
    }
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

  
  const existingLesson = await prisma.lesson.findUnique({ where: { id } });
  if (!existingLesson) throw new Error("Lesson not found");

  const updateData: UpdateLessonData = { ...data };
  const type = data.type || existingLesson.type;

  
  if (type === "VIDEO") {
    
    if (data.type || existingLesson.type === "VIDEO") {
      updateData.content = null;
    }
  } else if (type === "READING") {
    updateData.videoUrl = null;
    updateData.duration = null;
  } else if (type === "ASSESSMENT") {
    updateData.videoUrl = null;
    updateData.duration = null;
    
    if (updateData.content) {
      validateAssessmentJSON(updateData.content);
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

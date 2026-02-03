import { prisma } from "../config/prisma";
import { verifyCourseOwnership } from "./course.service";

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
  videoUrl?: string;
  content?: string;
  duration?: number;
}

// Helper to validate Assessment JSON format
const validateAssessmentJSON = (content: string) => {
  try {
    const data = JSON.parse(content);

    // Required root keys
    if (!data.title || typeof data.title !== "string")
      throw new Error("Assessment title is required.");
    if (!Array.isArray(data.questions) || data.questions.length === 0)
      throw new Error("Assessment must have at least one question.");
    if (typeof data.passingScore !== "number")
      throw new Error("Passing score must be a number.");

    // Validate each question
    data.questions.forEach((q: any, index: number) => {
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
  } catch (err: any) {
    throw new Error(`Invalid Assessment JSON: ${err.message}`);
  }
};

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
    // Assessments use 'content' for JSON storage
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

  // Fetch existing lesson to determine behavior if type is not provided
  const existingLesson = await prisma.lesson.findUnique({ where: { id } });
  if (!existingLesson) throw new Error("Lesson not found");

  const updateData: any = { ...data };
  const type = data.type || existingLesson.type;

  // Enforce exclusivity based on the finalized type
  if (type === "VIDEO") {
    // Only nullify if explicitly changing to VIDEO or if already VIDEO and content is accidentally sent
    if (data.type || existingLesson.type === "VIDEO") {
      updateData.content = null;
    }
  } else if (type === "READING") {
    updateData.videoUrl = null;
    updateData.duration = null;
  } else if (type === "ASSESSMENT") {
    updateData.videoUrl = null;
    updateData.duration = null;
    // Always validate if content is provided for an assessment
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

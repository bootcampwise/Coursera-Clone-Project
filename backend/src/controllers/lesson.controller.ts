import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as lessonService from "../services/lesson.service";

export const createLesson = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { moduleId } = req.params;
    const { title, order, type, description, videoUrl, content, duration } =
      req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const lesson = await lessonService.createLesson(
      moduleId,
      {
        title,
        order: order ?? 0,
        type,
        description,
        videoUrl,
        content,
        duration,
      },
      userId,
      userRole,
    );
    res.status(201).json(lesson);
  },
);

export const updateLesson = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const { title, type, description, videoUrl, content, duration } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const lesson = await lessonService.updateLesson(
      id,
      {
        title,
        type,
        description,
        videoUrl,
        content,
        duration,
      },
      userId,
      userRole,
    );
    res.json(lesson);
  },
);

export const deleteLesson = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    await lessonService.deleteLesson(id, userId, userRole);
    res.json({ message: "Lesson deleted successfully" });
  },
);

export const reorderLessons = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { lessons } = req.body; 
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!Array.isArray(lessons)) {
      res.status(400).json({ message: "Invalid lessons data" });
      return;
    }

    await lessonService.reorderLessons(lessons, userId, userRole);
    res.json({ message: "Lessons reordered successfully" });
  },
);

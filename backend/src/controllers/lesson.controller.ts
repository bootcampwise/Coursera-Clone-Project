import { Request, Response } from "express";
import type { AuthenticatedRequest } from '../types';
import asyncHandler from "../utils/asyncHandler";
import * as lessonService from "../services/lesson.service";

export const createLesson = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { moduleId } = req.params;
    const { title, order, type, description, videoUrl, content, duration } =
      req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const lesson = await lessonService.createLesson(
      moduleId as string,
      {
        title,
        order: order ?? 0,
        type,
        description,
        videoUrl,
        content,
        duration,
      },
      userId as string,
      userRole || "",
    );
    res.status(201).json(lesson);
  },
);

export const updateLesson = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { title, type, description, videoUrl, content, duration } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const lesson = await lessonService.updateLesson(
      id as string,
      {
        title,
        type,
        description,
        videoUrl,
        content,
        duration,
      },
      userId as string,
      userRole || "",
    );
    res.json(lesson);
  },
);

export const deleteLesson = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await lessonService.deleteLesson(id as string, userId as string, userRole || "");
    res.json({ message: "Lesson deleted successfully" });
  },
);

export const reorderLessons = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { lessons } = req.body; 
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!Array.isArray(lessons)) {
      res.status(400).json({ message: "Invalid lessons data" });
      return;
    }

    await lessonService.reorderLessons(lessons, userId as string, userRole || "");
    res.json({ message: "Lessons reordered successfully" });
  },
);

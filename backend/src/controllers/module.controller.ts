import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as moduleService from "../services/module.service";

export const getModules = asyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const modules = await moduleService.getCourseModules(courseId);
  res.json(modules);
});

export const createModule = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { courseId } = req.params;
    const { title, order } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const module = await moduleService.createModule(
      courseId,
      title,
      order ?? 0,
      userId,
      userRole,
    );
    res.status(201).json(module);
  },
);

export const updateModule = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const module = await moduleService.updateModule(
      id,
      title,
      userId,
      userRole,
    );
    res.json(module);
  },
);

export const deleteModule = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    await moduleService.deleteModule(id, userId, userRole);
    res.json({ message: "Module deleted successfully" });
  },
);

export const reorderModules = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { courseId } = req.params;
    const { modules } = req.body; // Array of { id, order }
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!Array.isArray(modules)) {
      res.status(400).json({ message: "Invalid modules data" });
      return;
    }

    await moduleService.reorderModules(courseId, modules, userId, userRole);
    res.json({ message: "Modules reordered successfully" });
  },
);

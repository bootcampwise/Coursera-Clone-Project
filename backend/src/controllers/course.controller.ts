import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as courseService from "../services/course.service";

export const getAllCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { category, difficulty, search, published } = req.query;

    const filters = {
      category: category as string,
      difficulty: difficulty as string,
      search: search as string,
      published:
        published === "true" ? true : published === "false" ? false : undefined,
    };

    const result = await courseService.getAllCourses(page, limit, filters);
    res.json(result);
  },
);

export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await courseService.getCourseById(id as string);
    res.json(course);
  },
);

export const createCourse = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { title, description, category, difficulty, thumbnail, price } =
      req.body;
    const instructorId = req.user?.id;

    if (!instructorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const course = await courseService.createCourse({
      title,
      description,
      category,
      difficulty,
      thumbnail,
      price,
      instructorId,
    });

    res.status(201).json(course);
  },
);

export const updateCourse = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const course = await courseService.updateCourse(
      id as string,
      userId,
      userRole,
      req.body,
    );
    res.json(course);
  },
);

export const deleteCourse = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await courseService.deleteCourse(
      id as string,
      userId,
      userRole,
    );
    res.json(result);
  },
);

export const getInstructorCourses = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const instructorId = req.user?.id;

    if (!instructorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const courses = await courseService.getInstructorCourses(instructorId);
    res.json(courses);
  },
);

import { Request, Response } from "express";
import type { AuthenticatedRequest } from '../types';
import asyncHandler from "../utils/asyncHandler";
import * as courseService from "../services/course.service";

export const getAllCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { category, difficulty, search, q, status, language } = req.query;

    const filters = {
      category: category as string,
      difficulty: difficulty as string,
      search: (search || q) as string,
      status: (status || "Published") as string,
      language: language as string,
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
  async (req: AuthenticatedRequest, res: Response) => {
    const {
      title,
      subtitle,
      description,
      outcomes,
      category,
      difficulty,
      language,
      thumbnail,
      price,
      status,
      instructorId: bodyInstructorId,
    } = req.body;

    const userRole = req.user?.role?.toLowerCase();
    let instructorId: string;

    
    if (userRole === "admin") {
      
      if (!bodyInstructorId) {
        res.status(400).json({ message: "instructorId is required for admin" });
        return;
      }
      instructorId = bodyInstructorId;
    } else {
      
      instructorId = req.user?.id || "";
    }

    if (!instructorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const course = await courseService.createCourse({
      title,
      subtitle,
      description,
      outcomes,
      category,
      difficulty,
      language,
      thumbnail,
      price: price ? parseFloat(price) : 0,
      instructorId,
      status,
    });

    res.status(201).json(course);
  },
);

export const updateCourse = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
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
  async (req: AuthenticatedRequest, res: Response) => {
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
  async (req: AuthenticatedRequest, res: Response) => {
    const instructorId = req.user?.id;

    if (!instructorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const courses = await courseService.getInstructorCourses(instructorId);
    res.json(courses);
  },
);

export const getAdminCourseCatalog = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const courses = await courseService.getAdminCourses();
    res.json(courses);
  },
);

export const uploadCourseThumbnail = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "Thumbnail file is required" });
      return;
    }

    await courseService.verifyCourseOwnership(id as string, userId, userRole);

    const base64 = req.file.buffer.toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${base64}`;

    const updated = await courseService.updateCourseThumbnail(
      id as string,
      dataUrl,
    );

    res.json(updated);
  },
);

export const getRecentlyViewed = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const courses = await courseService.getRecentlyViewedCourses(userId);
    res.json(courses);
  },
);

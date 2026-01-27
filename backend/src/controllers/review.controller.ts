import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as reviewService from "../services/review.service";

export const createReview = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { courseId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const review = await reviewService.createReview({
      userId,
      courseId: courseId as string,
      rating,
      comment,
    });

    res.status(201).json(review);
  },
);

export const getCourseReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const result = await reviewService.getCourseReviews(courseId as string);
    res.json(result);
  },
);

export const deleteReview = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await reviewService.deleteReview(
      id as string,
      userId,
      userRole,
    );
    res.json(result);
  },
);

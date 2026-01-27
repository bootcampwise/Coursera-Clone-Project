import { Router } from "express";
import {
  createReview,
  getCourseReviews,
  deleteReview,
} from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Public routes
router.get("/course/:courseId", getCourseReviews);

// Protected routes
router.post("/:courseId", authMiddleware, createReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;

import { Router } from "express";
import {
  enrollUser,
  getUserEnrollments,
  updateProgress,
  getCourseEnrollments,
  getStudentCourseProgress,
  updateLessonProgress,
} from "../controllers/enrollment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Student routes
router.post("/:courseId", authMiddleware, enrollUser);
router.get("/my", authMiddleware, getUserEnrollments);
router.patch("/:id/progress", authMiddleware, updateProgress);
router.get("/:courseId/progress", authMiddleware, getStudentCourseProgress);
router.patch(
  "/:enrollmentId/lessons/:lessonId",
  authMiddleware,
  updateLessonProgress,
);

// Instructor routes
router.get(
  "/course/:courseId",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  getCourseEnrollments,
);

export default router;

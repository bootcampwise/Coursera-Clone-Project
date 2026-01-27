import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getInstructorCourses,
} from "../controllers/course.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Instructor routes (protected)
router.get(
  "/instructor/my",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  getInstructorCourses,
);
router.post(
  "/",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  createCourse,
);
router.put(
  "/:id",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  updateCourse,
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  deleteCourse,
);

export default router;

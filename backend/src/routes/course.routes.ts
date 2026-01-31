import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getInstructorCourses,
  getAdminCourseCatalog,
} from "../controllers/course.controller";
import { getEnrollmentStatus } from "../controllers/enrollment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Public routes - Static paths first
router.get("/", getAllCourses);
router.get("/search", getAllCourses);

// Protected routes - Specific paths BEFORE parameterized routes
// Instructor routes
router.get(
  "/instructor/my",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  getInstructorCourses,
);

// Admin routes
router.get(
  "/admin/catalog",
  authMiddleware,
  requireRole(["admin"]),
  getAdminCourseCatalog,
);

// CRUD operations (protected)
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

// Parameterized routes - AFTER specific routes to avoid catching them
router.get("/:id", getCourseById);
router.get("/:id/enrollment-status", authMiddleware, getEnrollmentStatus);

export default router;

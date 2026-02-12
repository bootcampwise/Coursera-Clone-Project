import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getInstructorCourses,
  getAdminCourseCatalog,
  uploadCourseThumbnail,
  getRecentlyViewed,
} from "../controllers/course.controller";
import { getEnrollmentStatus } from "../controllers/enrollment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Public routes - Static paths first
router.get("/", getAllCourses);
router.get("/search", getAllCourses);
router.get("/recently-viewed", authMiddleware, getRecentlyViewed);

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
router.post(
  "/:id/thumbnail",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  upload.single("thumbnail"),
  uploadCourseThumbnail,
);

// Parameterized routes - AFTER specific routes to avoid catching them
router.get("/:id", getCourseById);
router.get("/:id/enrollment-status", authMiddleware, getEnrollmentStatus);

export default router;

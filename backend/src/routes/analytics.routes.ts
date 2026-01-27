import { Router } from "express";
import {
  getAdminAnalytics,
  getInstructorAnalytics,
} from "../controllers/analytics.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Admin routes
router.get(
  "/admin/overview",
  authMiddleware,
  requireRole(["admin"]),
  getAdminAnalytics,
);

// Instructor routes
router.get(
  "/instructor/overview",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  getInstructorAnalytics,
);

export default router;

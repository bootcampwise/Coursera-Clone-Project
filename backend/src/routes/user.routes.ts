import { Router } from "express";
import {
  syncGoogleUser,
  getUsers,
  getUser,
  getMe,
  updateRole,
  updateProfile,
  deleteUserById,
  createUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Public / Auth-related
router.post("/sync-google", syncGoogleUser);

// Protected routes
router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateProfile);

// Admin routes
router.get("/", authMiddleware, requireRole(["admin"]), getUsers);
router.post("/", authMiddleware, requireRole(["admin"]), createUser);
router.get("/:id", authMiddleware, requireRole(["admin"]), getUser);
router.patch("/:id/role", authMiddleware, requireRole(["admin"]), updateRole);
router.delete("/:id", authMiddleware, requireRole(["admin"]), deleteUserById);

export default router;

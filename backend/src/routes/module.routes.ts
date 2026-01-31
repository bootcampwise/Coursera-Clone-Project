import { Router } from "express";
import {
  getModules,
  createModule,
  updateModule,
  deleteModule,
  reorderModules,
} from "../controllers/module.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Used when accessing modules directly or courses/:courseId/modules
// We can structure this purely generally or nested.
// Route: /api/v1/modules/...

// However, createModule requires courseId.
// Let's use generic CRUD on /modules for ID based ops, but /courses/:courseId/modules for creation/list?
// Or we can just pass courseId in body? Passing in URL is more RESTful.
// Let's define specific routes.

// Nested routes should probably be mounted on /courses or similar.
// But keeping it simple:
// POST /modules (body includes courseId) OR POST /courses/:courseId/modules
// Let's assume usage of /courses/:courseId/modules for create/list.
// And /modules/:id for update/delete.

// Actually, let's just make strict routes here and mount them properly.
// We will mount this router at /courses/:courseId/modules if possible, OR
// make endpoints explicitly include parameters.

// Let's use /modules base path for update/delete/reorder.
// And /courses/:courseId/modules logic can be here too if we handle params correctly.
// But standard express Router mergeParams is needed if mounted downstream.

// Simplified approach: Define full paths here and mount at /api/v1/
// OR mount at /api/v1/modules and require courseId in body?
// Let's follow existing pattern.
// user.routes.ts has /:id.

// Let's try:
// GET /courses/:courseId/modules
// POST /courses/:courseId/modules
// PUT /modules/reorder (special)
// PUT /modules/:id
// DELETE /modules/:id

router.get("/courses/:courseId/modules", authMiddleware, getModules);
router.post(
  "/courses/:courseId/modules",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  createModule,
);
router.put(
  "/courses/:courseId/modules/reorder",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  reorderModules,
);
router.put(
  "/modules/:id",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  updateModule,
);
router.delete(
  "/modules/:id",
  authMiddleware,
  requireRole(["instructor", "admin"]),
  deleteModule,
);

export default router;

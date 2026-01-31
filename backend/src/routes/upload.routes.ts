import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller";
import { upload } from "../middlewares/upload.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// POST /api/upload
// Protected route - only logged in users can upload
router.post("/", authMiddleware, upload.single("file"), uploadFile);

export default router;

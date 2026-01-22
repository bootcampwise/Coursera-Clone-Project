import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const router = Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", userRoutes);

export default router;

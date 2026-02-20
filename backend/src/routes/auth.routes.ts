import { Router } from "express";
import {
  login,
  register,
  changePassword,
  googleAuthController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google", googleAuthController);
router.patch("/change-password", authMiddleware, changePassword);

export default router;

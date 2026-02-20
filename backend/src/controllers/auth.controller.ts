import { Request, Response } from "express";
import type { AuthenticatedRequest } from "../types";
import asyncHandler from "../utils/asyncHandler";
import * as authService from "../services/auth.service";
import jwt from "jsonwebtoken";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.json(result);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUser({ name, email, password });
  res.status(201).json(user);
});
export const changePassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!currentPassword || !newPassword) {
      res
        .status(400)
        .json({ message: "Current and new password are required" });
      return;
    }

    const result = await authService.changePassword(
      userId,
      currentPassword,
      newPassword
    );
    res.json(result);
  }
);
export const googleAuthController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, name, avatarUrl, providerId } = req.body;
    if (!email || !providerId) {
      res.status(400).json({ message: "Email and providerId required" });
      return;
    }
    const result = await authService.googleAuthService({
      email,
      name,
      avatarUrl,
      providerId,
    });
    res.json(result);
  }
);

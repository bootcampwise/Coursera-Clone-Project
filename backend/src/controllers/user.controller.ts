import { Request, Response } from "express";
import { upsertGoogleUser } from "../services/user.service";
import asyncHandler from "../utils/asyncHandler";

export const syncGoogleUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, name, providerId, avatarUrl } = req.body;

    if (!email || !name || !providerId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const user = await upsertGoogleUser({ email, name, providerId, avatarUrl });

    res.status(200).json({
      message: "User synced successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    });
  }
);

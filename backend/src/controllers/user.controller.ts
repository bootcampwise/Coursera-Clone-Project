import { Request, Response } from "express";
import {
  upsertGoogleUser,
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserProfile,
  deleteUser,
  adminCreateUser,
} from "../services/user.service";
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
  },
);

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const role = req.query.role as string;

  const result = await getAllUsers(page, limit, role);
  res.json(result);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(id as string);
  res.json(user);
});

export const getMe = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = await getUserById(userId);
    res.json(user);
  },
);

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    res.status(400).json({ message: "Role is required" });
    return;
  }

  const user = await updateUserRole(id as string, role);
  res.json(user);
});

export const updateProfile = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    const { name, avatarUrl } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await updateUserProfile(userId, { name, avatarUrl });
    res.json(user);
  },
);

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !role) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const user = await adminCreateUser({ name, email, password, role });
  res.status(201).json(user);
});

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await deleteUser(id as string);
    res.json({ message: "User deleted successfully", user });
  },
);

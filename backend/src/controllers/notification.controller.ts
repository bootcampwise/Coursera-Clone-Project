import { Response } from "express";
import type { AuthenticatedRequest } from '../types';
import { notificationService } from "../services/notification.service";
import asyncHandler from "../utils/asyncHandler";


export const getNotifications = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const includeRead = req.query.includeRead !== "false"; 

    const result = await notificationService.getUserNotifications(userId, {
      page,
      limit,
      includeRead,
    });

    res.json(result);
  },
);


export const getUnreadCount = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const count = await notificationService.getUnreadCount(userId);
    res.json({ count });
  },
);


export const markAsRead = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const notification = await notificationService.markAsRead(id, userId);
      res.json(notification);
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(404).json({ message: err.message });
    }
  },
);


export const markAllAsRead = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await notificationService.markAllAsRead(userId);
    res.json(result);
  },
);


export const deleteNotification = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      await notificationService.deleteNotification(id, userId);
      res.json({ message: "Notification deleted" });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(404).json({ message: err.message });
    }
  },
);

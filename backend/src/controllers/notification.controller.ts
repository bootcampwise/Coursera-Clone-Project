import { Request, Response } from "express";
import { notificationService } from "../services/notification.service";
import asyncHandler from "../utils/asyncHandler";

/**
 * Get all notifications for the authenticated user
 * GET /api/v1/notifications
 */
export const getNotifications = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const includeRead = req.query.includeRead !== "false"; // default true

    const result = await notificationService.getUserNotifications(userId, {
      page,
      limit,
      includeRead,
    });

    res.json(result);
  },
);

/**
 * Get unread notification count
 * GET /api/v1/notifications/unread-count
 */
export const getUnreadCount = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const count = await notificationService.getUnreadCount(userId);
    res.json({ count });
  },
);

/**
 * Mark a notification as read
 * PUT /api/v1/notifications/:id/read
 */
export const markAsRead = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const notification = await notificationService.markAsRead(id, userId);
      res.json(notification);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },
);

/**
 * Mark all notifications as read
 * PUT /api/v1/notifications/read-all
 */
export const markAllAsRead = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await notificationService.markAllAsRead(userId);
    res.json(result);
  },
);

/**
 * Delete a notification
 * DELETE /api/v1/notifications/:id
 */
export const deleteNotification = asyncHandler(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user?.id;
    const id = req.params.id as string;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      await notificationService.deleteNotification(id, userId);
      res.json({ message: "Notification deleted" });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },
);

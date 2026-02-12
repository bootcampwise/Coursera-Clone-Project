import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateNotificationData {
  type: string;
  title: string;
  message: string;
  actionText?: string;
  link?: string;
  imageUrl?: string;
}

export const notificationService = {
  /**
   * Create a new notification for a user
   */
  async createNotification(userId: string, data: CreateNotificationData) {
    return await prisma.notification.create({
      data: {
        userId,
        ...data,
      },
    });
  },

  /**
   * Get all notifications for a user with pagination
   */
  async getUserNotifications(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
      includeRead?: boolean;
    },
  ) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;
    const includeRead = options?.includeRead !== false; // default true

    const where = includeRead ? { userId } : { userId, isRead: false };

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Get count of unread notifications
   */
  async getUnreadCount(userId: string) {
    return await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  },

  /**
   * Mark a specific notification as read
   */
  async markAsRead(notificationId: string, userId: string) {
    // Verify the notification belongs to the user
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    return await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  },

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string) {
    return await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  },

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string, userId: string) {
    // Verify the notification belongs to the user
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    return await prisma.notification.delete({
      where: { id: notificationId },
    });
  },
};

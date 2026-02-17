"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.notificationService = {
    async createNotification(userId, data) {
        return await prisma.notification.create({
            data: {
                userId,
                ...data,
            },
        });
    },
    async getUserNotifications(userId, options) {
        const page = options?.page || 1;
        const limit = options?.limit || 20;
        const skip = (page - 1) * limit;
        const includeRead = options?.includeRead !== false;
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
    async getUnreadCount(userId) {
        return await prisma.notification.count({
            where: {
                userId,
                isRead: false,
            },
        });
    },
    async markAsRead(notificationId, userId) {
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
    async markAllAsRead(userId) {
        return await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    },
    async deleteNotification(notificationId, userId) {
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

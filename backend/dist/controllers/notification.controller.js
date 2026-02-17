"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.getUnreadCount = exports.getNotifications = void 0;
const notification_service_1 = require("../services/notification.service");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.getNotifications = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const includeRead = req.query.includeRead !== "false";
    const result = await notification_service_1.notificationService.getUserNotifications(userId, {
        page,
        limit,
        includeRead,
    });
    res.json(result);
});
exports.getUnreadCount = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const count = await notification_service_1.notificationService.getUnreadCount(userId);
    res.json({ count });
});
exports.markAsRead = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const id = req.params.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const notification = await notification_service_1.notificationService.markAsRead(id, userId);
        res.json(notification);
    }
    catch (error) {
        const err = error;
        res.status(404).json({ message: err.message });
    }
});
exports.markAllAsRead = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const result = await notification_service_1.notificationService.markAllAsRead(userId);
    res.json(result);
});
exports.deleteNotification = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const id = req.params.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        await notification_service_1.notificationService.deleteNotification(id, userId);
        res.json({ message: "Notification deleted" });
    }
    catch (error) {
        const err = error;
        res.status(404).json({ message: err.message });
    }
});

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller";

const router = Router();


router.use(authMiddleware);


router.get("/", getNotifications);


router.get("/unread-count", getUnreadCount);


router.put("/:id/read", markAsRead);


router.put("/read-all", markAllAsRead);


router.delete("/:id", deleteNotification);

export default router;

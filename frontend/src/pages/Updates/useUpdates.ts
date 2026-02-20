import { useState, useEffect } from "react";
import { notificationApi } from "../../services/notificationApi";

export interface UpdateItem {
  id: string;
  type:
    | "certificate"
    | "course_completion"
    | "welcome"
    | "general"
    | "announcement";
  title: string;
  message: string;
  actionText: string;
  link: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export const useUpdates = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationApi.getNotifications();
      setUpdates(data.notifications || []);
      setError(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load notifications";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification: UpdateItem) => {
    try {
      if (!notification.isRead) {
        await notificationApi.markAsRead(notification.id);

        setUpdates((prevUpdates) =>
          prevUpdates.map((u) =>
            u.id === notification.id ? { ...u, isRead: true } : u
          )
        );
      }
    } catch (err) {}
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return {
    updates,
    loading,
    error,
    fetchNotifications,
    handleNotificationClick,
    formatDate,
  };
};

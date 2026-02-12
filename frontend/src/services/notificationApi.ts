import api from "./apiClient";

export const notificationApi = {
  /**
   * Get all notifications for the authenticated user
   */
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    includeRead?: boolean;
  }) {
    const response = await api.get("/notifications", { params });
    return response.data;
  },

  /**
   * Get count of unread notifications
   */
  async getUnreadCount() {
    const response = await api.get("/notifications/unread-count");
    return response.data;
  },

  /**
   * Mark a notification as read
   */
  async markAsRead(id: string) {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    const response = await api.put("/notifications/read-all");
    return response.data;
  },

  /**
   * Delete a notification
   */
  async deleteNotification(id: string) {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};

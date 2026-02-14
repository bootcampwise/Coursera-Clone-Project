import api from "./apiClient";

export const notificationApi = {
  
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    includeRead?: boolean;
  }) {
    const response = await api.get("/notifications", { params });
    return response.data;
  },

  
  async getUnreadCount() {
    const response = await api.get("/notifications/unread-count");
    return response.data;
  },

  
  async markAsRead(id: string) {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  
  async markAllAsRead() {
    const response = await api.put("/notifications/read-all");
    return response.data;
  },

  
  async deleteNotification(id: string) {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};


















































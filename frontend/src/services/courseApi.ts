import api from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const courseApi = {
  getCourses: async (params?: {
    category?: string;
    difficulty?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get(ENDPOINTS.COURSES, { params });
    return response.data;
  },

  getCourseById: async (id: string) => {
    const response = await api.get(ENDPOINTS.COURSES_BY_ID(id));
    return response.data;
  },

  searchCourses: async (query: string, limit?: number) => {
    const response = await api.get(ENDPOINTS.COURSES_SEARCH, {
      params: { q: query, limit },
    });
    return response.data;
  },
};

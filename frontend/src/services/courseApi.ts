import api from "./apiClient";
import instructorApi from "./instructorApiClient";
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

  getEnrollmentStatus: async (id: string) => {
    const response = await api.get(ENDPOINTS.COURSES_ENROLLMENT_STATUS(id));
    return response.data;
  },

  getInstructorCourses: async () => {
    const response = await instructorApi.get(ENDPOINTS.COURSES_INSTRUCTOR);
    return response.data;
  },

  createCourse: async (data: any) => {
    const response = await instructorApi.post(ENDPOINTS.COURSES, data);
    return response.data;
  },

  updateCourse: async (id: string, data: any) => {
    const response = await instructorApi.put(ENDPOINTS.COURSES_BY_ID(id), data);
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await instructorApi.delete(ENDPOINTS.COURSES_BY_ID(id));
    return response.data;
  },
};

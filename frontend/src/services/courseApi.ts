import api from "./apiClient";
import instructorApi from "./instructorApiClient";
import adminApi from "./adminApiClient";
import { ENDPOINTS } from "./endpoints";
import type { CreateCourseData, UpdateCourseData, CreateLessonData, UpdateLessonData } from "../types/services";

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

  getRecentlyViewed: async () => {
    const response = await api.get(ENDPOINTS.COURSES_RECENTLY_VIEWED);
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

  getAdminCourses: async () => {
    const response = await adminApi.get(ENDPOINTS.COURSES_ADMIN_CATALOG);
    return response.data;
  },

  createCourse: async (data: CreateCourseData) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.post(ENDPOINTS.COURSES, data);
    return response.data;
  },

  updateCourse: async (id: string, data: UpdateCourseData) => {
    
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.put(ENDPOINTS.COURSES_BY_ID(id), data);
    return response.data;
  },

  uploadCourseThumbnail: async (id: string, file: File) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const formData = new FormData();
    formData.append("thumbnail", file);
    const response = await apiClient.post(
      ENDPOINTS.COURSES_THUMBNAIL(id),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.delete(ENDPOINTS.COURSES_BY_ID(id));
    return response.data;
  },

  
  getModules: async (courseId: string) => {
    
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
  },

  createModule: async (
    courseId: string,
    data: { title: string; order: number },
  ) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    
    const response = await apiClient.post(`/courses/${courseId}/modules`, data);
    return response.data;
  },

  updateModule: async (id: string, data: { title: string }) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.put(`/modules/${id}`, data);
    return response.data;
  },

  deleteModule: async (id: string) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.delete(`/modules/${id}`);
    return response.data;
  },

  reorderModules: async (
    courseId: string,
    modules: { id: string; order: number }[],
  ) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.put(
      `/courses/${courseId}/modules/reorder`,
      { modules },
    );
    return response.data;
  },

  createLesson: async (moduleId: string, data: CreateLessonData) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.post(`/modules/${moduleId}/lessons`, data);
    return response.data;
  },

  updateLesson: async (id: string, data: UpdateLessonData) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.put(`/lessons/${id}`, data);
    return response.data;
  },

  deleteLesson: async (id: string) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.delete(`/lessons/${id}`);
    return response.data;
  },

  reorderLessons: async (lessons: { id: string; order: number }[]) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const apiClient = isAdminRoute ? adminApi : instructorApi;
    const response = await apiClient.put(`/lessons/reorder`, { lessons });
    return response.data;
  },
};


















































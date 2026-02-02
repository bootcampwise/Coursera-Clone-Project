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

  // Module & Lesson Methods
  getModules: async (courseId: string) => {
    // GET /courses/:courseId/modules
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
  },

  createModule: async (
    courseId: string,
    data: { title: string; order: number },
  ) => {
    // POST /courses/:courseId/modules
    const response = await instructorApi.post(
      `/courses/${courseId}/modules`,
      data,
    );
    return response.data;
  },

  updateModule: async (id: string, data: { title: string }) => {
    const response = await instructorApi.put(`/modules/${id}`, data);
    return response.data;
  },

  deleteModule: async (id: string) => {
    const response = await instructorApi.delete(`/modules/${id}`);
    return response.data;
  },

  reorderModules: async (
    courseId: string,
    modules: { id: string; order: number }[],
  ) => {
    const response = await instructorApi.put(
      `/courses/${courseId}/modules/reorder`,
      { modules },
    );
    return response.data;
  },

  createLesson: async (moduleId: string, data: any) => {
    const response = await instructorApi.post(
      `/modules/${moduleId}/lessons`,
      data,
    );
    return response.data;
  },

  updateLesson: async (id: string, data: any) => {
    const response = await instructorApi.put(`/lessons/${id}`, data);
    return response.data;
  },

  deleteLesson: async (id: string) => {
    const response = await instructorApi.delete(`/lessons/${id}`);
    return response.data;
  },

  reorderLessons: async (lessons: { id: string; order: number }[]) => {
    const response = await instructorApi.put(`/lessons/reorder`, { lessons });
    return response.data;
  },
};

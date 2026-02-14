import api from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const enrollmentApi = {
  enroll: async (courseId: string) => {
    const response = await api.post(ENDPOINTS.ENROLLMENTS_ENROLL(courseId));
    return response.data;
  },

  getMyEnrollments: async () => {
    const response = await api.get(ENDPOINTS.ENROLLMENTS_MY);
    return response.data;
  },

  updateProgress: async (
    enrollmentId: string,
    data: { progress: number; completed: boolean },
  ) => {
    const response = await api.patch(
      ENDPOINTS.ENROLLMENTS_PROGRESS(enrollmentId),
      data,
    );
    return response.data;
  },

  getCourseProgress: async (courseId: string) => {
    const response = await api.get(
      ENDPOINTS.ENROLLMENTS_COURSE_PROGRESS(courseId),
    );
    return response.data;
  },

  updateLessonProgress: async (
    enrollmentId: string,
    lessonId: string,
    data: {
      completed?: boolean;
      lastPlayed?: number;
      passed?: boolean;
      forceComplete?: boolean;
      score?: number;
      videoDuration?: number;
    },
  ) => {
    const response = await api.patch(
      ENDPOINTS.ENROLLMENTS_LESSON_PROGRESS(enrollmentId, lessonId),
      data,
    );
    return response.data;
  },
};


















































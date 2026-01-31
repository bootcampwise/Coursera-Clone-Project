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
};

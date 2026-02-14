import api from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const reviewApi = {
  createReview: async (
    courseId: string,
    data: { rating: number; comment?: string },
  ) => {
    const response = await api.post(ENDPOINTS.REVIEWS_CREATE(courseId), data);
    return response.data;
  },
};


















































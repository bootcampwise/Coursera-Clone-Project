import adminApi from "./adminApiClient";
import instructorApi from "./instructorApiClient";
import { ENDPOINTS } from "./endpoints";

export const reviewDashboardApi = {
  getAdminReviews: async () => {
    const response = await adminApi.get(ENDPOINTS.REVIEWS_ADMIN);
    return response.data;
  },
  getInstructorReviews: async () => {
    const response = await instructorApi.get(ENDPOINTS.REVIEWS_INSTRUCTOR);
    return response.data;
  },
};


















































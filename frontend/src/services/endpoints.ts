export const ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_REFRESH: "/auth/refresh",
  AUTH_CHANGE_PASSWORD: "/auth/change-password",

  // Users
  USERS_SYNC_GOOGLE: "/users/sync-google",
  USERS_ME: "/users/me",
  USERS_LIST: "/users",
  USERS_BY_ID: (id: string) => `/users/${id}`,
  USERS_UPDATE_ROLE: (id: string) => `/users/${id}/role`,
  USERS_UPDATE_PROFILE: "/users/me",

  // Courses
  COURSES: "/courses",
  COURSES_BY_ID: (id: string) => `/courses/${id}`,
  COURSES_INSTRUCTOR: "/courses/instructor/my",

  // Enrollments
  ENROLLMENTS_ENROLL: (courseId: string) => `/enrollments/${courseId}`,
  ENROLLMENTS_MY: "/enrollments/my",
  ENROLLMENTS_PROGRESS: (id: string) => `/enrollments/${id}/progress`,
  ENROLLMENTS_BY_COURSE: (courseId: string) =>
    `/enrollments/course/${courseId}`,

  // Reviews
  REVIEWS_CREATE: (courseId: string) => `/reviews/${courseId}`,
  REVIEWS_BY_COURSE: (courseId: string) => `/reviews/course/${courseId}`,

  // Analytics
  ANALYTICS_ADMIN: "/analytics/admin/overview",
  ANALYTICS_INSTRUCTOR: "/analytics/instructor/overview",
};

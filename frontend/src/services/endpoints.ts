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
  COURSES_SEARCH: "/courses/search",
  COURSES_BY_ID: (id: string) => `/courses/${id}`,
  COURSES_THUMBNAIL: (id: string) => `/courses/${id}/thumbnail`,
  COURSES_ENROLLMENT_STATUS: (id: string) => `/courses/${id}/enrollment-status`,
  COURSES_ADMIN_CATALOG: "/courses/admin/catalog",
  COURSES_INSTRUCTOR: "/courses/instructor/my",

  // Enrollments
  ENROLLMENTS_ENROLL: (courseId: string) => `/enrollments/${courseId}`,
  ENROLLMENTS_MY: "/enrollments/my",
  ENROLLMENTS_PROGRESS: (id: string) => `/enrollments/${id}/progress`,
  ENROLLMENTS_BY_COURSE: (courseId: string) =>
    `/enrollments/course/${courseId}`,
  ENROLLMENTS_COURSE_PROGRESS: (courseId: string) =>
    `/enrollments/${courseId}/progress`,
  ENROLLMENTS_LESSON_PROGRESS: (enrollmentId: string, lessonId: string) =>
    `/enrollments/${enrollmentId}/lessons/${lessonId}`,

  // Reviews
  REVIEWS_CREATE: (courseId: string) => `/reviews/${courseId}`,
  REVIEWS_BY_COURSE: (courseId: string) => `/reviews/course/${courseId}`,
  REVIEWS_ADMIN: "/reviews/admin",
  REVIEWS_INSTRUCTOR: "/reviews/instructor",

  // Analytics
  ANALYTICS_ADMIN: "/analytics/admin/overview",
  ANALYTICS_INSTRUCTOR: "/analytics/instructor/overview",
};

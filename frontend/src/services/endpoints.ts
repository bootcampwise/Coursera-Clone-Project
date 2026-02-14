export const ENDPOINTS = {
  
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_REFRESH: "/auth/refresh",
  AUTH_CHANGE_PASSWORD: "/auth/change-password",

  
  USERS_SYNC_GOOGLE: "/users/sync-google",
  USERS_ME: "/users/me",
  USERS_LIST: "/users",
  USERS_BY_ID: (id: string) => `/users/${id}`,
  USERS_UPDATE_ROLE: (id: string) => `/users/${id}/role`,
  USERS_UPDATE_PROFILE: "/users/me",
  USERS_WORK_EXPERIENCES: "/users/me/work-experiences",
  USERS_WORK_EXPERIENCE_BY_ID: (id: string) =>
    `/users/me/work-experiences/${id}`,
  USERS_EDUCATIONS: "/users/me/educations",
  USERS_EDUCATION_BY_ID: (id: string) => `/users/me/educations/${id}`,
  USERS_PROFILE_CERTIFICATES: "/users/me/profile-certificates",
  USERS_PROFILE_CERTIFICATE_BY_ID: (id: string) =>
    `/users/me/profile-certificates/${id}`,

  
  COURSES: "/courses",
  COURSES_SEARCH: "/courses/search",
  COURSES_RECENTLY_VIEWED: "/courses/recently-viewed",
  COURSES_BY_ID: (id: string) => `/courses/${id}`,
  COURSES_THUMBNAIL: (id: string) => `/courses/${id}/thumbnail`,
  COURSES_ENROLLMENT_STATUS: (id: string) => `/courses/${id}/enrollment-status`,
  COURSES_ADMIN_CATALOG: "/courses/admin/catalog",
  COURSES_INSTRUCTOR: "/courses/instructor/my",

  
  ENROLLMENTS_ENROLL: (courseId: string) => `/enrollments/${courseId}`,
  ENROLLMENTS_MY: "/enrollments/my",
  ENROLLMENTS_PROGRESS: (id: string) => `/enrollments/${id}/progress`,
  ENROLLMENTS_BY_COURSE: (courseId: string) =>
    `/enrollments/course/${courseId}`,
  ENROLLMENTS_COURSE_PROGRESS: (courseId: string) =>
    `/enrollments/${courseId}/progress`,
  ENROLLMENTS_LESSON_PROGRESS: (enrollmentId: string, lessonId: string) =>
    `/enrollments/${enrollmentId}/lessons/${lessonId}`,

  
  REVIEWS_CREATE: (courseId: string) => `/reviews/${courseId}`,
  REVIEWS_BY_COURSE: (courseId: string) => `/reviews/course/${courseId}`,
  REVIEWS_ADMIN: "/reviews/admin",
  REVIEWS_INSTRUCTOR: "/reviews/instructor",

  
  ANALYTICS_ADMIN: "/analytics/admin/overview",
  ANALYTICS_INSTRUCTOR: "/analytics/instructor/overview",

  
  CERTIFICATES_MY: "/certificates/my",
  CERTIFICATES_BY_ID: (id: string) => `/certificates/${id}`,
  CERTIFICATES_DOWNLOAD: (id: string) => `/certificates/${id}/download`,
  CERTIFICATES_VERIFY: (code: string) => `/certificates/verify/${code}`,
};


















































// Re-export all types from individual files for convenient centralized imports
export type { Course, Module, Lesson, Instructor, CourseCard } from './course';
export type { AuthUser, AuthState, AdminAuthState, InstructorAuthState, PortalAuthState, LoginCredentials, RegisterData } from './auth';
export type { ApiResponse, ApiListResponse, ApiRequestError, ApiRequestResponse, PaginationParams } from './api';
export type { ApiError, ErrorResponse, ValidationError, ErrorState } from './error';
export type { RootState, ReduxAction, AsyncThunkConfig } from './redux';
export type { AsyncState, Optional, PaginatedResponse, TableData, Nullable, Awaitable, ModalState, FormData } from './common';

// Data model types
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName?: string;
  courseTitle?: string;
  userName?: string;
  learnerName?: string;
  issueDate?: string;
  issuedAt?: string;
  certificateUrl?: string;
  verificationCode?: string;
  credentialId?: string;
  type?: 'COURSE' | 'SPECIALIZATION' | 'PROFESSIONAL_CERTIFICATE';
  partnerName?: string;
  partner?: string;
  course?: { thumbnail?: string; description?: string; outcomes?: string[]; instructor?: { name: string } };
  grade?: number;
  durationMinutes?: number;
  durationHours?: number;
  imageUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userName?: string;
  userAvatar?: string;
  user?: { id?: string; name?: string; avatarUrl?: string; email?: string };
  course?: Course | { title?: string; instructor?: { name?: string } };
}

export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  enrollmentId?: string;
  completed: boolean;
  completedAt?: string;
  progress?: number;
  lastPlayed?: number;
  lessonProgress?: Array<{ lessonId: string; lastPlayed: number; completed: boolean }>;
}

import type { Course } from './course';

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentId?: string;
  course?: Course;
  enrolledAt: string;
  completedAt?: string;
  updatedAt?: string;
  progress?: number | Record<string, { score?: number; questionsAnswered?: number }>;
  studentName?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  certificate?: Certificate;
  completed?: boolean;
  hasReviewed?: boolean;
  myRating?: number;
}

export interface CourseAnalytics {
  courseId: string;
  enrollmentCount: number;
  completionCount: number;
  averageRating: number;
  reviewCount: number;
  totalLessonsViewed: number;
}

export interface UserAnalytics {
  userId: string;
  enrollmentCount: number;
  completedCourses: number;
  totalLearningHours: number;
  lastActivityDate?: string;
  certificatesEarned: number;
}
// UI Display types for pages
export interface CertificateDisplayItem {
  id: string;
  title: string;
  type: string;
  image: string;
  grade?: string;
}

export interface CourseDisplayCard {
  title: string;
  provider: string;
  image: string;
  logo: string;
  type: string;
}

export interface UpNextCourse {
  title: string;
  image: string;
}

export interface SearchCourseResult {
  id: string;
  title: string;
  provider: string;
  image: string;
  logo: string;
  partnerLogo?: string;
  partnerName?: string;
  type: string;
  description?: string;
  category?: string;
  difficulty?: string;
  language?: string;
  skills?: string;
  rating?: number;
  reviews?: string;
}
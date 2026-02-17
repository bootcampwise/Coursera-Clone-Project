import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

/**
 * JWT Payload Types
 */
export interface TokenPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Express Request Extensions
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/**
 * Multer Types
 */
export interface FileFilterCallback {
  (error: Error | null, acceptFile?: boolean): void;
}

export interface UploadFileFilter {
  (req: AuthenticatedRequest, file: Express.Multer.File, callback: FileFilterCallback): void;
}

/**
 * Service Query Types
 */
export type UserWhereInput = Prisma.UserWhereInput | Record<string, unknown>;
export type CourseWhereInput = Prisma.CourseWhereInput | Record<string, unknown>;
export type LessonWhereInput = Prisma.LessonWhereInput | Record<string, unknown>;
export type CertificateWhereInput = Prisma.CertificateWhereInput | Record<string, unknown>;

/**
 * User Profile Types
 */
export interface WorkExperienceInput {
  title: string;
  company: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export interface WorkExperience extends WorkExperienceInput {
  id: string;
  createdAt: string;
}

export interface EducationInput {
  instituteName: string;
  degreeDetails: string;
  startDate: string;
  endDate: string;
}

export interface Education extends EducationInput {
  id: string;
  createdAt: string;
}

export interface ProfileCertificateInput {
  certificateName: string;
  completionDate: string;
}

export interface ProfileCertificate extends ProfileCertificateInput {
  id: string;
  createdAt: string;
}

/**
 * Assessment & Lesson Types
 */
export interface QuestionOption {
  index: number;
  text: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface AssessmentData {
  title: string;
  questions: Question[];
  passingScore: number;
}

export interface UpdateLessonData {
  title?: string;
  type?: 'VIDEO' | 'READING' | 'ASSESSMENT';
  description?: string;
  videoUrl?: string;
  content?: string;
  duration?: number;
  questions?: Question[];
  passingScore?: number;
}

/**
 * Error Types
 */
export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  details?: Record<string, unknown>;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * API Response Types (for consistency)
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ApiErrorResponse;
}

/**
 * Route Handler Types
 */
export type AsyncRouteHandler = (
  req: Request | AuthenticatedRequest,
  res: Response,
  next?: (err?: Error) => void,
) => Promise<void> | void;

export type MiddlewareHandler = (
  req: Request | AuthenticatedRequest,
  res: Response,
  next: (err?: Error) => void,
) => Promise<void> | void;

export type ErrorMiddlewareHandler = (
  err: unknown,
  req: Request | AuthenticatedRequest,
  res: Response,
  next: (err?: Error) => void,
) => void;

/**
 * Certificate Data Types
 */
export interface CertificateDetailData {
  studentName: string;
  courseName: string;
  dateIssued: string;
  certificateCode: string;
}

/**
 * Google OAuth Types
 */
export interface GoogleUserData {
  email: string;
  name: string;
  providerId: string;
  avatarUrl?: string;
}

/**
 * Helper type for extracting data from responses
 */
export type ExtractError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

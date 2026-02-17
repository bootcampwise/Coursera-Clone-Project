export interface ApiError {
  message: string;
  code?: string | number;
  status?: number;
  details?: string;
}

export interface ErrorResponse {
  success: boolean;
  error: ApiError;
  data?: null;
}

export interface ValidationError extends ApiError {
  field: string;
  value?: unknown;
}

export type ErrorState = ApiError | null | undefined;

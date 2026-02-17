import type { AxiosError, AxiosResponse } from 'axios';
import type { ApiError } from './error';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type ApiRequestError = AxiosError<ApiError>;
export type ApiRequestResponse<T> = AxiosResponse<ApiResponse<T>>;

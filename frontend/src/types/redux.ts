import type { AuthState, AdminAuthState, InstructorAuthState, PortalAuthState } from './auth';
import type { Course } from './course';

export interface RootState {
  auth: AuthState;
  adminAuth: AdminAuthState;
  instructorAuth: InstructorAuthState;
  portalAuth: PortalAuthState;
  courses?: {
    courses: Course[];
    loading: boolean;
    error: string | null;
  };
  ui?: {
    loading: boolean;
    modal: {
      isOpen: boolean;
      type: string;
      data?: unknown;
    };
  };
}

export interface ReduxAction<T = unknown> {
  type: string;
  payload?: T;
  error?: string;
  meta?: unknown;
}

export interface AsyncThunkConfig {
  state: RootState;
  rejectValue: {
    message: string;
    code?: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'INSTRUCTOR' | 'ADMIN';
  avatarUrl?: string;
  phoneNumber?: string;
  bio?: string;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token?: string;
  loading: boolean;
  error?: string | null;
}

export interface AdminAuthState {
  isAuthenticated: boolean;
  admin: AuthUser | null;
  token?: string;
  loading: boolean;
  error?: string | null;
}

export interface InstructorAuthState {
  isAuthenticated: boolean;
  instructor: AuthUser | null;
  token?: string;
  loading: boolean;
  error?: string | null;
}

export interface PortalAuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token?: string;
  loading: boolean;
  error?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

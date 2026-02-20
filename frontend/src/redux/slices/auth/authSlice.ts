import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "./authApi";
import type { LoginPayload, RegisterPayload } from "./types";
import { supabase } from "../../../lib/supabase";
import { userApi, type ProfileUpdateInput } from "../../../services/userApi";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: "student" | "instructor" | "admin";
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.register(payload);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

interface GoogleUserPayload {
  email: string;
  name: string;
  providerId: string;
  avatarUrl?: string;
}

export const syncGoogleUser = createAsyncThunk(
  "auth/syncGoogleUser",
  async (payload: GoogleUserPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.syncGoogleUser(payload);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message || "Failed to sync user"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (payload: ProfileUpdateInput, { rejectWithValue }) => {
    try {
      const response = await userApi.updateMyProfile(payload);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    payload: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.updatePassword(payload);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message || "Failed to update password"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(syncGoogleUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncGoogleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = {
          id: action.payload.user.id || action.payload.user._id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          avatarUrl: action.payload.user.avatarUrl,
          role: action.payload.user.role,
        };
        state.user = user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(user));
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(syncGoogleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = {
          ...state.user,
          ...action.payload,
        };
        state.user = updatedUser as AuthState["user"];
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

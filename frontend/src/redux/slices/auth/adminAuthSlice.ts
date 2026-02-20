import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../../../services/endpoints";
import type { LoginPayload, User } from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

interface AdminAuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminAuthState = {
  token: localStorage.getItem("adminToken"),
  user: JSON.parse(localStorage.getItem("adminUser") || "null"),
  isLoading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "adminAuth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.AUTH_LOGIN}`,
        payload
      );
      const data = response.data;
      if (data.user.role.toLowerCase() !== "admin") {
        return rejectWithValue("Access restricted to administrators.");
      }
      return data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutAdmin = createAsyncThunk("adminAuth/logout", async () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  return null;
});

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminSession(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("adminToken", action.payload.token);
      localStorage.setItem("adminUser", JSON.stringify(action.payload.user));
      state.error = null;
    },
    clearAdminError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("adminToken", action.payload.token);
        localStorage.setItem("adminUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
      });
  },
});

export const { setAdminSession, clearAdminError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

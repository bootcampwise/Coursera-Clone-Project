import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as portalAuthApi from "./portalAuthApi";
import type { LoginPayload } from "./types";

interface PortalAuthState {
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

const initialState: PortalAuthState = {
  token: localStorage.getItem("portalToken"),
  user: JSON.parse(localStorage.getItem("portalUser") || "null"),
  isLoading: false,
  error: null,
};

export const loginPortalUser = createAsyncThunk(
  "portalAuth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await portalAuthApi.loginPortal(payload);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutPortalUser = createAsyncThunk(
  "portalAuth/logout",
  async () => {
    localStorage.removeItem("portalToken");
    localStorage.removeItem("portalUser");
    return null;
  }
);

const portalAuthSlice = createSlice({
  name: "portalAuth",
  initialState,
  reducers: {
    logoutPortal(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("portalToken");
      localStorage.removeItem("portalUser");
    },
    clearPortalError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPortalUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginPortalUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("portalToken", action.payload.token);
        localStorage.setItem("portalUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginPortalUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutPortalUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
      });
  },
});

export const { logoutPortal, clearPortalError } = portalAuthSlice.actions;
export default portalAuthSlice.reducer;

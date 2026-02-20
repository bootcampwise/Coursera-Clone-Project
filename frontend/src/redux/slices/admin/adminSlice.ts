import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import { userApi } from "../../../services/userApi";
import { courseApi } from "../../../services/courseApi";

interface AdminState {
  analytics: {
    overview: any;
    recentSignups: any[];
  } | null;
  users: {
    data: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    } | null;
  };
  courses: any[];
  reviews: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  analytics: null,
  users: {
    data: [],
    pagination: null,
  },
  courses: [],
  reviews: [],
  isLoading: false,
  error: null,
};

export const fetchAdminAnalytics = createAsyncThunk(
  "admin/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(ENDPOINTS.ANALYTICS_ADMIN);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch analytics"
      );
    }
  }
);

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (
    params: { page?: number; limit?: number; role?: string } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const response = await userApi.getUsers(params);
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const fetchAdminCourses = createAsyncThunk(
  "admin/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseApi.getAdminCourses();
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.analytics = null;
      state.users = { data: [], pagination: null };
      state.courses = [];
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.users.data = action.payload.users;
        state.users.pagination = action.payload.pagination;
      })
      .addCase(fetchAdminCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      });
  },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";

interface InstructorState {
  courses: any[];
  analytics: any | null;
  reviews: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InstructorState = {
  courses: [],
  analytics: null,
  reviews: [],
  isLoading: false,
  error: null,
};

export const fetchInstructorCourses = createAsyncThunk(
  "instructor/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseApi.getInstructorCourses();
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch instructor courses"
      );
    }
  }
);

export const fetchInstructorAnalytics = createAsyncThunk(
  "instructor/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(ENDPOINTS.ANALYTICS_INSTRUCTOR);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch instructor analytics"
      );
    }
  }
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    clearInstructorState: (state) => {
      state.courses = [];
      state.analytics = null;
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchInstructorAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { clearInstructorState } = instructorSlice.actions;
export default instructorSlice.reducer;

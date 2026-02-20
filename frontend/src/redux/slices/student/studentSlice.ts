import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enrollmentApi } from "../../../services/enrollmentApi";
import { certificateApi } from "../../../services/certificateApi";

interface StudentState {
  enrollments: any[];
  certificates: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  enrollments: [],
  certificates: [],
  isLoading: false,
  error: null,
};

export const fetchMyEnrollments = createAsyncThunk(
  "student/fetchEnrollments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await enrollmentApi.getMyEnrollments();
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch enrollments"
      );
    }
  }
);

export const fetchMyCertificates = createAsyncThunk(
  "student/fetchCertificates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await certificateApi.getMyCertificates();
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch certificates"
      );
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearStudentState: (state) => {
      state.enrollments = [];
      state.certificates = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEnrollments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyEnrollments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchMyEnrollments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload;
      });
  },
});

export const { clearStudentState } = studentSlice.actions;
export default studentSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import adminAuthReducer from "./slices/auth/adminAuthSlice";
import instructorAuthReducer from "./slices/auth/instructorAuthSlice";
import portalAuthReducer from "./slices/auth/portalAuthSlice";
import adminReducer from "./slices/admin/adminSlice";
import instructorReducer from "./slices/instructor/instructorSlice";
import studentReducer from "./slices/student/studentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    instructorAuth: instructorAuthReducer,
    portalAuth: portalAuthReducer,
    admin: adminReducer,
    instructor: instructorReducer,
    student: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminAuthReducer from "../features/auth/adminAuthSlice";
import instructorAuthReducer from "../features/auth/instructorAuthSlice";
import portalAuthReducer from "../features/auth/portalAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    instructorAuth: instructorAuthReducer,
    portalAuth: portalAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


















































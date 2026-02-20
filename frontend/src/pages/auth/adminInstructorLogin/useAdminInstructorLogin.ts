import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  loginAdmin,
  setAdminSession,
  clearAdminError,
} from "../../../redux/slices/auth/adminAuthSlice";
import {
  loginInstructor,
  setInstructorSession,
  clearInstructorError,
} from "../../../redux/slices/auth/instructorAuthSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import { ENDPOINTS } from "../../../services/endpoints";

interface UseAdminInstructorLoginProps {
  expectedRole?: "admin" | "instructor";
}

export const useAdminInstructorLogin = ({
  expectedRole,
}: UseAdminInstructorLoginProps = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const instructorAuth = useSelector(
    (state: RootState) => state.instructorAuth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading =
    expectedRole === "admin"
      ? adminAuth.isLoading
      : expectedRole === "instructor"
        ? instructorAuth.isLoading
        : adminAuth.isLoading || instructorAuth.isLoading;
  const error =
    expectedRole === "admin"
      ? adminAuth.error
      : expectedRole === "instructor"
        ? instructorAuth.error
        : adminAuth.error || instructorAuth.error;

  useEffect(() => {
    if (expectedRole === "admin" && adminAuth.user) {
      navigate("/admin");
    } else if (expectedRole === "instructor" && instructorAuth.user) {
      navigate("/instructor");
    } else if (!expectedRole) {
      if (adminAuth.user) navigate("/admin");
      else if (instructorAuth.user) navigate("/instructor");
    }
  }, [adminAuth.user, instructorAuth.user, expectedRole, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAdminError());
      dispatch(clearInstructorError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      if (expectedRole === "admin") {
        const result = await dispatch(loginAdmin({ email, password }));
        if (loginAdmin.fulfilled.match(result)) {
          toast.success("Welcome back, Admin");
          navigate("/admin");
        } else {
          toast.error((result.payload as string) || "Login failed");
        }
      } else if (expectedRole === "instructor") {
        const result = await dispatch(loginInstructor({ email, password }));
        if (loginInstructor.fulfilled.match(result)) {
          const role = result.payload.user.role.toLowerCase();
          toast.success(
            `Welcome back, ${role.charAt(0).toUpperCase() + role.slice(1)}`
          );
          navigate("/instructor");
        } else {
          toast.error((result.payload as string) || "Login failed");
        }
      } else {
        const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";
        const { data } = await axios.post(`${API_URL}${ENDPOINTS.AUTH_LOGIN}`, {
          email,
          password,
        });

        const role = data.user.role.toLowerCase();
        if (role === "admin") {
          dispatch(setAdminSession(data));
          toast.success("Welcome Admin");
          navigate("/admin");
        } else if (role === "instructor" || role === "admin") {
          dispatch(setInstructorSession(data));
          toast.success(`Welcome ${role}`);
          navigate("/instructor");
        } else {
          toast.error("Access restricted. Please use student login.");
        }
      }
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const msg =
        error.response?.data?.message || error.message || "Login failed";

      if (!expectedRole) {
        toast.error(msg);
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  };
};

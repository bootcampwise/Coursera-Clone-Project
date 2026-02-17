import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  loginAdmin,
  setAdminSession,
  clearAdminError,
} from "../../features/auth/adminAuthSlice";
import {
  loginInstructor,
  setInstructorSession,
  clearInstructorError,
} from "../../features/auth/instructorAuthSlice";
import type { AppDispatch, RootState } from "../../app/store";
import { IMAGES } from "../../constants/images";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { ENDPOINTS } from "../../services/endpoints";

interface Props {
  expectedRole?: "admin" | "instructor";
}

const AdminInstructorLogin: React.FC<Props> = ({ expectedRole }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const instructorAuth = useSelector(
    (state: RootState) => state.instructorAuth,
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
            `Welcome back, ${role.charAt(0).toUpperCase() + role.slice(1)}`,
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
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || "Login failed";
      
      if (!expectedRole) {
        toast.error(msg);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={IMAGES.LOGO} alt="Coursera" className="h-8 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-dark-3 mb-2">
            {expectedRole
              ? `${expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1)} Login`
              : "Portal Access"}
          </h1>
          <p className="text-text-gray text-sm">
            For Admins and Instructors only
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-text-gray">
            Not an admin or instructor?{" "}
            <a href="/" className="text-primary hover:underline font-medium">
              Go to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminInstructorLogin;


















































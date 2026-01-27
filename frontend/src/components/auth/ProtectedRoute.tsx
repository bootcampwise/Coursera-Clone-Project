import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  loginPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  loginPath = "/portal-login",
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user) {
    // Redirect to the specified login page
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRoles) {
    console.log("ProtectedRoute Check:", {
      user: user?.name,
      role: user?.role,
      allowed: allowedRoles,
    });
    const userRole = user.role?.toLowerCase() || "";
    const hasRole = allowedRoles.some(
      (role) => role.toLowerCase() === userRole,
    );

    if (!hasRole) {
      console.log("Role mismatch. Redirecting to login.");
      // User is logged in but doesn't have the right role
      return <Navigate to={loginPath} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

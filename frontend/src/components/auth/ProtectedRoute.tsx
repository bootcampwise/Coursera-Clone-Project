import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

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
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRoles) {
    const userRole = user.role?.toLowerCase() || "";
    const hasRole = allowedRoles.some(
      (role) => role.toLowerCase() === userRole
    );

    if (!hasRole) {
      return <Navigate to={loginPath} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

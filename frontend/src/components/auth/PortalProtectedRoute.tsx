import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface PortalProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles: string[];
  loginPath?: string;
}

const PortalProtectedRoute: React.FC<PortalProtectedRouteProps> = ({
  children,
  allowedRoles,
  loginPath = "/portal-login",
}) => {
  const { user, token } = useSelector((state: RootState) => state.portalAuth);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  const userRole = user.role.toLowerCase();
  const hasRole = allowedRoles.map((r) => r.toLowerCase()).includes(userRole);

  if (!hasRole) {
    return <Navigate to={loginPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PortalProtectedRoute;

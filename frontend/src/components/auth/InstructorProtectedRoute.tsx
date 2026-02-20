import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface InstructorProtectedRouteProps {
  children?: React.ReactNode;
  loginPath?: string;
}

const InstructorProtectedRoute: React.FC<InstructorProtectedRouteProps> = ({
  children,
  loginPath = "/instructor-login",
}) => {
  const { user, token } = useSelector(
    (state: RootState) => state.instructorAuth
  );
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (user.role.toLowerCase() !== "instructor") {
    return <Navigate to={loginPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default InstructorProtectedRoute;

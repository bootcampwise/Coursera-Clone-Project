import React from "react";
import { useLocation } from "react-router-dom";
import HomeMainHeader from "../home/HomeMainHeader";
import LoggedHeader from "./LoggedHeader";
import ProfileHeader from "./ProfileHeader";
import CourseLearningHeader from "./CourseLearningHeader";

const Header: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Render HomeMainHeader only on the root path
  if (pathname === "/") {
    return <HomeMainHeader />;
  }

  // Render ProfileHeader for account settings, profile, and certificates
  if (
    pathname.startsWith("/account") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/accomplishments")
  ) {
    return <ProfileHeader />;
  }

  // Render CourseLearningHeader for learning pages
  if (pathname.startsWith("/learn")) {
    return <CourseLearningHeader />;
  }

  // Default to LoggedHeader for all other routes (dashboard, search, courses, etc.)
  return <LoggedHeader />;
};

export default Header;

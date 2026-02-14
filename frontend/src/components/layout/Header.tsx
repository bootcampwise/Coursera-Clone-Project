import React from "react";
import { useLocation } from "react-router-dom";
import HomeMainHeader from "../home/HomeMainHeader";
import LoggedHeader from "./LoggedHeader";
import ProfileHeader from "./ProfileHeader";
import CourseLearningHeader from "./CourseLearningHeader";

const Header: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  
  if (pathname === "/") {
    return <HomeMainHeader />;
  }

  
  if (
    pathname.startsWith("/account") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/accomplishments")
  ) {
    return <ProfileHeader />;
  }

  
  if (pathname.startsWith("/learn")) {
    return <CourseLearningHeader />;
  }

  
  return <LoggedHeader />;
};

export default Header;


















































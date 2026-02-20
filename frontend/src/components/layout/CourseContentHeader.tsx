import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type { RootState } from "../../redux/store";
import { IMAGES } from "../../constants/images";

import AvatarMenu from "./AvatarMenu";

export interface CourseContentHeaderProps {
  onMobileMenuToggle?: () => void;
}

const CourseContentHeader: React.FC<CourseContentHeaderProps> = ({
  onMobileMenuToggle,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const displayName = user?.name || "User";

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-border h-[64px] flex items-center sticky top-0 z-50 font-sans shadow-sm">
      <div className="w-full px-4 flex items-center justify-between">
        {}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-gray-dark-3 hover:bg-gray-50 rounded-md border-none bg-transparent cursor-pointer flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          {}
          <Link to="/" className="flex items-center no-underline shrink-0">
            <img
              src={IMAGES.LOGO}
              alt="Coursera"
              className="h-[16px] xs:h-[18px] md:h-[24px] w-auto object-contain"
            />
          </Link>

          <div className="h-[20px] md:h-[24px] w-px bg-gray-medium-4 mx-0 md:mx-1"></div>

          {}
          <div className="flex items-center shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-[14px] xs:h-[16px] md:h-[22px] w-auto"
            />
          </div>
        </div>

        {}
        <div className="flex items-center gap-1.5 xs:gap-2 md:gap-5 shrink-0">
          {}
          <button className="hidden sm:block text-text-gray hover:text-gray-dark-3 bg-transparent border-none cursor-pointer p-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>

          {}
          <button className="hidden sm:flex w-8 h-8 rounded-full bg-blue-light-9 items-center justify-center text-primary border-none cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 9l3 3-3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>

          {}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[15px] focus:outline-none border-none cursor-pointer overflow-hidden p-0"
              style={{ backgroundColor: getAvatarColor(displayName) }}
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                getInitials(displayName)
              )}
            </button>

            {isUserMenuOpen && (
              <>
                <AvatarMenu
                  onLogout={handleLogout}
                  onClose={() => setIsUserMenuOpen(false)}
                />
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseContentHeader;

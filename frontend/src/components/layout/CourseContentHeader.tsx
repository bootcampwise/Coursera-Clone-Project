import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type { RootState } from "../../app/store";
import { IMAGES } from "../../constants/images";

const CourseContentHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const displayName = user?.name || "Z";
  const displayInitial = user?.name ? getInitials(user.name) : "Z";

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-[#e1e1e1] h-[64px] flex items-center sticky top-0 z-50 font-sans shadow-sm">
      <div className="w-full px-4 flex items-center justify-between">
        {/* ================= LEFT SECTION ================= */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Logo */}
          <Link to="/" className="flex items-center no-underline">
            <img
              src={IMAGES.LOGO}
              alt="Coursera"
              className="h-[24px] w-auto object-contain"
            />
          </Link>

          {/* Separator */}
          <div className="h-[24px] w-[1px] bg-[#dadce0] mx-1"></div>

          {/* Partner Name/Logo */}
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-[22px] w-auto"
            />
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Globe Icon */}
          <button className="text-[#5f6368] hover:text-[#1f1f1f] bg-transparent border-none cursor-pointer p-1">
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

          {/* Owl/Assistant Icon (Placeholder) */}
          <button className="w-8 h-8 rounded-full bg-[#E4F2FE] flex items-center justify-center text-[#0056D2] border-none cursor-pointer">
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

          {/* Profile Circle */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-9 h-9 rounded-full bg-[#00255d] flex items-center justify-center text-white font-bold text-[15px] focus:outline-none border-none cursor-pointer overflow-hidden p-0"
            >
              {displayInitial}
            </button>

            {isUserMenuOpen && (
              <>
                <div className="absolute right-0 mt-3 w-[250px] bg-white rounded-[4px] shadow-lg border border-[#e1e1e1] py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#e1e1e1]">
                    <p className="font-bold text-[#1f1f1f] truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-[#5f6368] truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  {[
                    {
                      label: "My Courses",
                      action: () => navigate("/my-learning"),
                    },
                    { label: "Profile", action: () => navigate("/profile") },
                    {
                      label: "Settings",
                      action: () => navigate("/account/settings"),
                    },
                    { label: "Log Out", action: handleLogout },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (item.action) item.action();
                      }}
                      className="w-full text-left px-4 py-2 text-[14px] text-[#1f1f1f] hover:bg-[#f5f7f8] transition-colors border-none bg-transparent cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
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

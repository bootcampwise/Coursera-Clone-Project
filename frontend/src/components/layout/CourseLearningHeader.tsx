import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type { RootState } from "../../app/store";
import { IMAGES } from "../../constants/images";

const CourseLearningHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const displayName = user?.name || "User";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search in course:", searchQuery);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-[#e1e1e1] h-[64px] flex items-center sticky top-0 z-50 font-sans shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="w-full px-4 flex items-center justify-between">
        {/* ================= LEFT SECTION ================= */}
        <div className="flex items-center gap-4 shrink-0">
          {/* 1. Grid Icon (9 dots) */}
          <button className="text-[#1f1f1f] p-2 rounded-md hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            </svg>
          </button>

          {/* 2. Logo */}
          <Link to="/" className="flex items-center no-underline">
            <img
              src={IMAGES.LOGO}
              alt="Coursera"
              className="h-[24px] w-auto object-contain"
            />
          </Link>

          {/* 3. Vertical Separator */}
          <div className="h-[32px] w-[1px] bg-[#dadce0] mx-0"></div>

          {/* 4. Partner Icon (Dark Blue 'P') */}
          <div className="w-10 h-10 rounded-full bg-[#00255d] flex items-center justify-center text-white font-bold text-[18px]">
            P
          </div>
        </div>

        {/* ================= CENTER SECTION ================= */}
        <div className="hidden md:flex flex-1 max-w-[680px] justify-start ml-6 mr-6">
          <form
            onSubmit={handleSearch}
            className="flex w-full items-center h-[40px]"
          >
            <div className="flex-1 h-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in course"
                className="w-full h-full border border-[#757575] border-r-0 rounded-l-[4px] px-3 text-[14px] text-[#1f1f1f] placeholder:text-[#5f6368] focus:outline-none focus:border-[#0056D2] z-10"
              />
            </div>
            <button
              type="submit"
              className="px-6 h-full bg-[#0056D2] text-white border border-[#0056D2] rounded-r-[4px] font-semibold text-[14px] hover:bg-[#00419e] transition-colors cursor-pointer whitespace-nowrap"
            >
              Search
            </button>
          </form>
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

          {/* Bell Icon */}
          <button className="text-[#5f6368] hover:text-[#1f1f1f] bg-transparent border-none cursor-pointer p-1 relative">
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>

          {/* Smile/Face Icon Placeholder (from screenshot) */}
          <button className="hidden sm:flex w-8 h-8 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 items-center justify-center text-white border-none cursor-pointer">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </button>

          {/* Profile Circle (Dark Blue 'Z' per screenshot) */}
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
                    { label: "Updates" },
                    { label: "Accomplishments" },
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

export default CourseLearningHeader;

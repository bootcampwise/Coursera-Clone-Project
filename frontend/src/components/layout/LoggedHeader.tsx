import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type { RootState } from "../../app/store";
import { IMAGES } from "../../constants/images";

const LoggedHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdatesPage = location.pathname === "/updates";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const avatarUrl = user?.avatarUrl;
  const displayName = user?.name || "User";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const searchPlaceholder = "Search Coursera for Google Career Certific...";

  return (
    <>
      <header className="bg-white border-b border-[#e1e1e1] h-[64px] flex items-center sticky top-0 z-50 font-sans">
        <div className="w-full px-4 md:px-8 flex items-center justify-between">
          {/* ================= LEFT SECTION ================= */}
          <div className="flex items-center gap-4 shrink-0">
            {/* 1. Grid Icon (Dots) */}
            <button className="text-[#1f1f1f] hover:bg-gray-50 p-2 rounded-md transition-colors hidden md:block border-none bg-transparent cursor-pointer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="3" cy="3" r="2" />
                <circle cx="12" cy="3" r="2" />
                <circle cx="21" cy="3" r="2" />
                <circle cx="3" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="21" cy="12" r="2" />
                <circle cx="3" cy="21" r="2" />
                <circle cx="12" cy="21" r="2" />
                <circle cx="21" cy="21" r="2" />
              </svg>
            </button>

            {/* 2. Logo Logic */}
            <Link to="/" className="no-underline shrink-0">
              {isUpdatesPage ? (
                <img src={IMAGES.LOGO} alt="Coursera" className="h-[24px]" />
              ) : (
                <div
                  className="w-9 h-9 rounded-full text-white flex items-center justify-center font-sans text-[18px] font-bold"
                  style={{ backgroundColor: "#1a4f88" }}
                >
                  P
                </div>
              )}
            </Link>

            {/* 3. Explore & My Learning */}
            <div className="hidden md:flex items-center gap-6">
              <button
                type="button"
                onClick={() => navigate("/search")}
                className="flex items-center gap-1.5 text-[#5f6368] text-[14px] font-normal hover:text-[#0056D2] transition-colors bg-transparent border-none cursor-pointer"
              >
                Explore
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="mt-0.5"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <Link
                to="/my-learning"
                className="text-[#5f6368] text-[14px] font-normal hover:text-[#0056D2] no-underline transition-colors"
              >
                My Learning
              </Link>
            </div>
          </div>

          {/* ================= CENTER SECTION: SEARCH BAR ================= */}
          <div className="hidden lg:flex flex-1 justify-center px-6">
            <form
              onSubmit={handleSearch}
              className="w-full max-w-[520px] relative flex items-center h-[44px] bg-white border border-[#ccc] rounded-full overflow-visible"
            >
              {/* Left Branding "C" Circle */}
              <div
                className="ml-[4px] w-[36px] h-[36px] min-w-[36px] rounded-full flex items-center justify-center text-white font-sans font-bold text-[17px] z-10 pointer-events-none"
                style={{ backgroundColor: "#1a73e8" }}
              >
                C
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 h-full bg-transparent border-none px-3 text-[14px] text-[#202124] placeholder:text-[#70757a] focus:outline-none"
              />

              {/* Right Search Button */}
              <button
                type="submit"
                className="mr-[4px] w-[36px] h-[36px] min-w-[36px] text-white rounded-full flex items-center justify-center hover:bg-[#1557b0] transition-colors z-10 border-none cursor-pointer"
                style={{ backgroundColor: "#1a73e8" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>

          {/* ================= RIGHT SECTION: GLOBE, D, PROFILE ================= */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Cart Icon (Updates Page Only) */}
            {isUpdatesPage && (
              <button className="text-[#5b5b5b] hover:text-[#0056D2] p-1 hidden md:block transition-colors bg-transparent border-none cursor-pointer relative">
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
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {/* Cart Badge */}
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#C20E0E] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  1
                </span>
              </button>
            )}
            {/* Globe Icon */}
            <button className="text-[#5b5b5b] hover:text-[#0056D2] p-1 hidden md:block transition-colors bg-transparent border-none cursor-pointer">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </button>

            {/* D Indicator */}
            <button className="text-[#5b5b5b] hover:text-[#0056D2] p-1 hidden md:block transition-colors bg-transparent border-none cursor-pointer font-medium text-[18px]">
              D
            </button>

            {/* Updates Bell Icon */}
            <div className="relative">
              <Link
                to="/updates"
                className="text-[#5b5b5b] hover:text-[#0056D2] p-1 transition-colors bg-transparent border-none cursor-pointer relative block no-underline"
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
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {/* Notification Badge */}
                <span className="absolute top-0 right-0 h-4 w-4 bg-[#C20E0E] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  2
                </span>
              </Link>
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-[13px] focus:outline-none border-none cursor-pointer overflow-hidden p-0"
                style={{ backgroundColor: getAvatarColor(displayName) }}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="leading-none">
                    {getInitials(displayName)}
                  </span>
                )}
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="absolute right-0 mt-3 w-[250px] bg-white rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-[#f0f0f0] py-6 z-50">
                    {[
                      {
                        label: "My Courses",
                        action: () => navigate("/my-learning"),
                      },
                      { label: "Profile", action: () => navigate("/profile") },
                      { label: "Setting" },
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
                        className="w-full text-left px-9 py-3.5 text-[16px] text-[#1f1f1f] hover:bg-[#f5f7f8] transition-colors border-none bg-transparent cursor-pointer font-medium"
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
    </>
  );
};

export default LoggedHeader;

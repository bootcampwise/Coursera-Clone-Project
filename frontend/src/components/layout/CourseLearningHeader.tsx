import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type { RootState } from "../../app/store";

const CourseLearningHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const avatarUrl = user?.avatarUrl;
  const displayName = user?.name || "User";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search within course context
      console.log("Search in course:", searchQuery);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-[#e1e1e1] h-[64px] flex items-center sticky top-0 z-50 font-sans">
      <div className="w-full px-4 md:px-8 flex items-center justify-between">
        {/* Left: Coursera Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#0056D2] flex items-center justify-center text-white font-bold text-[18px]">
            C
          </div>
          <span className="hidden md:block text-[20px] font-semibold text-[#1f1f1f]">
            Coursera
          </span>
        </Link>

        {/* Center: Search in Course */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <form
            onSubmit={handleSearch}
            className="w-full max-w-[400px] relative flex items-center h-[40px] bg-[#f5f7f8] border border-[#e1e1e1] rounded-[20px] overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in course"
              className="flex-1 h-full bg-transparent border-none px-4 text-[14px] text-[#202124] placeholder:text-[#70757a] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 h-full text-[#5f6368] hover:text-[#1f1f1f] transition-colors border-none bg-transparent cursor-pointer text-[14px] font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Globe */}
          <button className="text-[#5b5b5b] hover:text-[#0056D2] p-1.5 hidden md:block transition-colors bg-transparent border-none cursor-pointer">
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

          {/* Bell */}
          <button className="text-[#5b5b5b] hover:text-[#0056D2] p-1.5 relative transition-colors bg-transparent border-none cursor-pointer">
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full focus:outline-none border-none cursor-pointer overflow-hidden p-0"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white font-bold text-[14px]"
                  style={{ backgroundColor: getAvatarColor(displayName) }}
                >
                  {getInitials(displayName)}
                </div>
              )}
            </button>

            {isUserMenuOpen && (
              <>
                <div className="absolute right-0 mt-3 w-[250px] bg-white rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-[#f0f0f0] py-6 z-50">
                  {[
                    { label: "My Courses", action: () => navigate("/my-learning") },
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
  );
};

export default CourseLearningHeader;

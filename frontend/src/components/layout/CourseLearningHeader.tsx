import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type { RootState } from "../../redux/store";
import { IMAGES } from "../../constants/images";
import AvatarMenu from "./AvatarMenu";

export interface CourseLearningHeaderProps {
  onMobileMenuToggle?: () => void;
}

const CourseLearningHeader: React.FC<CourseLearningHeaderProps> = ({
  onMobileMenuToggle,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const displayName = user?.name || "User";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-border h-[64px] flex items-center sticky top-0 z-50 font-sans shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="w-full px-4 flex items-center justify-between relative h-full">
        {}
        {isMobileSearchOpen && (
          <div className="absolute inset-0 bg-white z-50 flex items-center px-4 gap-2">
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 text-text-gray hover:text-gray-dark-3 bg-transparent border-none cursor-pointer"
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
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <form onSubmit={handleSearch} className="flex-1 flex items-center">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in course"
                className="w-full py-2 px-3 text-[16px] text-gray-dark-3 border-none focus:outline-none placeholder:text-text-gray"
              />
              <button
                type="submit"
                className="p-2 text-primary bg-transparent border-none cursor-pointer font-bold"
              >
                Search
              </button>
            </form>
          </div>
        )}
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
          <button className="text-gray-dark-3 p-2 rounded-md hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer hidden lg:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            </svg>
          </button>

          {}
          <Link to="/" className="flex items-center no-underline shrink-0">
            <img
              src={IMAGES.LOGO}
              alt="Coursera"
              className="h-[20px] md:h-[24px] w-auto object-contain"
            />
          </Link>

          {}
          <div className="h-[32px] w-px bg-gray-medium-4 mx-0 hidden lg:block"></div>

          {}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-dark-2 flex items-center justify-center text-white font-bold text-[16px] md:text-[18px] shrink-0">
            P
          </div>
        </div>

        {}
        <div className="hidden lg:flex flex-1 max-w-[680px] justify-start ml-6 mr-6">
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
                className="w-full h-full border border-gray-medium-dark border-r-0 rounded-l-[4px] px-3 text-[14px] text-gray-dark-3 placeholder:text-text-gray focus:outline-none focus:border-primary z-10"
              />
            </div>
            <button
              type="submit"
              className="px-6 h-full bg-primary text-white border border-primary rounded-r-[4px] font-semibold text-[14px] hover:bg-primary-hover transition-colors cursor-pointer whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>

        {}
        <div className="flex items-center gap-1 md:gap-5 shrink-0">
          {}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="lg:hidden text-text-gray hover:text-gray-dark-3 bg-transparent border-none cursor-pointer p-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

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
          <button className="hidden sm:block text-text-gray hover:text-gray-dark-3 bg-transparent border-none cursor-pointer p-1 relative">
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

          {}
          <button className="hidden sm:flex w-8 h-8 rounded-full bg-linear-to-br from-blue-300 to-blue-500 items-center justify-center text-white border-none cursor-pointer">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
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

export default CourseLearningHeader;

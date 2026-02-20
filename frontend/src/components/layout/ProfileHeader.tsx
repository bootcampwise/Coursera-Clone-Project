import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import type { RootState } from "../../redux/store";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import AvatarMenu from "./AvatarMenu";

const ProfileHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    <header className="bg-white border-b border-border h-[64px] flex items-center sticky top-0 z-50 font-sans">
      <div className="w-full px-4 md:px-8 flex items-center justify-between">
        {}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button className="text-gray-dark-3 hover:bg-gray-50 p-2 rounded-md transition-colors border-none bg-transparent cursor-pointer block md:hidden">
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
          <button className="text-gray-dark-3 hover:bg-gray-50 p-2 rounded-md transition-colors border-none bg-transparent cursor-pointer hidden md:block">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="4" cy="4" r="2" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="4" r="2" />
              <circle cx="4" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="4" cy="20" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="20" cy="20" r="2" />
            </svg>
          </button>
          <Link to="/" className="shrink-0 scale-90 md:scale-100 no-underline">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-dark-3 flex items-center justify-center text-white font-bold text-[16px] md:text-[18px]">
              P
            </div>
          </Link>
        </div>

        <div className="flex-1 max-w-[620px] mx-2 md:mx-10 relative">
          {}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center h-[44px] bg-white border border-stroke-light-gray rounded-full px-1 hover:border-gray-600 focus-within:border-primary transition-colors overflow-hidden"
          >
            <div className="ml-[2px] w-[34px] h-[34px] rounded-full flex items-center justify-center text-white font-bold text-[17px] shrink-0 bg-google-blue">
              C
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Coursera for courses..."
              className="flex-1 px-4 bg-transparent border-none text-[14px] text-gray-dark-3 focus:outline-none placeholder:text-text-gray"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 hover:bg-blue-dark-accent transition-colors border-none cursor-pointer"
            >
              <svg
                width="16"
                height="16"
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

          {}
          {isMobileSearchOpen && (
            <div className="fixed inset-0 bg-white z-100 flex items-center px-4 md:hidden">
              <form
                onSubmit={handleSearch}
                className="w-full flex items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-1 text-gray-500 border-none bg-transparent cursor-pointer"
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
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="flex-1 h-[40px] bg-transparent border-none text-[16px] text-gray-dark-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-1 text-google-blue border-none bg-transparent cursor-pointer"
                >
                  <svg
                    width="22"
                    height="22"
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
          )}
        </div>

        {}
        <div className="flex items-center gap-2 md:gap-6 shrink-0">
          {}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="md:hidden text-gray-dark-3 p-2 hover:bg-gray-50 rounded-md transition-colors bg-transparent border-none cursor-pointer"
          >
            <svg
              width="20"
              height="20"
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

          {}
          <button className="text-text-gray hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-1 hidden sm:block">
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

          {}
          <button className="text-text-gray hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-1 relative">
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
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-sm cursor-pointer shrink-0 overflow-hidden p-0 border-none bg-transparent"
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

            {}
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

export default ProfileHeader;

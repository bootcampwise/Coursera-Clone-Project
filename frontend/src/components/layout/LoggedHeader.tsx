import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type { RootState } from "../../redux/store";
import { IMAGES } from "../../constants/images";
import { notificationApi } from "../../services/notificationApi";
import AvatarMenu from "./AvatarMenu";

const LoggedHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdatesPage = location.pathname === "/updates";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  const avatarUrl = user?.avatarUrl;
  const displayName = user?.name || "User";

  const fetchUnreadCount = async () => {
    try {
      const data = await notificationApi.getUnreadCount();
      setUnreadCount(data.count || 0);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUnreadCount();

    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

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
      <header className="bg-white border-b border-border h-[64px] flex items-center sticky top-0 z-50 font-sans">
        <div className="w-full px-4 md:px-8 flex items-center justify-between">
          {}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-dark-3 hover:bg-gray-50 rounded-md border-none bg-transparent cursor-pointer"
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
            <button className="text-gray-dark-3 hover:bg-gray-50 p-2 rounded-md transition-colors hidden lg:block border-none bg-transparent cursor-pointer">
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

            {}
            <Link to="/" className="no-underline shrink-0">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full text-white flex items-center justify-center font-sans text-[16px] md:text-[18px] font-bold bg-google-blue-dark">
                P
              </div>
            </Link>

            {}
            <div className="hidden lg:flex items-center gap-6">
              <button
                type="button"
                onClick={() => navigate("/search")}
                className="flex items-center gap-1.5 text-text-gray text-[14px] font-normal hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
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
                to="/my-courses"
                className="text-text-gray text-[14px] font-normal hover:text-primary no-underline transition-colors"
              >
                My Learning
              </Link>
            </div>
          </div>

          {}
          <div className="flex-1 flex justify-center px-4 lg:px-6">
            {}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex w-full max-w-[520px] relative items-center h-[44px] bg-white border border-stroke-light-gray rounded-full overflow-visible"
            >
              {}
              <div className="ml-[4px] w-[36px] h-[36px] min-w-[36px] rounded-full flex items-center justify-center text-white font-sans font-bold text-[17px] z-10 pointer-events-none bg-google-blue">
                C
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 h-full bg-transparent border-none px-3 text-[14px] text-shade-3 placeholder:text-shade-12 focus:outline-none"
              />

              {}
              <button
                type="submit"
                className="mr-[4px] w-[36px] h-[36px] min-w-[36px] text-white rounded-full flex items-center justify-center hover:bg-google-blue-darker transition-colors z-10 border-none cursor-pointer bg-google-blue"
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

            {}
            {isMobileSearchOpen && (
              <div className="lg:hidden fixed inset-0 z-[60] bg-white flex items-center px-4 h-[64px]">
                <form
                  onSubmit={handleSearch}
                  className="flex-1 flex items-center gap-3"
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
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            {}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="lg:hidden text-gray-dark-3 p-2 hover:bg-gray-50 rounded-md transition-colors bg-transparent border-none cursor-pointer"
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
            {isUpdatesPage && (
              <button className="text-gray-medium-light-5 hover:text-primary p-1 hidden sm:block transition-colors bg-transparent border-none cursor-pointer relative">
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
                {}
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-error-red-bright text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  1
                </span>
              </button>
            )}
            {}
            <button className="text-gray-medium-light-5 hover:text-primary p-1 hidden lg:block transition-colors bg-transparent border-none cursor-pointer">
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
            <div className="relative">
              <Link
                to="/updates"
                className="text-gray-medium-light-5 hover:text-primary p-1 transition-colors bg-transparent border-none cursor-pointer relative block no-underline"
              >
                <svg
                  width="22"
                  height="22"
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
                {}
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-error-red-bright text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            </div>

            {}
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

      {}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {}
          <div className="absolute left-0 top-0 bottom-0 w-[280px] max-w-[85%] bg-white p-6 overflow-y-auto animate-slide-in-left flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={IMAGES.LOGO} alt="Coursera" className="h-[20px]" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full border-none bg-transparent cursor-pointer"
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/search");
                }}
                className="flex items-center justify-between w-full p-3 text-[16px] font-medium text-gray-dark-3 hover:bg-surface rounded-lg border-none bg-transparent cursor-pointer text-left"
              >
                Explore
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
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              <Link
                to="/my-courses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 text-[16px] font-medium text-gray-dark-3 hover:bg-surface rounded-lg no-underline"
              >
                My Learning
              </Link>

              <hr className="my-4 border-border-light" />

              <div className="flex items-center gap-4 px-3 py-2">
                <button className="text-gray-medium-light-5 hover:text-primary transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
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
                  Language
                </button>
              </div>
            </nav>

            <div className="mt-auto pt-8">
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 text-[16px] font-medium text-red-600 hover:bg-red-50 rounded-lg border-none bg-transparent cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoggedHeader;

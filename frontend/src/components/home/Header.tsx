import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import Button from "../common/Button";
import { IMAGES } from "../../constants/images";
import HomePreHeader from "./HomePreHeader";
import AuthModal from "../common/AuthModal";
import RegisterModal from "../common/RegisterModal";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const { signOut } = useGoogleAuth();

  const openAuth = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsAuthModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegister = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsRegisterModalOpen(true);
    setIsAuthModalOpen(false);
  };

  const switchToRegister = () => {
    setIsAuthModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={switchToLogin}
      />
      <HomePreHeader />
      <header className="bg-background border-b border-border sticky top-0 z-50 font-sans shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-4">
          {}
          <div className="flex items-center gap-3 lg:gap-8 shrink-0">
            <Link to="/" className="shrink-0 mb-1 no-underline">
              <img src={IMAGES.LOGO} alt="Logo" className="w-24 md:w-32" />
            </Link>
            <div className="hidden md:block">
              <Button
                variant="ghost"
                className="text-sm font-medium flex items-center gap-1 text-primary hover:no-underline"
              >
                Explore
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-[600px] mx-4 lg:mx-8"
          >
            <div className="flex w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to learn?"
                className="w-full h-[44px] pl-6 pr-14 border border-border-card rounded-full text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-none transition-shadow"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-[36px] w-[36px] flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-hover transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {}
          <div className="hidden md:flex lg:hidden items-center">
            <button
              className="text-text-secondary p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>

          {}
          <div className="hidden md:flex items-center gap-3 xl:gap-6 text-sm font-medium text-text-primary shrink-0">
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-gray-200 focus:outline-none cursor-pointer"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-bold text-base"
                        style={{ backgroundColor: getAvatarColor(user.name) }}
                      >
                        {getInitials(user.name)}
                      </div>
                    )}
                  </button>

                  {}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 border border-gray-100 z-50 animate-in fade-in zoom-in duration-75">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        to="/my-learning"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 no-underline"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Learning
                      </Link>

                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={() => {
                            signOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}

                  {}
                  {isUserMenuOpen && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={openAuth}
                    className="text-primary font-medium hover:underline whitespace-nowrap bg-transparent border-none cursor-pointer"
                  >
                    Log In
                  </button>
                  <Button
                    onClick={openRegister}
                    className="bg-background! text-primary! border! border-primary! font-medium! rounded-[4px]! px-6 xl:px-8! py-[8px]! whitespace-nowrap hover:bg-blue-50! transition-colors"
                  >
                    Join for Free
                  </Button>
                </>
              )}
            </div>
          </div>

          {}
          <div className="flex md:hidden items-center gap-4">
            <button
              className="text-primary p-1"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            {user ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-8 h-8 rounded-full overflow-hidden border border-gray-200"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: getAvatarColor(user.name) }}
                  >
                    {getInitials(user.name)}
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={openAuth}
                className="text-primary font-bold text-sm bg-transparent border-none px-1"
              >
                Log In
              </button>
            )}
          </div>
        </div>

        {}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between h-[64px]">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="no-underline"
              >
                <img src={IMAGES.LOGO} alt="Logo" className="w-24" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <span className="text-gray-800 font-bold">
                    Hello, {user.name}
                  </span>
                  <Button
                    onClick={signOut}
                    className="bg-primary! text-white! font-bold! rounded-[4px]! w-full! py-[12px]!"
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={openRegister}
                  className="bg-primary! text-white! font-bold! rounded-[4px]! w-full! py-[12px]!"
                >
                  Join for Free
                </Button>
              )}

              {}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn?"
                  className="w-full h-[48px] pl-4 pr-12 border border-gray-400 rounded-full text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 h-[40px] w-[40px] bg-primary text-white rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </form>

              <div className="flex flex-col gap-4 text-[16px] font-medium text-gray-800">
                <Link
                  to="/degrees"
                  className="border-b pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Online Degrees
                </Link>
                <Link
                  to="/career"
                  className="border-b pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find your New Career
                </Link>
                <a
                  href="#"
                  className="border-b pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Individuals
                </a>
                <a
                  href="#"
                  className="border-b pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Businesses
                </a>
                <a
                  href="#"
                  className="border-b pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Universities
                </a>
                <a
                  href="#"
                  className="border-b pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Governments
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

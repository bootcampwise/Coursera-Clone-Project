import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import Button from "../common/Button";
import { IMAGES } from "../../constants/images";
import HomePreHeader from "./HomePreHeader";
import AuthModal from "../common/AuthModal";
import { courseApi } from "../../services/courseApi";
import type { Course } from "../../types";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [results, setResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const popularSuggestions = [
    "Python",
    "Data Science",
    "React",
    "Business",
    "Machine Learning",
  ];
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const { signOut } = useGoogleAuth();

  const Logo = () => <img src={IMAGES.LOGO} alt="Logo" className="w-32" />;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowOverlay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setResults([]);

      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await courseApi.searchCourses(searchQuery);

        const publishedResults = (response.courses || [])
          .filter((c: Course) => c.status === "Published")
          .slice(0, 6);
        setResults(publishedResults);
        setShowOverlay(true);
        setSelectedIndex(-1);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const openAuth = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsAuthModalOpen(true);
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setShowOverlay(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showOverlay) {
      if (e.key === "ArrowDown") {
        setShowOverlay(true);
        setSelectedIndex(0);
      }
      return;
    }

    const items = searchQuery.trim().length < 2 ? popularSuggestions : results;
    const maxIndex = items.length - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        e.preventDefault();
        if (searchQuery.trim().length < 2) {
          const suggestion = popularSuggestions[selectedIndex];
          setSearchQuery(suggestion);
          navigate(`/search?q=${encodeURIComponent(suggestion)}`);
          setShowOverlay(false);
        } else {
          const course = results[selectedIndex];
          navigate(`/course/${course.id}`);
          setShowOverlay(false);
          setSearchQuery("");
        }
      } else {
        handleSearch(e);
      }
    } else if (e.key === "Escape") {
      setShowOverlay(false);
      inputRef.current?.blur();
    }
  };

  return (
    <>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <HomePreHeader />
      <header className="bg-background border-b border-border sticky top-0 z-50 font-sans shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between gap-4">
          {}
          <div className="flex items-center gap-4 lg:gap-8 shrink-0">
            <Link to="/" className="shrink-0 mb-1 no-underline">
              <Logo />
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

          <div className="hidden md:flex flex-1 max-w-[600px] mx-4 lg:mx-8 relative">
            <form onSubmit={handleSearch} className="flex w-full relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowOverlay(true)}
                className="w-full h-[48px] pl-6 pr-14 border border-border-card rounded-full text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-none transition-shadow"
                role="combobox"
                aria-expanded={showOverlay}
                aria-haspopup="listbox"
                aria-autocomplete="list"
                aria-activedescendant={
                  selectedIndex >= 0
                    ? searchQuery.trim().length < 2
                      ? `suggestion-item-${selectedIndex}`
                      : `course-item-${selectedIndex}`
                    : undefined
                }
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setResults([]);
                    setSelectedIndex(-1);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 bg-transparent border-none cursor-pointer"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 top-1 h-[40px] w-[40px] flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-hover transition-colors"
                aria-label="Search"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                )}
              </button>
            </form>

            {}
            {showOverlay && (
              <div
                ref={overlayRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden max-h-[480px] overflow-y-auto"
                role="listbox"
              >
                {isLoading ? (
                  <div className="p-12 text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-gray-500">Finding matches...</p>
                  </div>
                ) : searchQuery.trim().length < 2 ? (
                  <div className="p-4">
                    <div className="px-3 py-2 text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Popular Suggestions
                    </div>
                    <div className="flex flex-col gap-1">
                      {popularSuggestions.map((suggestion, index) => (
                        <div
                          key={suggestion}
                          id={`suggestion-item-${index}`}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            navigate(
                              `/search?q=${encodeURIComponent(suggestion)}`
                            );
                            setShowOverlay(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                            selectedIndex === index
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          role="option"
                          aria-selected={selectedIndex === index}
                        >
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">
                            {suggestion}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    <div className="px-3 py-2 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                      Courses
                    </div>
                    {results.map((course, index) => (
                      <div
                        key={course.id}
                        id={`course-item-${index}`}
                        onClick={() => {
                          navigate(`/course/${course.id}`);
                          setShowOverlay(false);
                          setSearchQuery("");
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors ${
                          selectedIndex === index
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                        role="option"
                        aria-selected={selectedIndex === index}
                      >
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="w-16 h-10 object-cover rounded shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">
                            {course.title}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {course.category} • {course.difficulty}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleSearch}
                        className="w-full text-left px-3 py-2 text-sm text-primary font-bold hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span>See all results for "{searchQuery}"</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-sm">
                      No courses found for "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {}
          <div className="hidden md:flex items-center gap-4 xl:gap-6 text-sm font-medium text-text-primary shrink-0">
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-200 focus:outline-none cursor-pointer"
                    style={{ backgroundColor: getAvatarColor(user.name) }}
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                        {getInitials(user.name)}
                      </div>
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 border border-gray-100 z-50">
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
                    onClick={openAuth}
                    className="bg-background! text-primary! border! border-primary! font-medium! rounded-[4px]! px-8! py-[8px]! whitespace-nowrap hover:bg-blue-50! transition-colors"
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
              className="text-primary hover:bg-gray-50 p-2 rounded-md transition-colors bg-transparent border-none cursor-pointer"
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
                className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-gray-200 focus:outline-none cursor-pointer p-0"
                style={{ backgroundColor: getAvatarColor(user.name) }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(user.name)}
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={openAuth}
                className="text-primary font-bold text-sm bg-transparent border-none cursor-pointer hover:underline"
              >
                Log In
              </button>
            )}
          </div>
        </div>

        {}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[100]">
            {}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            />
            {}
            <div className="absolute left-0 top-0 bottom-0 w-[280px] max-w-[85%] bg-white p-6 overflow-y-auto animate-slide-in-left flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <Logo />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full border-none bg-transparent cursor-pointer"
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

              <div className="flex flex-col gap-2">
                {!user && (
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openAuth();
                    }}
                    className="!bg-primary !text-white !font-bold !rounded-[4px] !w-full !py-[12px] !mb-4"
                  >
                    Join for Free
                  </Button>
                )}

                <div className="flex flex-col gap-1">
                  <Link
                    to="/search"
                    className="p-3 text-[16px] font-medium text-gray-dark-3 hover:bg-surface rounded-lg no-underline flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Explore
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>

                  <Link
                    to="/my-learning"
                    className="p-3 text-[16px] font-medium text-gray-dark-3 hover:bg-surface rounded-lg no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Learning
                  </Link>
                </div>

                <hr className="my-4 border-border-light" />

                <div className="flex flex-col gap-1 text-[15px] font-medium text-gray-dark-3">
                  <Link
                    to="/degrees"
                    className="p-3 hover:bg-surface rounded-lg no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Online Degrees
                  </Link>
                  <Link
                    to="/career"
                    className="p-3 hover:bg-surface rounded-lg no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find your New Career
                  </Link>
                  <a
                    href="#"
                    className="p-3 hover:bg-surface rounded-lg no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    For Individuals
                  </a>
                  <a
                    href="#"
                    className="p-3 hover:bg-surface rounded-lg no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    For Businesses
                  </a>
                  <a
                    href="#"
                    className="p-3 hover:bg-surface rounded-lg no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    For Universities
                  </a>
                </div>
              </div>

              {user && (
                <div className="mt-auto pt-8">
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-3 text-[16px] font-medium text-red-600 hover:bg-red-50 rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

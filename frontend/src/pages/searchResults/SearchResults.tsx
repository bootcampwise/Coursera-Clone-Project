import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import FilterSidebar from "../../components/search/FilterSidebar";
import SearchCourseCard from "../../components/search/SearchCourseCard";
import Pagination from "../../components/search/Pagination";
import { Link } from "react-router-dom";
import { useSearchResults } from "./useSearchResults";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const SearchResults: React.FC = () => {
  const {
    query,
    isLoading,
    currentPage,
    itemsPerPage,
    filters,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
    handleFilterChange,
    handlePageChange,
    displayedCourses,
    courses,
  } = useSearchResults();

  return (
    <div className="min-h-screen bg-surface font-sans">
      <Header />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-4 overflow-hidden">
        {}
        <div className="flex items-center gap-2 mb-4 text-[13px] text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
          <Link
            to="/"
            className="hover:text-primary transition-colors shrink-0"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>
          <span className="text-gray-300 text-[18px] font-light shrink-0">
            ›
          </span>
          <Link
            to="/google-career-certificates"
            className="hover:text-primary transition-colors shrink-0"
          >
            Google Career Certificates - DAT
          </Link>
          <span className="text-gray-300 text-[18px] font-light shrink-0">
            ›
          </span>
          <Link
            to="/results"
            className="hover:text-primary transition-colors text-blue-600 shrink-0"
          >
            Results
          </Link>
          <span className="text-gray-300 text-[18px] font-light shrink-0">
            ›
          </span>
          <span className="text-text-primary shrink-0">Search</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-surface transition-colors w-full sm:w-auto justify-center"
            >
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
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              Filter by
            </button>
          </div>

          {}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsMobileFiltersOpen(false)}
              />
              <div className="absolute left-0 top-0 bottom-0 w-[280px] max-w-[85%] bg-white p-6 overflow-y-auto animate-slide-in-left">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClose={() => setIsMobileFiltersOpen(false)}
                />
              </div>
            </div>
          )}

          {}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-[80px]">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {}
          <section className="flex-1 min-w-0">
            <h1 className="text-[18px] md:text-[20px] font-bold text-text-primary mb-6 md:mb-8 font-sans">
              {!isLoading &&
                (courses.length > 0
                  ? `Results for "${query || "All Courses"}"`
                  : `No results found for "${query}"`)}
            </h1>

            {isLoading ? (
              <LoadingSpinner fullPage={false} message="Searching..." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                {displayedCourses.map((course, index) => (
                  <SearchCourseCard
                    key={course.id || index}
                    id={course.id}
                    image={course.image}
                    partnerLogo={course.logo}
                    partnerName={course.provider}
                    title={course.title}
                    skills={course.description || ""}
                    rating={5}
                    reviews="0"
                    type={course.type}
                  />
                ))}
              </div>
            )}

            {}
            {!isLoading && courses.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={courses.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;

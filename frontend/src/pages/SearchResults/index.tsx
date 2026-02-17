import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import FilterSidebar from "../../components/search/FilterSidebar";
import SearchCourseCard from "../../components/search/SearchCourseCard";
import Pagination from "../../components/search/Pagination";

import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { courseApi } from "../../services/courseApi";
import type { SearchCourseResult } from "../../types";

const CATEGORY_MAPPING: Record<string, string> = {
  "data science": "Data Science",
  "computer science": "Computer Science",
  "information technology": "Information Technology",
  business: "Business",
  development: "Computer Science",
};

const DIFFICULTY_MAPPING: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("search") || "";
  const [courses, setCourses] = useState<SearchCourseResult[]>([]);
  const [allCourses, setAllCourses] = useState<SearchCourseResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [filters, setFilters] = useState({
    subjects: [] as string[],
    skills: [] as string[],
    levels: [] as string[],
    durations: [] as string[],
    products: [] as string[],
    educators: [] as string[],
    languages: [] as string[],
    subtitles: [] as string[],
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const initializeFiltersFromQuery = (searchQuery: string) => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const newFilters: typeof filters = {
      subjects: [],
      skills: [],
      levels: [],
      durations: [],
      products: [],
      educators: [],
      languages: [],
      subtitles: [],
    };

    if (CATEGORY_MAPPING[normalizedQuery]) {
      newFilters.subjects.push(CATEGORY_MAPPING[normalizedQuery]);
    }

    if (DIFFICULTY_MAPPING[normalizedQuery]) {
      newFilters.levels.push(DIFFICULTY_MAPPING[normalizedQuery]);
    }

    return newFilters;
  };

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await courseApi.getCourses({ search: query });
        const mappedResults = response.courses.map((c: Record<string, any>) => ({
          id: c.id || `course-${Math.random()}`,
          image:
            c.thumbnail ||
            "https://images.unsplash.com/photo-1620712943543-bcc4628c6757?w=800&auto=format&fit=crop&q=60",
          partnerLogo:
            c.instructor?.avatarUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          partnerName: c.instructor?.name || "Professional Instructor",
          title: c.title,
          skills: c.outcomes || c.description?.substring(0, 100) + "..." || "Course skills",
          rating: 4.8,
          reviews: "1.2k",
          type: `${c.difficulty || "Beginner"} · Course`,
          category: c.category,
          difficulty: c.difficulty,
          language: c.language,
        }));
        setAllCourses(mappedResults);
        setCourses(mappedResults);

        const initialFilters = initializeFiltersFromQuery(query);
        setFilters(initialFilters);
      } catch (error) {
        console.error("Error searching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    const hasActiveFilters =
      filters.subjects.length > 0 ||
      filters.skills.length > 0 ||
      filters.levels.length > 0 ||
      filters.durations.length > 0 ||
      filters.products.length > 0 ||
      filters.educators.length > 0 ||
      filters.languages.length > 0 ||
      filters.subtitles.length > 0;

    if (!hasActiveFilters) {
      setCourses(allCourses);
      return;
    }

    const filtered = allCourses.filter((course) => {
      if (filters.subjects.length > 0) {
        const matchesSubject = filters.subjects.some(
          (subject) =>
            course.category?.toLowerCase() === subject.toLowerCase() ||
            course.title?.toLowerCase().includes(subject.toLowerCase()),
        );
        if (!matchesSubject) return false;
      }

      if (filters.levels.length > 0) {
        const matchesLevel = filters.levels.some(
          (level) => course.difficulty?.toLowerCase() === level.toLowerCase(),
        );
        if (!matchesLevel) return false;
      }

      if (filters.languages.length > 0) {
        const matchesLanguage = filters.languages.some(
          (lang) => course.language?.toLowerCase() === lang.toLowerCase(),
        );
        if (!matchesLanguage) return false;
      }

      return true;
    });

    setCourses(filtered);
    setCurrentPage(1);
  }, [filters, allCourses]);

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category as keyof typeof prev];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [category]: newValues,
      };
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCourses = courses.slice(startIndex, endIndex);

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
              {isLoading
                ? "Searching..."
                : courses.length > 0
                  ? `Results for "${query || "All Courses"}"`
                  : `No results found for "${query}"`}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {!isLoading &&
                displayedCourses.map((course, index) => (
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


















































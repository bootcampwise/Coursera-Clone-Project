import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import FilterSidebar from "../../components/search/FilterSidebar";
import SearchCourseCard from "../../components/search/SearchCourseCard";
import Pagination from "../../components/search/Pagination";
import Breadcrumbs from "../../components/common/Breadcrumbs";

import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { courseApi } from "../../services/courseApi";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("search") || "";
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await courseApi.getCourses({ search: query });
        const mappedResults = response.courses.map((c: any) => ({
          id: c.id,
          image:
            c.thumbnail ||
            "https://images.unsplash.com/photo-1620712943543-bcc4628c6757?w=800&auto=format&fit=crop&q=60",
          partnerLogo:
            c.instructor?.avatarUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          partnerName: c.instructor?.name || "Professional Instructor",
          title: c.title,
          skills: c.outcomes || c.description.substring(0, 100) + "...",
          rating: 4.8,
          reviews: "1.2k",
          type: `${c.difficulty || "Beginner"} · Course`,
        }));
        setCourses(mappedResults);
      } catch (error) {
        console.error("Error searching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#F5F7F8] font-sans">
      <Header />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-4">
        {/* Breadcrumbs Row */}
        <div className="flex items-center gap-2 mb-4 text-[13px] text-gray-500">
          <Link to="/" className="hover:text-[#0056D2] transition-colors">
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
          <span className="text-gray-300 text-[18px] font-light">›</span>
          <Link
            to="/google-career-certificates"
            className="hover:text-[#0056D2] transition-colors"
          >
            Google Career Certificates - DAT
          </Link>
          <span className="text-gray-300 text-[18px] font-light">›</span>
          <Link
            to="/results"
            className="hover:text-[#0056D2] transition-colors text-blue-600"
          >
            Results
          </Link>
          <span className="text-gray-300 text-[18px] font-light">›</span>
          <span className="text-[#1f1f1f]">Search</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-[80px]">
              <FilterSidebar />
            </div>
          </aside>

          {/* Results Area */}
          <section className="flex-1">
            <h1 className="text-[20px] font-bold text-[#1f1f1f] mb-8 font-sans">
              {isLoading
                ? "Searching..."
                : courses.length > 0
                  ? `Results for "${query || "All Courses"}"`
                  : `No results found for "${query}"`}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {!isLoading &&
                courses.map((course, index) => (
                  <SearchCourseCard key={course.id || index} {...course} />
                ))}
            </div>

            <div className="mt-12">
              <Pagination />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;

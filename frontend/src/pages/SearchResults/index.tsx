import React from "react";
import LoggedHeader from "../../components/layout/LoggedHeader";
import Footer from "../../components/home/Footer";
import FilterSidebar from "../../components/search/FilterSidebar";
import SearchCourseCard from "../../components/search/SearchCourseCard";
import Pagination from "../../components/search/Pagination";
import Breadcrumbs from "../../components/common/Breadcrumbs";

import { Link } from "react-router-dom";

const SearchResults: React.FC = () => {
  const mockCourses = [
    {
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4628c6757?w=800&auto=format&fit=crop&q=60",
      partnerLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      partnerName: "Google",
      title: "Introduction to generative AI",
      skills: "Generative AI, Deep Learning, ML/DL Models, Machine Learning...",
      rating: 4.8,
      reviews: "6.5k",
      type: "Beginner · Course",
      badge: "POPULAR",
    },
    {
      image:
        "https://images.unsplash.com/photo-1591453089816-0fbb971ca25c?w=800&auto=format&fit=crop&q=60",
      partnerLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      partnerName: "Google",
      title: "Google Prompting Essentials",
      skills:
        "Data Visualization, Multimedia, Prompt Engineering, Data Presentation...",
      rating: 4.8,
      reviews: "4.3k",
      type: "Beginner · Course",
      badge: "NEW",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60",
      partnerLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      partnerName: "Google",
      title: "Google AI Essentials",
      skills:
        "Prompt Engineering, Prompt Patterns, Generative AI, Artificial Intelligence...",
      rating: 4.8,
      reviews: "15k",
      type: "Beginner · Course",
      badge: "POPULAR",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop&q=60",
      partnerLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      partnerName: "Google",
      title: "Google Business Intelligence",
      skills:
        "Data Modeling, Dashboard, Business Intelligence, Data Analysis...",
      rating: 4.8,
      reviews: "3.5k",
      type: "Advanced · Professional Certificate",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
      partnerLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      partnerName: "Google",
      title: "Google Cybersecurity",
      skills: "Threat Modeling, Vulnerability Management, Security Analyst...",
      rating: 4.8,
      reviews: "40k",
      type: "Beginner · Professional Certificate",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      partnerLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      partnerName: "Google",
      title: "Google Advanced Data Analytics",
      skills:
        "Machine Learning, Statistical Programming, Data Visualization...",
      rating: 4.8,
      reviews: "4.5k",
      type: "Advanced · Professional Certificate",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F8] font-sans">
      <LoggedHeader />

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
              Results for "Artificial Intelligence"
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {mockCourses.map((course, index) => (
                <SearchCourseCard key={index} {...course} />
              ))}
              {mockCourses.map((course, index) => (
                <SearchCourseCard key={`dup-${index}`} {...course} />
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

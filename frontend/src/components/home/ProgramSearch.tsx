import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProgramSearch: React.FC = () => {
  const tags = [
    "Popular",
    "Business",
    "Computer Science",
    "Data Science",
    "Health",
    "Information Technology",
    "Arts and Humanities",
  ];

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent, tag?: string) => {
    e?.preventDefault();
    const searchTerm = tag || query;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-[28px] md:text-[36px] font-semibold text-text-primary mb-8 font-sans">
          Search 10,000+ learning programs
        </h2>

        <div className="max-w-4xl mx-auto mb-8 relative">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="e.g. Machine Learning"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-[48px] md:h-[60px] pl-6 pr-16 border border-border-muted rounded-md text-[16px] text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 h-[32px] w-[32px] md:h-[44px] md:w-[44px] bg-primary text-white rounded-[4px] flex items-center justify-center hover:bg-primary-hover transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={(e) => handleSearch(e, tag)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                index === 0
                  ? "bg-white text-text-secondary hover:bg-gray-100"
                  : "bg-blue-50 text-primary hover:bg-blue-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSearch;

















































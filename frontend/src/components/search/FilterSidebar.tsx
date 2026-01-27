import React, { useState } from "react";

interface FilterCategoryProps {
  title: string;
  items: { label: string; count: number }[];
  showMore?: boolean;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  title,
  items,
  showMore,
}) => {
  return (
    <div className="py-6 border-b border-gray-200 last:border-0">
      <h3 className="text-[12px] font-bold text-[#1f1f1f] mb-4 uppercase tracking-[0.1em]">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.label}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] border-2 border-gray-300 rounded-[2px] text-[#0056D2] focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none checked:bg-[#0056D2] checked:border-[#0056D2] transition-all"
              />
              <svg
                className="absolute w-3 h-3 text-white pointer-events-none hidden group-has-checked:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-[14px] text-[#1f1f1f] group-hover:text-[#0056D2] transition-colors flex-1 leading-tight">
              {item.label}
            </span>
            <span className="text-[12px] text-gray-500 font-normal">
              ({item.count})
            </span>
          </label>
        ))}
        {showMore && (
          <button className="text-[#0056D2] text-[14px] font-bold hover:underline mt-1 text-left">
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

const FilterSidebar: React.FC = () => {
  return (
    <div className="w-[260px] shrink-0 font-sans pr-4">
      <h2 className="text-[20px] font-bold text-[#1f1f1f] mb-6">Filter by</h2>

      <div className="space-y-0">
        <FilterCategory
          title="Subject"
          items={[
            { label: "Data Science", count: 1710 },
            { label: "Computer Science", count: 1301 },
            { label: "Information Technology", count: 281 },
            { label: "Business", count: 14 },
          ]}
          showMore
        />

        <FilterCategory
          title="Skills"
          items={[
            { label: "Artificial Intelligence", count: 231 },
            { label: "Business Intelligence", count: 234 },
            { label: "Generative AI", count: 133 },
            { label: "Dashboard", count: 133 },
          ]}
          showMore
        />

        <FilterCategory
          title="Level"
          items={[
            { label: "Advanced", count: 1110 },
            { label: "Beginner", count: 1141 },
          ]}
        />

        <FilterCategory
          title="Duration"
          items={[
            { label: "Under 60 Minutes", count: 1510 },
            { label: "1-4 Weeks", count: 232 },
            { label: "1-3 Months", count: 121 },
            { label: "3-6 Months", count: 44 },
            { label: "Less Than 21 Hours", count: 12 },
          ]}
        />

        <FilterCategory
          title="Learning Product"
          items={[
            { label: "Short Form Content Video", count: 1710 },
            { label: "Short Form Content Lesson", count: 237 },
            { label: "Courses", count: 113 },
            { label: "Professional Certificates", count: 112 },
            { label: "Specializations", count: 112 },
            { label: "Guided Projects", count: 112 },
          ]}
        />

        <FilterCategory
          title="Educator"
          items={[
            { label: "Google", count: 1710 },
            { label: "Coursera", count: 237 },
          ]}
        />

        <FilterCategory
          title="Language"
          items={[
            { label: "English", count: 1710 },
            { label: "Portuguese (Brazil)", count: 237 },
            { label: "Japanese", count: 113 },
            { label: "Spanish", count: 112 },
          ]}
          showMore
        />

        <FilterCategory
          title="Subtitles"
          items={[
            { label: "English", count: 1710 },
            { label: "Portuguese (Brazil)", count: 237 },
            { label: "Arabic", count: 113 },
            { label: "German", count: 112 },
          ]}
          showMore
        />
      </div>
    </div>
  );
};

export default FilterSidebar;

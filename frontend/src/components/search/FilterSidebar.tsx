import React from "react";

interface FilterCategoryProps {
  title: string;
  items: { label: string; count: number }[];
  selectedItems: string[];
  onToggle: (value: string) => void;
  showMore?: boolean;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  title,
  items,
  selectedItems,
  onToggle,
  showMore,
}) => {
  return (
    <div className="py-6 border-b border-gray-200 last:border-0">
      <h3 className="text-[12px] font-bold text-gray-dark-3 mb-4 uppercase tracking-[0.1em]">
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
                checked={selectedItems.includes(item.label)}
                onChange={() => onToggle(item.label)}
                className="w-[18px] h-[18px] border-2 border-gray-300 rounded-[2px] text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none checked:bg-primary checked:border-primary transition-all"
              />
              <svg
                className={`absolute w-3 h-3 text-white pointer-events-none ${selectedItems.includes(item.label) ? "block" : "hidden"}`}
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
            <span className="text-[14px] text-gray-dark-3 group-hover:text-primary transition-colors flex-1 leading-tight">
              {item.label}
            </span>
            <span className="text-[12px] text-gray-500 font-normal">
              ({item.count})
            </span>
          </label>
        ))}
        {showMore && (
          <button className="text-primary text-[14px] font-bold hover:underline mt-1 text-left">
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

interface FilterSidebarProps {
  filters: {
    subjects: string[];
    skills: string[];
    levels: string[];
    durations: string[];
    products: string[];
    educators: string[];
    languages: string[];
    subtitles: string[];
  };
  onFilterChange: (category: string, value: string) => void;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClose,
}) => {
  return (
    <div className="w-full font-sans pr-4 lg:pr-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-bold text-gray-dark-3">Filter by</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close filters"
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-0">
        <FilterCategory
          title="Subject"
          items={[
            { label: "Data Science", count: 1710 },
            { label: "Computer Science", count: 1301 },
            { label: "Information Technology", count: 281 },
            { label: "Business", count: 14 },
          ]}
          selectedItems={filters.subjects}
          onToggle={(value) => onFilterChange("subjects", value)}
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
          selectedItems={filters.skills}
          onToggle={(value) => onFilterChange("skills", value)}
          showMore
        />

        <FilterCategory
          title="Level"
          items={[
            { label: "Advanced", count: 1110 },
            { label: "Beginner", count: 1141 },
          ]}
          selectedItems={filters.levels}
          onToggle={(value) => onFilterChange("levels", value)}
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
          selectedItems={filters.durations}
          onToggle={(value) => onFilterChange("durations", value)}
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
          selectedItems={filters.products}
          onToggle={(value) => onFilterChange("products", value)}
        />

        <FilterCategory
          title="Educator"
          items={[
            { label: "Google", count: 1710 },
            { label: "Coursera", count: 237 },
          ]}
          selectedItems={filters.educators}
          onToggle={(value) => onFilterChange("educators", value)}
        />

        <FilterCategory
          title="Language"
          items={[
            { label: "English", count: 1710 },
            { label: "Portuguese (Brazil)", count: 237 },
            { label: "Japanese", count: 113 },
            { label: "Spanish", count: 112 },
          ]}
          selectedItems={filters.languages}
          onToggle={(value) => onFilterChange("languages", value)}
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
          selectedItems={filters.subtitles}
          onToggle={(value) => onFilterChange("subtitles", value)}
          showMore
        />
      </div>
    </div>
  );
};

export default FilterSidebar;


















































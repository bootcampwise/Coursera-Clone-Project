import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-1 mt-12 py-8 font-sans">
      <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#0056D2] transition-colors">
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-medium transition-all ${
            page === 1
              ? "bg-[#0056D2] text-white underline decoration-0"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <span className="text-gray-400 mx-1">...</span>

      <button className="w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-medium text-gray-500 hover:bg-gray-100">
        18
      </button>

      <button className="w-8 h-8 flex items-center justify-center text-[#0056D2] hover:text-[#00419e] transition-colors">
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

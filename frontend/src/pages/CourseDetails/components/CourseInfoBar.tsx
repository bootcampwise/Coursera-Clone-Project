import React from "react";

const CourseInfoBar: React.FC = () => {
  const infoItems = [
    {
      label: "Professional Certificate",
      value: "Earn a career credential",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0056D2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      ),
    },
    {
      label: "4.8",
      subLabel: "92,109 reviews",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#0056D2"
          stroke="#0056D2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      label: "Beginner level",
      subLabel: "No prior experience required",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0056D2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      label: "Flexible schedule",
      subLabel: "Learn at your own pace",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0056D2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      label: "7.7 million",
      subLabel: "Learners",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0056D2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[12px] shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100 p-6 md:p-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-8 md:gap-4 overflow-hidden relative">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 flex-1 min-w-[180px] lg:min-w-0 ${
            index !== infoItems.length - 1
              ? "lg:border-r border-gray-100 pr-4"
              : ""
          }`}
        >
          <div className="shrink-0 mt-1">{item.icon}</div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-bold text-[#1f1f1f]">
                {item.label}
              </span>
              {item.label === "4.8" && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#0056D2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              )}
            </div>
            {item.subLabel && (
              <span className="text-[13px] text-gray-500 leading-tight">
                {item.subLabel}
              </span>
            )}
            {item.value && (
              <span className="text-[13px] text-gray-500 leading-tight">
                {item.value}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseInfoBar;

import React from "react";
import type { Course } from "../../types";
import { IMAGES } from "../../constants/images";

interface CourseInfoBarProps {
  course: Course;
}

const CourseInfoBar: React.FC<CourseInfoBarProps> = () => {
  const infoItems = [
    {
      label: "4 course series",
      subLabel: "Get in-depth knowledge of a subject",
    },
    {
      label: "4.8",
      subLabel: "(4,601 reviews)",
      withStar: true,
    },
    {
      label: "Beginner level",
      subLabel: "Recommended experience",
      withInfo: true,
    },
    {
      label: "4 hours to complete",
      subLabel: "Approx. 4 hours to complete",
    },
    {
      label: "Flexible schedule",
      subLabel: "Learn at your own pace",
    },
  ];

  return (
    <div className="bg-white rounded-[12px] shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100 p-5 sm:p-6 md:p-8 flex flex-wrap lg:flex-nowrap items-stretch justify-start lg:justify-between gap-y-6 gap-x-4 sm:gap-x-8 md:gap-4 overflow-hidden relative">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-start flex-1 min-w-[140px] sm:min-w-[180px] lg:min-w-0 ${
            index !== infoItems.length - 1
              ? "lg:border-r border-gray-100 lg:pr-4"
              : ""
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[14px] sm:text-[15px] font-normal text-gray-dark-3">
                {item.label}
              </span>
              {item.withStar && (
                <img
                  src={IMAGES.UI.STAR_ALT}
                  alt=""
                  className="w-3 h-3 object-contain"
                />
              )}
            </div>
            {item.subLabel && (
              <span className="text-[12px] sm:text-[13px] text-gray-500 leading-tight flex items-center gap-1 mt-0.5 sm:mt-1">
                <span className="line-clamp-2">{item.subLabel}</span>
                {item.withInfo && (
                  <img
                    src={IMAGES.UI.EXCLAMATORY_ICON}
                    alt=""
                    className="w-3 h-3 object-contain shrink-0"
                  />
                )}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseInfoBar;



















































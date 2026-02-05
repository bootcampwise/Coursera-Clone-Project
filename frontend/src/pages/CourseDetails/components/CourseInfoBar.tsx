import React from "react";
import { IMAGES } from "../../../constants/images";

interface CourseInfoBarProps {
  course: any;
}

const CourseInfoBar: React.FC<CourseInfoBarProps> = ({ course }) => {
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
    <div className="bg-white rounded-[12px] shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100 p-6 md:p-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-8 md:gap-4 overflow-hidden relative">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-start flex-1 min-w-[180px] lg:min-w-0 ${
            index !== infoItems.length - 1
              ? "lg:border-r border-gray-100 pr-4"
              : ""
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-normal text-[#1f1f1f]">
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
              <span className="text-[13px] text-gray-500 leading-tight flex items-center gap-1">
                {item.subLabel}
                {item.withInfo && (
                  <img
                    src={IMAGES.UI.EXCLAMATORY_ICON}
                    alt=""
                    className="w-3 h-3 object-contain"
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

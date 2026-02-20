import React from "react";
import type { Enrollment } from "../../types";
import { IMAGES } from "../../constants/images";

interface Props {
  enrollment?: Enrollment;
}

const ContinueLearning: React.FC<Props> = ({ enrollment }) => {
  if (!enrollment) return null;

  return (
    <div className="mb-12">
      <h2 className="text-[22px] font-bold text-gray-dark-3 mb-6 tracking-tight">
        Continue your learning
      </h2>

      <div className="flex flex-col gap-5">
        <div className="bg-white border border-border rounded-[8px] px-6 py-6 flex items-center gap-6 relative hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all cursor-pointer group w-full group overflow-hidden">
          <div className="w-[42px] h-[42px] rounded-full bg-[#1F703C] flex items-center justify-center shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[12px] text-shade-2 font-medium leading-none uppercase tracking-wide">
                {enrollment.course?.category || "Specialization"}
              </span>
            </div>
            <h3 className="text-[18px] font-bold text-gray-dark-3 mb-1.5 group-hover:text-primary transition-colors truncate pr-8 leading-snug">
              {enrollment.course?.title}
            </h3>
            <div className="text-[14px] text-gray-dark-3 font-medium leading-none opacity-80">
              {enrollment.completed
                ? "Complete"
                : `Course Progress: ${enrollment.progress}%`}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-border-light flex">
              <div
                className="bg-primary h-full transition-all duration-700"
                style={{ width: `${enrollment.progress}%` }}
              ></div>
            </div>
          </div>

          <button className="text-shade-2 hover:text-gray-dark-3 p-2 transition-colors relative z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="19" cy="12" r="1.5"></circle>
              <circle cx="5" cy="12" r="1.5"></circle>
            </svg>
          </button>
        </div>

        <div className="bg-white border border-border rounded-[8px] px-6 py-4 flex items-center gap-4 relative group cursor-pointer hover:bg-almost-white transition-colors border-l-4 border-l-primary shadow-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-[#F0F4FF]">
            <img
              src={IMAGES.LOGOS.BOT_ICON}
              alt="Bot"
              className="w-[30px] h-[30px] object-cover"
            />
          </div>
          <div className="flex-1 text-[14px] leading-tight text-gray-dark-3">
            <span className="font-medium opacity-90">
              Need help? Tell me a little about yourself
            </span>
            <span className="mx-1 opacity-70">
              so I can make the best recommendations.
            </span>
          </div>
          <button className="text-primary text-[14px] font-bold hover:underline transition-all whitespace-nowrap">
            Set your goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;

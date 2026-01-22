import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const WelcomeHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Get first name for the greeting
  const firstName = user?.name ? user.name.split(" ")[0] : "Learner";

  return (
    <div className="flex flex-col">
      <h1 className="text-[32px] font-bold text-[#1f1f1f] mb-4 tracking-tight leading-[1.1]">
        Welcome, {firstName}!
      </h1>

      <button className="w-full bg-white border border-[#0056D2] text-[#0056D2] px-4 py-[8px] rounded-[4px] font-bold text-[14px] hover:bg-[#f5f7f8] transition-colors mb-8 shadow-sm">
        Add career goals
      </button>

      <div className="bg-white border border-[#e1e1e1] rounded-[8px] overflow-hidden shadow-none">
        <div className="p-4 pb-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[11px] font-bold text-[#636363] uppercase tracking-[0.05em] leading-none">
              Weekly activity
            </h2>
            <button className="text-[#636363] hover:text-[#1f1f1f] transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-0.5 mb-5">
            <div className="text-[14px] font-bold text-[#1f1f1f] leading-snug">
              On track
            </div>
            <div className="text-[13px] text-[#636363] leading-snug">
              0 of 2-day goal. Keep it up!
            </div>
          </div>

          <div className="flex items-center justify-between px-0.5">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[11px] font-bold leading-none ${
                    index === 1
                      ? "bg-[#0056D2] text-white"
                      : "bg-[#F5F7F8] text-[#636363]"
                  }`}
                >
                  {index === 1 ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    day
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f5f7f8] px-4 py-3 text-[12px] text-[#636363] border-t border-[#e1e1e1] font-medium">
          42 items completed • 66 min learned
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;

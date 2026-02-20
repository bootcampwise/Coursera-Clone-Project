import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const WelcomeHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const firstName = user?.name ? user.name.split(" ")[0] : "Learner";

  return (
    <div className="flex flex-col">
      <h1 className="text-[36px] font-bold text-gray-dark-3 mb-6 tracking-tight leading-[1.1]">
        Welcome, {firstName}!
      </h1>

      <button className="w-full bg-white border border-primary text-primary px-4 py-[10px] rounded-[4px] font-bold text-[14px] hover:bg-surface transition-colors mb-10 shadow-sm">
        Add career goals
      </button>

      <div className="bg-white border border-border rounded-[8px] overflow-hidden shadow-none">
        <div className="p-5 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[11px] font-bold text-shade-2 uppercase tracking-[0.08em] leading-none">
              Weekly activity
            </h2>
            <button className="text-shade-2 hover:text-gray-dark-3 transition-colors">
              <svg
                width="16"
                height="16"
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

          <div className="flex flex-col gap-1 mb-6">
            <div className="text-[15px] font-bold text-gray-dark-3 leading-snug">
              On track
            </div>
            <div className="text-[13px] text-shade-2 leading-snug">
              0 of 2-day goal. Keep it up!
            </div>
          </div>

          <div className="flex items-center justify-between px-0.5">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-[34px] h-[34px] rounded-[4px] flex items-center justify-center text-[12px] font-bold leading-none border ${
                    index === 1
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-border text-shade-2"
                  }`}
                >
                  {index === 1 ? (
                    <svg
                      width="16"
                      height="16"
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

        <div className="bg-surface px-5 py-3.5 text-[12px] text-shade-2 border-t border-border font-medium">
          42 items completed • 66 min learned
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;

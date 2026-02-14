import React from "react";

const ContinueLearning: React.FC = () => {
  return (
    <div className="mb-10">
      <h2 className="text-[20px] font-bold text-gray-dark-3 mb-5 tracking-tight">
        Continue your learning
      </h2>

      <div className="flex flex-col gap-4">
        {}
        <div className="bg-white border border-border rounded-[8px] px-6 py-5 flex items-center gap-5 relative hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all cursor-pointer group w-full">
          {}
          <div className="w-[36px] h-[36px] rounded-full bg-success-dark flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
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
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[12px] text-shade-2 font-medium leading-none">
                Google UX Design
              </span>
            </div>
            <h3 className="text-[16px] font-bold text-gray-dark-3 mb-1 group-hover:text-primary truncate pr-8 leading-snug">
              Build Dynamic User Interfaces (UI) for Websites
            </h3>
            <div className="text-[13px] text-gray-dark-3 font-medium leading-none">
              Course 5 of 8. Complete
            </div>

            {}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-border-light flex">
              <div className="bg-primary w-[75%] h-full"></div>
            </div>
          </div>

          <button className="text-shade-2 hover:text-gray-dark-3 p-1 transition-colors relative z-10">
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        {}
        <div className="bg-white border border-border rounded-[8px] px-6 py-4 flex items-center gap-4 relative group cursor-pointer hover:bg-almost-white transition-colors border-l-[3px] border-l-primary">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-surface">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/personalization/bot-avatar.png?auto=format%2Ccompress&dpr=1"
              alt="Bot"
              className="w-[28px] h-[28px] object-cover"
            />
          </div>
          <div className="flex-1 text-[13px] leading-tight text-gray-dark-3">
            <span className="font-medium italic opacity-90">
              Need help? Tell me a little about yourself
            </span>
            <span className="mx-1 opacity-90">
              so I can make the best recommendations.
            </span>
          </div>
          <button className="text-primary text-[13px] font-bold hover:underline transition-all">
            Set your goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;



















































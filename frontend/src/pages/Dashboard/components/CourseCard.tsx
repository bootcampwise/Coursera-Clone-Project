import React from "react";

interface CourseCardProps {
  title: string;
  provider: string;
  image: string;
  logo: string;
  type?: string;
  badge?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  provider,
  image,
  logo,
  type = "Professional Certificate",
  badge,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border border-transparent rounded-[8px] overflow-hidden group transition-all duration-200 cursor-pointer relative">
      <div className="relative h-[160px] overflow-hidden rounded-[8px] bg-surface border border-border/40 group-hover:border-border transition-colors">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {}
        <div className="absolute top-2 right-2 flex gap-1.5 items-center">
          <div className="bg-white/95 px-[6px] py-[3.5px] rounded-[3px] text-[10px] font-bold text-gray-dark-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] uppercase tracking-tight leading-none whitespace-nowrap">
            Free Trial
          </div>
          {badge === "All skills" && (
            <div className="bg-white/95 px-[6px] py-[3px] rounded-[3px] text-[10px] font-bold text-gray-dark-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] uppercase tracking-tight flex items-center gap-1 leading-none whitespace-nowrap">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor"></circle>
                <path
                  d="M8 12l3 3 5-5"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              All skills
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 pb-2 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={logo}
            alt={provider}
            className="w-[18px] h-[18px] object-contain shrink-0"
          />
          <span className="text-[12px] text-shade-2 font-medium leading-none truncate">
            {provider}
          </span>
        </div>

        <h3 className="text-[15px] font-bold text-gray-dark-3 mb-2 line-clamp-2 leading-[1.3] group-hover:text-primary group-hover:underline decoration-1 underline-offset-2 transition-colors">
          {title}
        </h3>

        <div className="mt-auto">
          {}
          <div className="flex items-center gap-1.5 text-primary text-[12px] font-bold mb-1.5 hover:underline decoration-1 underline-offset-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5L2 10z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            <span className="leading-tight">Build toward a degree</span>
          </div>

          <p className="text-[12px] text-shade-2 font-medium uppercase tracking-tight leading-none opacity-80">
            {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;



















































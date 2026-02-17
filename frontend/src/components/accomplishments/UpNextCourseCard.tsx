import React from "react";
import { IMAGES } from "../../constants/images";

interface UpNextCourseCardProps {
  title: string;
  image: string;
  className?: string;
}

const UpNextCourseCard: React.FC<UpNextCourseCardProps> = ({
  title,
  image,
  className,
}) => {
  return (
    <div
      className={`flex flex-col h-full bg-white border border-gray-light-2-alt rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${className || ""}`}
    >
      <div className="relative p-2 h-[160px] overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[8px]"
        />
      </div>

      <div className="pt-3 pb-3 ml-3 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={IMAGES.LOGOS.GOOGLE_LOGO}
            alt="Google"
            className="w-[26px] h-[26px] object-contain shrink-0"
          />
          <span className="text-[16px] text-gray-medium-2-alt font-normal leading-none truncate">
            Google
          </span>
        </div>

        <h3 className="text-[16px] font-normal text-gray-darkest-2 mb-8 line-clamp-2 leading-[1.3] min-h-[48px]">
          {title}
        </h3>

        <div className="mt-auto">
          <p className="text-[12px] text-shade-2 font-medium uppercase tracking-tight leading-none opacity-80">
            Course
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpNextCourseCard;



















































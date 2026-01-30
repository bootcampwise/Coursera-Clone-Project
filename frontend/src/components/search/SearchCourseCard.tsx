import React from "react";
import { useNavigate } from "react-router-dom";

interface SearchCourseCardProps {
  id: string;
  image: string;
  badge?: string;
  partnerLogo: string;
  partnerName: string;
  title: string;
  skills: string;
  rating: number;
  reviews: string;
  type: string;
}

const SearchCourseCard: React.FC<SearchCourseCardProps> = ({
  id,
  image,
  badge,
  partnerLogo,
  partnerName,
  title,
  skills,
  rating,
  reviews,
  type,
}) => {
  const navigate = useNavigate();
  const hasDegreeLink =
    title.includes("Intelligence") ||
    title.includes("Cyber") ||
    title.includes("Data Analytics");

  return (
    <div
      onClick={() => navigate(`/course/${id}`)}
      className="bg-white rounded-[4px] border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full font-sans group"
    >
      {/* Image Section */}
      <div className="relative aspect-[16/9] w-full bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {badge && (
          <div
            className={`absolute bottom-0 left-0 right-0 h-[24px] flex items-center px-3 text-[11px] font-bold text-white uppercase tracking-wider ${
              badge === "POPULAR"
                ? "bg-[#981b61]"
                : badge === "NEW"
                  ? "bg-[#0056D2]"
                  : "bg-[#e7e7e7] text-[#1f1f1f]"
            }`}
          >
            <span className="flex items-center gap-1">
              {badge === "POPULAR" && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 1L9 9H1L7 14L4 22L12 17L20 22L17 14L23 9H15L12 1Z" />
                </svg>
              )}
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Partner Info */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={partnerLogo}
            alt={partnerName}
            className="h-[18px] w-auto object-contain"
          />
          <span className="text-[12px] text-gray-500 font-medium">
            {partnerName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-bold text-[#1f1f1f] mb-3 line-clamp-2 leading-[1.3] group-hover:text-[#0056D2] transition-colors min-h-[42px]">
          {title}
        </h3>

        {/* Skills */}
        <p className="text-[13px] text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1">
          <span className="font-bold text-[#1f1f1f]">Skills you'll gain: </span>
          {skills}
        </p>

        {/* Degree Link (Optional) */}
        {hasDegreeLink && (
          <div className="flex items-center gap-2 mb-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0056D2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            <span className="text-[13px] font-bold text-[#0056D2]">
              Build toward a degree
            </span>
          </div>
        )}

        {/* Rating & Metadata */}
        <div className="mt-auto">
          <div className="flex items-center gap-1.5 mb-2">
            <svg
              className="w-[14px] h-[14px] text-yellow-500 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[13px] font-bold text-[#1f1f1f]">
              {rating}
            </span>
            <span className="text-[13px] text-gray-500">
              ({reviews} reviews)
            </span>
          </div>
          <div className="text-[13px] text-gray-600 font-medium">{type}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchCourseCard;

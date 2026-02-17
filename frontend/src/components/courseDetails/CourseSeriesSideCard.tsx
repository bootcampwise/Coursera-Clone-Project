import React from "react";
import { IMAGES } from "../../constants/images";

interface CourseSeriesSideCardProps {
  instructorName?: string;
}

const CourseSeriesSideCard: React.FC<CourseSeriesSideCardProps> = ({
  instructorName,
}) => {
  const name = instructorName || "Google Career Certificates";
  return (
    <div className="border border-gray-200 rounded-[10px] bg-white overflow-hidden h-fit">
      <div className="p-5">
        <p className="text-[13px] text-gray-500 mb-3">Instructor</p>
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.UI.TEXT_ICON_1}
            alt=""
            className="w-8 h-8 object-contain"
          />
          <div>
            <p className="text-[13px] font-semibold text-gray-dark-3">{name}</p>
            <p className="text-[11px] text-gray-500">Google</p>
          </div>
        </div>
        <div className="mt-3 text-[11px] text-gray-500">
          378 Courses • 14,191,801 learners
        </div>
      </div>
      <div className="h-0.5 bg-gray-100 mx-5"></div>
      <div className="p-5">
        <p className="text-[13px] text-gray-500 mb-3">Offered by</p>
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.UI.TEXT_ICON_2}
            alt=""
            className="w-8 h-8 object-contain"
          />
          <div>
            <p className="text-[13px] font-semibold text-gray-dark-3">Google</p>
            <button className="text-[11px] text-primary hover:underline">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSeriesSideCard;



















































import React from "react";
import { type Accomplishment } from "../../pages/Accomplishments/mockData";

interface Props {
  accomplishment: Accomplishment;
}

const AccomplishmentItem: React.FC<Props> = ({ accomplishment }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-8 border-b border-border last:border-0 hover:bg-gray-50 transition-colors px-4 -mx-4 rounded-lg">
      {/* Icon/Image */}
      <div className="w-[72px] h-[72px] shrink-0 border border-border rounded-[4px] bg-white p-1">
        <img
          src={accomplishment.image}
          alt={accomplishment.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[16px] font-bold text-[#1f1f1f] mb-1 leading-snug hover:underline cursor-pointer">
          {accomplishment.title}
        </h3>
        <p className="text-[14px] text-[#1f1f1f] mb-1">{accomplishment.type}</p>
        <div className="flex items-center gap-2 text-[14px] text-[#5f6368]">
          {accomplishment.grade && (
            <span>
              Grade:{" "}
              <span className="text-[#1f1f1f] font-medium">
                {accomplishment.grade}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="shrink-0 w-full md:w-auto">
        <button className="w-full md:w-auto px-6 py-2 bg-white text-[#0056D2] font-bold text-[14px] rounded-[4px] border border-[#0056D2] hover:bg-[#f5f7f8] transition-colors whitespace-nowrap">
          View Certificate
        </button>
      </div>
    </div>
  );
};

export default AccomplishmentItem;

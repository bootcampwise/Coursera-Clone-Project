import React from "react";
import { type Degree } from "../../mocks/mockData";

interface Props {
  degree: Degree;
}

const DegreeCard: React.FC<Props> = ({ degree }) => {
  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg bg-white hover:shadow-md transition-shadow cursor-pointer h-full">
      <div className="w-[100px] h-[100px] shrink-0">
        <img
          src={degree.image}
          alt={degree.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={degree.logo}
            alt={degree.university}
            className="w-5 h-5 object-contain"
          />
          <span className="text-[12px] font-semibold text-gray-dark-3">
            {degree.university}
          </span>
        </div>
        <h3 className="text-[16px] font-bold text-gray-dark-3 mb-1 leading-snug">
          {degree.title}
        </h3>
        <p className="text-[14px] text-text-gray mt-auto">
          {degree.description}
        </p>
      </div>
    </div>
  );
};

export default DegreeCard;


















































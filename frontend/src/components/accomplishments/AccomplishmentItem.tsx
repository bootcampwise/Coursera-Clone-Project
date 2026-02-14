import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  accomplishment: {
    id: string;
    title: string;
    type: string;
    image: string;
    grade?: string;
  };
}

const AccomplishmentItem: React.FC<Props> = ({ accomplishment }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-8 border-b border-border last:border-0 hover:bg-gray-50 transition-colors px-4 -mx-4 rounded-lg">
      {}
      <div className="w-[72px] h-[72px] shrink-0 border border-border rounded-[4px] bg-white p-1">
        <img
          src={accomplishment.image}
          alt={accomplishment.title}
          className="w-full h-full object-contain"
        />
      </div>

      {}
      <div className="flex-1 min-w-0">
        <h3 className="text-[16px] font-bold text-gray-dark-3 mb-1 leading-snug hover:underline cursor-pointer">
          {accomplishment.title}
        </h3>
        <p className="text-[14px] text-gray-dark-3 mb-1">{accomplishment.type}</p>
        <div className="flex items-center gap-2 text-[14px] text-text-gray">
          {accomplishment.grade && (
            <span>
              Grade:{" "}
              <span className="text-gray-dark-3 font-medium">
                {accomplishment.grade}
              </span>
            </span>
          )}
        </div>
      </div>

      {}
      <div className="shrink-0 w-full md:w-auto">
        <button
          onClick={() =>
            navigate(`/accomplishments/certificate/${accomplishment.id}`)
          }
          className="w-full md:w-auto px-6 py-2 bg-white text-primary font-bold text-[14px] rounded-[4px] border border-primary hover:bg-surface transition-colors whitespace-nowrap"
        >
          View Certificate
        </button>
      </div>
    </div>
  );
};

export default AccomplishmentItem;


















































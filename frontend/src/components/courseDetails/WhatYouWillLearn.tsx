import React from "react";

interface WhatYouWillLearnProps {
  outcomes?: string | string[];
  description: string;
}

const WhatYouWillLearn: React.FC<WhatYouWillLearnProps> = ({
  outcomes,
  description,
}) => {
  const safeDescription = description || "";
  const normalizeOutcomes = (value?: string | string[]) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((p) => p.trim()).filter(Boolean);
    }
    return value
      .split(/\r?\n|;|•|- /g)
      .map((p) => p.trim())
      .filter(Boolean);
  };

  const points = normalizeOutcomes(outcomes);
  const displayPoints =
    points.length > 0
      ? points
      : safeDescription
          .substring(0, 100)
          .split(/\r?\n|;|•|- /g)
          .map((p) => p.trim())
          .filter(Boolean);

  if (displayPoints.length === 0) return null;

  return (
    <section>
      <h2 className="text-[20px] font-normal text-gray-dark-3 mb-4">
        What you will learn
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
        {displayPoints.map((point, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 shrink-0 ">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-[14px] font-normal text-gray-700 leading-snug">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatYouWillLearn;



















































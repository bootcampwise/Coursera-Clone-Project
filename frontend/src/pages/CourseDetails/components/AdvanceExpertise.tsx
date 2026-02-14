import React from "react";

interface AdvanceExpertiseProps {
  thumbnailUrl?: string;
}

const AdvanceExpertise: React.FC<AdvanceExpertiseProps> = ({
  thumbnailUrl,
}) => {
  const imageSrc =
    thumbnailUrl ||
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800";

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-10 min-h-0 md:min-h-[240px]">
        <div className="py-4 md:py-6">
          <h2 className="text-[18px] sm:text-[20px] font-normal text-gray-dark-3 mb-4 sm:mb-3">
            Advance your subject matter expertise
          </h2>
          <ul className="space-y-3">
            {[
              "Learn in-demand skills from university and industry experts",
              "Master a subject or tool with hands-on projects",
              "Develop a deep understanding of key concepts",
              "Earn a career certificate from Google",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[13px] text-gray-700"
              >
                <span className="text-black font-bold mt-[2px]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[180px] sm:h-[220px] md:h-[240px] overflow-hidden rounded-[8px] w-full shadow-sm">
          <img
            src={imageSrc}
            alt="Students working"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvanceExpertise;



















































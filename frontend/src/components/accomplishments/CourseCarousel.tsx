import React from "react";
import { type Recommendation } from "../../mocks/mockData";

interface Props {
  title: string;
  recommendations: Recommendation[];
}

const CourseCarousel: React.FC<Props> = ({ title, recommendations }) => {
  return (
    <div className="mb-12">
      <h2 className="text-[20px] md:text-[24px] font-semibold text-gray-dark-3 mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer flex flex-col h-full bg-white hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-transparent hover:border-border"
          >
            {}
            <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={item.partnerLogo}
                  alt={item.partner}
                  className="w-6 h-6 object-contain rounded-sm"
                />
                <span className="text-[12px] text-text-gray font-medium truncate">
                  {item.partner}
                </span>
              </div>

              <h3 className="text-[16px] font-bold text-gray-dark-3 mb-1 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <div className="mt-auto pt-4">
                <p className="text-[12px] text-text-gray uppercase tracking-wide font-medium">
                  {item.type}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[14px] font-bold text-orange-accent flex items-center gap-1">
                    4.8{" "}
                    <svg
                      className="w-3 h-3 text-orange-accent fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                  <span className="text-[12px] text-text-gray">
                    (2.5k reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCarousel;


















































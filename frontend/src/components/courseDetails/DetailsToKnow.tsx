import React from "react";
import { IMAGES } from "../../constants/images";

const DetailsToKnow: React.FC = () => {
  return (
    <section>
      <h2 className="text-[20px] font-normal text-gray-dark-3 mb-4">
        Details to know
      </h2>
      <div className="flex flex-wrap gap-10">
        <div className="flex items-start gap-3 min-w-[220px]">
          <img
            src={IMAGES.UI.LINKEDIN_ICON}
            alt=""
            className="w-6 h-6 object-contain"
          />
          <div>
            <p className="text-[14px] font-normal text-gray-dark-3">
              Shareable certificate
            </p>
            <p className="text-[12px] text-gray-500">
              Add to your LinkedIn profile
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 min-w-[220px]">
          <img
            src={IMAGES.UI.TAUGHT_ICON}
            alt=""
            className="w-6 h-6 object-contain"
          />
          <div>
            <p className="text-[14px] font-normal text-gray-dark-3">
              Taught in English
            </p>
            <button className="text-[12px] text-primary hover:underline">
              15 languages available
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsToKnow;



















































import React, { useState } from "react";
import Button from "../../components/common/Button";
import { IMAGES } from "../../constants/images";

const Hero: React.FC = () => {
  const [showPromo, setShowPromo] = useState(false); 

  return (
    <div className="flex flex-col font-sans">
      {}
      {showPromo && (
        <div className="bg-blue-100 py-3 relative z-20">
          <div className="container mx-auto px-4 md:px-8 flex items-center justify-center text-[14px] md:text-[16px]">
            <span className="text-text-primary text-center">
              Saving 40% on access to 10,000+{" "}
              <span className="text-brown-medium font-medium">programs</span> is a
              holiday treat.{" "}
              <a href="#" className="text-primary font-bold hover:underline">
                Save now
              </a>
              .
            </span>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 md:right-8 text-primary hover:text-primary-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {}
      <div className="bg-blue-ultra-light w-full overflow-hidden md:px-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="w-[6px] h-6 bg-primary mb-6 hidden md:block"></div>
          <div className="flex flex-col md:flex-row items-center pt-6 pb-0 md:py-16">
            {}
            <div className="w-full md:w-1/2 flex flex-col items-start pb-4 pr-0 md:pr-12 md:pb-12 order-2 md:order-1">
              {}

              <h1 className="text-[36px] sm:text-[44px] md:text-[64px] leading-[1.05] font-normal text-text-primary mb-6 tracking-tight">
                Achieve your career goals with Coursera Plus
              </h1>

              <p className="text-[16px] md:text-[18px] text-text-primary mb-4 leading-relaxed font-normal">
                Subscribe to build job-ready skills from world-class
                institutions.
              </p>

              <div className="text-[16px] text-text-secondary mb-8 font-normal">
                $24/month, cancel anytime
              </div>

              <div className="flex flex-col gap-4 items-start w-full">
                <Button
                  variant="primary"
                  className="bg-primary! text-background! font-bold! py-3.5! px-8! rounded-[5px]! hover:bg-primary-hover! shadow-md w-fit md:w-auto text-[16px]"
                >
                  Start 7-day Free Trial
                </Button>
                <a
                  href="#"
                  className="text-primary text-[14px] md:text-[16px] font-medium hover:underline"
                >
                  or $160/year with 14-day money-back guarantee
                </a>
              </div>
            </div>

            {}
            <div className="w-[120%] -mx-[10%] md:w-1/2 md:mx-0 order-1 md:order-2 mb-8 md:mb-0">
              <img
                src={IMAGES.HERO2}
                alt="Coursera Plus Hero"
                className="w-full h-auto object-contain md:scale-110 md:origin-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


















































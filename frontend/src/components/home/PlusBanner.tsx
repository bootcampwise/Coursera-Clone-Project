import React from "react";
import Button from "../common/Button";

const PlusBanner: React.FC = () => {
  return (
    <section className="bg-primary py-8 md:py-10 text-center">
      <div className="container mx-auto px-4">
        {}
        <div className="flex items-center justify-center gap-0 mb-3">
          <span className="text-white text-[24px] md:text-[30px] font-normal tracking-[-0.02em] font-sans">
            coursera
          </span>
          <div className="mx-3.5 h-[18px] md:h-[22px] w-[1px] bg-white opacity-40"></div>
          <span className="bg-white text-primary text-[11px] md:text-[13px] font-bold px-1.5 py-0 md:px-2 md:py-0 rounded-[2px] tracking-[0.02em] flex items-center justify-center ml-0.5">
            PLUS
          </span>
        </div>

        <p className="text-white text-[13px] md:text-[14px] font-normal mb-5 font-sans opacity-95">
          Achieve your career goals with Coursera Plus
        </p>

        <div className="flex flex-col items-center gap-3">
          <Button className="bg-white! text-primary! font-medium! py-2 px-7 rounded-[4px]! text-[13px] md:text-[14px] hover:bg-white/90! transition-all">
            Start 7-day Free Trial
          </Button>
          <p className="text-white text-[11px] md:text-[12px] font-normal opacity-80">
            $24/month, cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlusBanner;


















































import React from "react";
import Button from "../common/Button";
import { IMAGES } from "../../constants/images";

const LearnerOutcomes: React.FC = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-24">
        {}
        <div className="flex-1 max-w-[600px] text-center md:text-left">
          <h2 className="text-[28px] md:text-[48px] font-semibold text-text-primary leading-[1.2] md:leading-[1.15] mb-6 font-sans">
            77% of learners report career benefits, like landing a new job,
            earning a promotion, gaining applicable skills, and more.{" "}
            <sup className="text-[16px] md:text-[20px] top-[-0.8em] md:top-[-1em]">
              1
            </sup>
          </h2>
          <div className="mt-8">
            <Button
              className=" text-primary border-primary font-bold border py-3 px-8 hover:bg-blue-50 rounded-[5px] text-[16px]"
              variant="ghost"
            >
              Start 7-day Free Trial
            </Button>
          </div>
        </div>

        {}
        <div className="flex-1 w-full relative flex justify-center md:justify-end">
          {}
          <div className="relative w-full max-w-[500px] aspect-4/3">
            {}
            <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-blue-50 rounded-tr-[100px] rounded-bl-[50px] -z-10 translate-x-4 -translate-y-4"></div>
            <img
              src={IMAGES.LEARNER_OUTCOMES}
              alt="Learner"
              className="w-full h-full object-cover rounded-lg shadow-lg clip-path-custom"
              style={{
                clipPath:
                  "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
              }} 
            />
            {}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnerOutcomes;

















































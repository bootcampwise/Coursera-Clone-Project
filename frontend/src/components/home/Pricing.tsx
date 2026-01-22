import React, { useState } from "react";
import Button from "../common/Button";

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false); // Toggle state placeholder

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4 text-primary flex-shrink-0 mt-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  return (
    <section className="bg-[#F5F7F8] py-16 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header & Toggle */}
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-text-primary mb-8">
            Plans for you or your team
          </h2>
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-border-muted relative">
            <div className="absolute left-1 top-1 bottom-1 w-[50%] bg-primary rounded-full transition-all duration-300"></div>
            <button className="relative z-10 px-8 py-2 text-white font-semibold text-sm rounded-full">
              For you
            </button>
            <button className="relative z-10 px-6 py-2 text-text-secondary font-semibold text-sm rounded-full hover:text-primary transition-colors">
              For your team
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 max-w-6xl mx-auto items-start">
          {/* Card 1: Single Learning Program */}
          <div className="bg-white p-8 border border-gray-200 rounded-lg md:rounded-r-none md:rounded-l-lg md:border-r-0 h-full flex flex-col relative z-0 md:mt-8 shadow-sm md:shadow-none">
            <h3 className="text-[20px] font-semibold text-text-primary mb-2">
              Single learning program
            </h3>
            <p className="text-sm text-text-secondary mb-8">
              Learn a single topic or skill and earn a credential
            </p>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-normal text-text-primary">
                  $20 - $20
                </span>
                <span className="text-xs text-text-secondary line-through italic ml-2">
                  /month
                </span>
                {/* Note: Screenshot text implies price/month but "$20 - $20" looks like a range. Transcribing exactly. Actually looks like "$49 - $79" usually, but user image has "$20 - $20". I will strictly follow image.*/}
              </div>
            </div>

            <div className="text-xs text-text-primary mb-6">
              Visit an individual course or Specialization page to purchase.
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <ul className="space-y-4 text-sm text-text-primary flex-grow">
              <li className="flex gap-3 items-start">
                <CheckIcon />
                <span>Access all courses within the learning program</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckIcon />
                <span>
                  Earn a certificate upon completion after your trial ends
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: Coursera Plus Monthly (Highlighted) */}
          <div className="bg-white border-2 border-primary rounded-lg shadow-xl relative z-10 overflow-hidden md:-my-6 flex flex-col h-full transform md:scale-105">
            <div className="bg-primary text-white text-center text-xs font-bold py-2 uppercase tracking-wide">
              Most popular
            </div>
            <div className="p-8 flex flex-col h-full bg-white">
              <h3 className="text-[20px] font-semibold text-text-primary mb-2">
                Coursera Plus Monthly
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Complete multiple courses and earn credentials in the short term
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-normal text-text-primary">
                    $24
                  </span>
                  <span className="text-[16px] text-text-primary">/month</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="!w-full !py-3 !rounded-[4px] !font-bold mb-4"
              >
                Start 7-day free trial
              </Button>
              <div className="text-center text-xs text-text-secondary mb-6">
                Cancel anytime
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <ul className="space-y-4 text-sm text-text-primary flex-grow">
                <li className="flex gap-3 items-start">
                  <CheckIcon />
                  <span>
                    Access 10,000+ courses and Specializations from 170+ leading
                    companies and universities
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckIcon />
                  <span>Earn unlimited certificates after your trial ends</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckIcon />
                  <span>
                    Learn job-relevant skills and tools with 1,000+ applied
                    projects and hands-on labs from industry experts
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckIcon />
                  <span>
                    Choose from more than 15 Professional Certificate programs
                    from industry leaders like Google, Facebook, and more
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Coursera Plus Annual */}
          <div className="bg-white p-8 border border-gray-200 rounded-lg md:rounded-l-none md:rounded-r-lg md:border-l-0 h-full flex flex-col relative z-0 md:mt-8 shadow-sm md:shadow-none">
            <h3 className="text-[20px] font-semibold text-text-primary mb-2">
              Coursera Plus Annual
            </h3>
            <p className="text-sm text-text-secondary mb-8">
              Combine flexibility and savings with long-term learning goals
            </p>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-normal text-text-primary">
                  $160
                </span>
                <span className="text-[16px] text-text-primary">/year</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="!w-full !py-3 !rounded-[4px] !font-bold !border-primary !text-primary hover:!bg-blue-50 mb-4"
            >
              Try Coursera Plus Annual
            </Button>
            <div className="text-center text-xs text-text-secondary mb-6">
              14-day money-back guarantee
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <ul className="space-y-4 text-sm text-text-primary flex-grow">
              <div className="text-xs text-text-secondary mb-2">
                Everything included in the monthly plan, plus:
              </div>
              <li className="flex gap-3 items-start">
                <CheckIcon />
                <span>Save when you pay up front for the year</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckIcon />
                <span>
                  Enjoy maximum flexibility to achieve work/life balance and
                  learn at your own pace
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

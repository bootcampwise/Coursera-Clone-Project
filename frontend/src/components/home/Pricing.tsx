import React, { useState } from "react";

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false); 

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  return (
    <section className="bg-bg-light-blue py-20 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        {}
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[34px] font-normal text-gray-dark-3 mb-10">
            Plans for you or your team
          </h2>
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-very-light-3 relative h-[56px] w-[280px]">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full transition-all duration-300 ${
                isAnnual ? "left-[calc(50%+2px)]" : "left-1"
              }`}
            ></div>
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 relative z-10 font-bold text-[14px] rounded-full transition-colors ${
                !isAnnual ? "text-white" : "text-gray-dark-3"
              }`}
            >
              For you
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 relative z-10 font-bold text-[14px] rounded-full transition-colors ${
                isAnnual ? "text-white" : "text-gray-dark-3"
              }`}
            >
              For your team
            </button>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-center px-4">
          {}
          <div className="bg-white p-8 border border-gray-very-light-3 rounded-[4px] flex flex-col shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 cursor-default min-h-[520px]">
            <h3 className="text-[22px] font-normal text-gray-dark-3 mb-3">
              Single learning program
            </h3>
            <p className="text-[14px] text-gray-600 mb-8 leading-relaxed">
              Learn a{" "}
              <span className="underline decoration-dotted">single</span> topic
              or skill and earn a credential
            </p>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-[28px] font-normal text-gray-dark-3">
                  $20 - $20
                </span>
                <span className="text-[14px] text-gray-500 italic ml-2">
                  /month
                </span>
              </div>
            </div>

            <div className="text-[13px] text-gray-700 leading-relaxed mb-8">
              Visit an{" "}
              <span className="underline decoration-dotted">individual</span>{" "}
              course or Specialization page to purchase.
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <ul className="space-y-4 text-[14px] text-gray-700 flex-grow">
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

          {}
          <div className="bg-white border-[2px] border-primary rounded-[4px] relative flex flex-col shadow-xl overflow-hidden md:-my-12 z-10 transition-all duration-300 hover:shadow-2xl min-h-[620px]">
            <div className="bg-primary text-white text-center text-[13px] font-normal py-2.5">
              Most popular
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-[22px] font-normal text-gray-dark-3 mb-3">
                Coursera Plus <span className="text-primary">Monthly</span>
              </h3>
              <p className="text-[14px] text-gray-600 mb-8 leading-relaxed">
                Complete multiple courses and earn credentials in the short term
              </p>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-[32px] font-normal text-gray-dark-3">
                    $24
                  </span>
                  <span className="text-[16px] text-gray-700">/month</span>
                </div>
              </div>

              <button className="w-full py-3.5 bg-primary text-white rounded-[4px] font-bold text-[15px] hover:bg-primary-hover transition-colors mb-4">
                Start 7-day free trial
              </button>
              <div className="text-center text-[14px] text-gray-700 mb-8">
                Cancel anytime
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <ul className="space-y-4 text-[14px] text-gray-700 grow">
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

          {}
          <div className="bg-white p-8 border border-gray-very-light-3 rounded-[4px] flex flex-col shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 cursor-default min-h-[520px]">
            <h3 className="text-[22px] font-normal text-gray-dark-3 mb-3">
              Coursera Plus Annual
            </h3>
            <p className="text-[14px] text-gray-600 mb-8 leading-relaxed">
              Combine flexibility and savings with long-term learning goals
            </p>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-[28px] font-normal text-gray-dark-3">
                  $160
                </span>
                <span className="text-[16px] text-gray-dark-3">/year</span>
              </div>
            </div>

            <button className="w-full py-3.5 bg-white text-primary border border-primary rounded-[4px] font-bold text-[15px] hover:bg-blue-50 transition-colors mb-4">
              Try Coursera Plus Annual
            </button>
            <div className="text-center text-[14px] text-gray-700 mb-8 leading-relaxed">
              14-day{" "}
              <span className="text-brown-accent border-b border-brown-accent/30">
                money-back guarantee
              </span>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <ul className="space-y-4 text-[14px] text-gray-700">
              <div className="text-[13px] text-gray-600 mb-6 font-normal">
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


















































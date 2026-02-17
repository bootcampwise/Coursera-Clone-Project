import React, { useState } from "react";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); 
  
  

  const faqs = [
    {
      q: "Can I try Coursera Plus first, to make sure it's right for me?",
      a: "Yes! You can start a 7-day free trial to see if Coursera Plus is right for you. You can cancel at any time.",
    },
    {
      q: "What is included in Coursera Plus?",
      a: "Coursera Plus includes unlimited access to 7,000+ courses, Projects, and Specializations.",
    },
    {
      q: "Will I save money with Coursera Plus?",
      a: "If you plan to take multiple courses per year, Coursera Plus can save you money compared to paying for each course individually.",
    },
  ];

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-semibold text-text-primary mb-6 md:mb-8 font-sans text-left">
            Frequently asked questions
          </h2>
          <div className="bg-background border border-border-muted rounded-lg p-6 md:p-12 mb-4">
            <div className="space-y-6">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-border-muted last:border-0 pb-6 last:pb-0"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="flex items-center gap-4 w-full text-left group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`w-5 h-5 text-text-primary transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                    <span className="text-[16px] md:text-[18px] text-text-primary font-normal group-hover:text-primary transition-colors">
                      {item.q}
                    </span>
                  </button>

                  <div
                    className={`mt-4 pl-9 text-text-secondary overflow-hidden transition-all duration-300 ${
                      openIndex === index
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.a}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-start">
              <button className="flex items-center gap-2 text-text-primary font-semibold text-sm hover:text-primary transition-colors">
                Show all 8 frequently asked questions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-text-secondary mt-8 pl-1">
          <span className="font-bold">1</span>- Learner Outcome Report 2023
        </div>
      </div>
    </section>
  );
};

export default FAQ;


















































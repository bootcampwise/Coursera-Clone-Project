import React from "react";

const WhatYouWillLearn: React.FC = () => {
  const points = [
    "Identify prompting techniques to get better results from LLMs",
    "Apply prompting essential elements (Persona, Task, Context, Format) to improve Gemini results",
    "Apply prompt essential elements such as Persona, Task, Context, and Format to help improve LLM results",
    "Identify ways prompting can help you use generative AI to be more productive at work",
  ];

  return (
    <section>
      <h2 className="text-[24px] font-bold text-[#1f1f1f] mb-6">
        What you will learn
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {points.map((point, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1 shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0056D2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-[15px] text-gray-700 leading-normal">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatYouWillLearn;

import React from "react";

const AdvanceExpertise: React.FC = () => {
  return (
    <section className="bg-white rounded-[12px] border border-gray-100 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-[28px] font-bold text-[#1f1f1f] mb-6 leading-tight">
            Advance your subject matter expertise
          </h2>
          <ul className="space-y-4">
            {[
              "Learn in-demand skills from university and industry experts",
              "Master a subject or tool with hands-on projects",
              "Develop a deep understanding of key concepts",
              "Earn a career certificate from Google",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[15px] text-gray-700"
              >
                <span className="text-[#0056D2] font-bold mt-[2px]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[250px] md:h-auto overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
            alt="Students working"
            className="w-full h-full object-cover grayscale opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvanceExpertise;

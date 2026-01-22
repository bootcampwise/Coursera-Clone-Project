import React, { useState } from "react";

const CourseTabs: React.FC = () => {
  const tabs = ["About", "Outcomes", "Courses", "Testimonials"];
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className="border-b border-gray-200 sticky top-[64px] bg-white z-20 -mx-4 md:-mx-0 px-4 md:px-0">
      <div className="flex items-center gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 text-[14px] font-bold border-b-2 transition-all ${
              activeTab === tab
                ? "border-[#0056D2] text-[#0056D2]"
                : "border-transparent text-gray-600 hover:text-[#1f1f1f]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseTabs;

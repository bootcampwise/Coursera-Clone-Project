import React, { useState } from "react";

const CourseTabs: React.FC = () => {
  const tabs = ["About", "Outcomes", "Courses", "Testimonials"];
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className="sticky top-[64px] bg-white z-20 -mx-4 md:-mx-0 px-4 md:px-0 pb-2">
      <div className="max-w-[860px]">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[14px] font-normal rounded-[6px] transition-all ${
                activeTab === tab
                  ? "bg-blue-light-7 text-primary underline underline-offset-4"
                  : "text-shade-4-alt hover:text-gray-dark-3"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-2 h-px w-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default CourseTabs;



















































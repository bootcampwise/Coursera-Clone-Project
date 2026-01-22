import React, { useState } from "react";
import LoggedHeader from "../../components/layout/LoggedHeader";
import Footer from "../../components/home/Footer";

const MyLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Completed");

  const tabs = ["In Progress", "Saved", "Completed"];

  return (
    <div className="min-h-screen bg-white font-sans">
      <LoggedHeader searchPlaceholder="Search Coursera for Google Career Certific..." />

      <main className="container mx-auto px-4 py-8 max-w-[1100px]">
        {/* Page Title */}
        <h1 className="text-[32px] font-bold text-[#1f1f1f] mb-6">
          My Google Career Certificates - UAF - Female Learning
        </h1>

        {/* Tabs */}
        <div className="flex gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-[14px] font-bold transition-colors ${
                activeTab === tab
                  ? "bg-[#1f1f1f] text-white"
                  : "bg-white text-[#1f1f1f] border border-[#1f1f1f] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Specialization Card */}
        <div className="border border-[#e1e1e1] rounded-[8px] overflow-hidden shadow-sm mb-12">
          {/* Card Top Section */}
          <div className="p-8 flex gap-8">
            {/* Image */}
            <div className="w-[180px] h-[120px] shrink-0 rounded-[4px] overflow-hidden">
              <img
                src="/images/office_man_smiling.png"
                alt="Google Prompting Essentials"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-[20px] font-bold text-[#1f1f1f] mb-2 hover:text-[#0056D2] cursor-pointer">
                Google Prompting Essentials
              </h2>
              <p className="text-[14px] text-[#1f1f1f] leading-relaxed mb-4">
                Want to use generative AI tools but not sure where to start?
                Google Prompting Essentials teaches you how to give clear and
                specific instructions to generative AI—known as prompting. In 5
                easy steps, you'll learn how to prompt effectively and unlock
                more of AI's benefits. Through hands-on exercises and real-world
                examples, you'll learn how to use AI to: Save time: Craft
                emails, brainstorm with ease, build tables and trackers, and
                summarize lengthy documents. Uncover...
              </p>

              <button className="flex items-center gap-1 text-[#0056D2] text-[14px] font-bold mb-6 hover:underline">
                More
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1.5L5 5.5L9 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <span className="text-[14px] font-bold text-[#1f1f1f]">
                  4 courses
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="w-[44px] h-[44px] rounded-full bg-[#187541] flex items-center justify-center text-white font-bold text-[18px]"
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <button className="ml-2 text-[#636363] hover:text-[#1f1f1f]">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path
                      d="M1 1L8 8L15 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Card Bottom Section (Completed Course) */}
          <div className="border-t border-[#e1e1e1] p-8 flex gap-8 bg-white hover:bg-gray-50 transition-colors group cursor-pointer">
            <div className="w-[180px] h-[100px] shrink-0 rounded-[4px] overflow-hidden">
              <img
                src="/images/office_man_smiling.png"
                alt="Use AI as a Creative or Expert Partner"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex items-start justify-between">
              <div>
                <h3 className="text-[16px] font-bold text-[#1f1f1f] mb-4 group-hover:text-[#0056D2]">
                  Use AI as a Creative or Expert Partner
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#187541] flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-[14px] text-[#1f1f1f]">
                    Completed on{" "}
                    <span className="font-bold">August 7, 2025</span>
                  </span>
                </div>

                <button className="flex items-center gap-2 text-[#636363] text-[14px] font-medium hover:text-[#0056D2] hover:underline">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="15" rx="2" />
                    <path d="M12 12h.01" />
                    <path d="M16 12h.01" />
                    <path d="M8 12h.01" />
                    <path d="M12 16h.01" />
                    <path d="M3 8h18" />
                  </svg>
                  View Certificate
                </button>
              </div>

              <button className="mt-auto px-8 py-[8px] bg-[#0056D2] text-white font-bold rounded-[4px] text-[14px] hover:bg-[#00419e] transition-colors shadow-sm">
                Review
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Help Button - Floating */}
      <button className="fixed bottom-6 right-6 w-[48px] h-[48px] bg-white border border-[#e1e1e1] rounded-full shadow-lg flex items-center justify-center text-[#0056D2] hover:bg-gray-50 transition-all z-50">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
    </div>
  );
};

export default MyLearning;

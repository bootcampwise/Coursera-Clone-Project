import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-[#e1e1e1] h-[64px] flex items-center sticky top-0 z-50 font-sans">
      <div className="w-full px-4 md:px-8 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="text-[#1f1f1f] hover:bg-gray-50 p-2 rounded-md transition-colors border-none bg-transparent cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="4" cy="4" r="2" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="4" r="2" />
              <circle cx="4" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="4" cy="20" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="20" cy="20" r="2" />
            </svg>
          </button>
          <Link to="/" className="shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#1a4f88] flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
          </Link>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-[620px] mx-10 hidden md:block">
          <div className="relative flex items-center h-[44px] bg-white border border-[#ccc] rounded-full px-1 hover:border-[#808080] focus-within:border-[#0056D2] transition-colors">
            <div
              className="ml-[2px] w-[36px] h-[36px] rounded-full flex items-center justify-center text-white font-bold text-[17px] shrink-0"
              style={{ backgroundColor: "#1a73e8" }}
            >
              C
            </div>
            <input
              type="text"
              placeholder="Search Coursera for Google Career Certificates - UX - Pro..."
              className="flex-1 px-4 bg-transparent border-none text-[14px] text-[#1f1f1f] focus:outline-none placeholder:text-[#5f6368]"
            />
            <button className="w-8 h-8 rounded-full bg-[#0056D2] flex items-center justify-center text-white shrink-0 hover:bg-[#003e9a] transition-colors border-none cursor-pointer">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 shrink-0 mr-2">
          {/* Globe Icon */}
          <button className="text-[#5f6368] hover:text-[#0056D2] transition-colors bg-transparent border-none cursor-pointer p-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>
          <button className="text-[#5f6368] hover:text-[#0056D2] transition-colors bg-transparent border-none cursor-pointer p-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#1a4f88] flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-sm cursor-pointer">
            Z
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;

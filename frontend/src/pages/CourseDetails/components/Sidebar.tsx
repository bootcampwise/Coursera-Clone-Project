import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="space-y-8 sticky top-[120px]">
      {/* Taught by */}
      <div className="bg-white rounded-[8px] border border-gray-100 p-6 shadow-sm">
        <h3 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4">
          Taught by
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="w-8"
            />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#1f1f1f]">
              Google Career Certificates
            </h4>
            <p className="text-[13px] text-gray-500">
              1.2M+ Learners • 150+ Courses
            </p>
          </div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">
          Google Career Certificates are part of Grow with Google, an initiative
          that draws on Google's 20-year history of building products,
          platforms, and services that help people and businesses grow.
        </p>
      </div>

      {/* Offered by */}
      <div className="bg-white rounded-[8px] border border-gray-100 p-6 shadow-sm">
        <h3 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4">
          Offered by
        </h3>
        <div className="flex items-center gap-4 mb-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
            className="h-6"
          />
        </div>
        <button className="text-[#0056D2] text-[13px] font-bold hover:underline">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

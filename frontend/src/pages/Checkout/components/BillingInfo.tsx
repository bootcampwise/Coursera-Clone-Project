import React from "react";

interface BillingInfoProps {
  name?: string;
}

const BillingInfo: React.FC<BillingInfoProps> = ({ name }) => {
  return (
    <div className="mb-8">
      <h2 className="text-[20px] leading-[28px] font-normal text-[#1f1f1f] mb-6">
        Billing information
      </h2>

      <div className="flex flex-col gap-6">
        {/* Name Field */}
        <div>
          <label className="block text-[12px] leading-[16px] font-bold text-[#1f1f1f] uppercase tracking-wider mb-2">
            NAME
          </label>
          <input
            type="text"
            defaultValue={name || ""}
            className="w-full h-[48px] px-4 border border-[#8c8c8c] rounded-[4px] text-[16px] text-[#1f1f1f] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
          />
        </div>

        {/* Country Field */}
        <div>
          <label className="block text-[12px] leading-[16px] font-bold text-[#1f1f1f] uppercase tracking-wider mb-2">
            COUNTRY
          </label>
          <div className="relative">
            <select className="w-full h-[48px] px-4 border border-[#8c8c8c] rounded-[4px] text-[16px] text-[#555] appearance-none focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white">
              <option>Select your country</option>
              <option>United States</option>
              <option>Pakistan</option>
              {/* Add more countries as needed */}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0056D2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;

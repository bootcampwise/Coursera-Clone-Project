import React from "react";
import Button from "../../../components/common/Button";

const PaymentMethods: React.FC = () => {
  return (
    <div>
      <h2 className="text-[20px] leading-[28px] font-normal text-[#1f1f1f] mb-6">
        Payment methods
      </h2>

      {/* Since the image shows only a checkbox and button for the free trial, 
          we assume the card input would appear or is pre-saved/simplified for this mock. 
          Actually, standard flow has card inputs here. 
          But I will follow the image which shows just the checkbox and button at the bottom.
          Wait, usually there's a card form. The image shows "Save this card...", implying card info is above or hidden.
          I will just implement what is visible in the provided image snippet accurately.
      */}

      <div className="mb-6 flex items-start gap-3">
        <div className="relative flex items-center h-5">
          <input
            id="save-card"
            type="checkbox"
            defaultChecked
            className="h-5 w-5 border-gray-300 rounded text-[#0056D2] focus:ring-[#0056D2] cursor-pointer"
          />
        </div>
        <label
          htmlFor="save-card"
          className="text-[14px] leading-[20px] text-[#1f1f1f]"
        >
          Save this card securely for future purposes.{" "}
          <a href="#" className="text-[#0056D2] hover:underline">
            Learn more.
          </a>
        </label>
      </div>

      <div className="flex items-center gap-8 mb-6">
        <Button className="bg-[#0056D2] text-white font-bold text-[16px] px-10 py-[14px] rounded-[4px] hover:bg-[#00419e] transition-colors min-w-[240px]">
          Start Free Trial
        </Button>
        <span className="text-[16px] text-[#1f1f1f] font-normal">
          You won't be charged today
        </span>
      </div>

      <div className="text-[12px] leading-[18px] text-[#373a3c]">
        I agree to the{" "}
        <a href="#" className="text-[#0056D2] hover:underline">
          Terms of Use
        </a>
        ,{" "}
        <a href="#" className="text-[#0056D2] hover:underline">
          Refund Policy
        </a>
        , and{" "}
        <a href="#" className="text-[#0056D2] hover:underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default PaymentMethods;

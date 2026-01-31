import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { enrollmentApi } from "../../../services/enrollmentApi";

interface PaymentMethodsProps {
  course: any;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ course }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnroll = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await enrollmentApi.enroll(course.id);
      navigate("/my-learning");
    } catch (err: any) {
      console.error("Enrollment failed:", err);
      setError(
        err.response?.data?.message || "Enrollment failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-[20px] leading-[28px] font-normal text-[#1f1f1f] mb-6">
        {course.price === 0 ? "Review Order" : "Payment methods"}
      </h2>

      {/* Since the image shows only a checkbox and button for the free trial, 
          we assume the card input would appear or is pre-saved/simplified for this mock. 
          Actually, standard flow has card inputs here. 
          But I will follow the image which shows just the checkbox and button at the bottom.
          Wait, usually there's a card form. The image shows "Save this card...", implying card info is above or hidden.
          I will just implement what is visible in the provided image snippet accurately.
      */}

      {course.price > 0 && (
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
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-[4px] text-[14px]">
          {error}
        </div>
      )}

      <div className="flex items-center gap-8 mb-6">
        <Button
          onClick={handleEnroll}
          disabled={isSubmitting}
          className="bg-[#0056D2] text-white font-bold text-[16px] px-10 py-[14px] rounded-[4px] hover:bg-[#00419e] transition-colors min-w-[240px] disabled:bg-gray-400"
        >
          {isSubmitting
            ? "Enrolling..."
            : course.price === 0
              ? "Enroll Now"
              : "Pay & Enroll"}
        </Button>
        <span className="text-[16px] text-[#1f1f1f] font-normal">
          {course.price === 0
            ? "Instant access granted"
            : "You won't be charged today (Simulated)"}
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

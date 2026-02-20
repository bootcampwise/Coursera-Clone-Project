import React, { useState } from "react";
import type { Course } from "../../types";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { enrollmentApi } from "../../services/enrollmentApi";

interface PaymentMethodsProps {
  course: Course;
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
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Enrollment failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-[20px] leading-[28px] font-normal text-gray-dark-3 mb-6">
        {course.price === 0 ? "Review Order" : "Payment methods"}
      </h2>

      {}

      {(course.price ?? 0) > 0 && (
        <div className="mb-6 flex items-start gap-3">
          <div className="relative flex items-center h-5">
            <input
              id="save-card"
              type="checkbox"
              defaultChecked
              className="h-5 w-5 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer"
            />
          </div>
          <label
            htmlFor="save-card"
            className="text-[14px] leading-[20px] text-gray-dark-3"
          >
            Save this card securely for future purposes.{" "}
            <a href="#" className="text-primary hover:underline">
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
          className="bg-primary text-white font-bold text-[16px] px-10 py-[14px] rounded-[4px] hover:bg-primary-hover transition-colors min-w-[240px] disabled:bg-gray-400"
        >
          {isSubmitting
            ? "Enrolling..."
            : course.price === 0
              ? "Enroll Now"
              : "Start free trial"}
        </Button>
        <span className="text-[16px] text-gray-dark-3 font-normal">
          {course.price === 0
            ? "Instant access granted"
            : "You won't be charged today (Simulated)"}
        </span>
      </div>

      <div className="text-[12px] leading-[18px] text-gray-medium-dark-2">
        I agree to the{" "}
        <a href="#" className="text-primary hover:underline">
          Terms of Use
        </a>
        ,{" "}
        <a href="#" className="text-primary hover:underline">
          Refund Policy
        </a>
        , and{" "}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default PaymentMethods;

import React from "react";

const OrderSummary: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Course Card */}
      <div className="border border-[#e7e7e7] rounded-[8px] p-6 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex gap-4 mb-4">
          <div className="w-[64px] h-[64px] shrink-0 border border-[#e7e7e7] p-1 rounded-[4px]">
            {/* Using a placeholder logo or existing mock if available, 
                 otherwise using a colored box or the logo from constants if generic */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#1f1f1f] mb-1">
              Microsoft UX Design Professional Certificate
            </h3>
            <p className="text-[14px] text-[#373a3c]">by Microsoft</p>
          </div>
        </div>
        <button className="text-[14px] text-[#0056D2] font-semibold hover:underline">
          Remove from cart
        </button>

        <hr className="my-6 border-[#e7e7e7]" />

        <div className="mb-6">
          <p className="text-[16px] text-[#1f1f1f] mb-4 font-normal">
            No commitment. Cancel anytime.
          </p>

          <div className="flex justify-between items-start mb-1">
            <span className="text-[14px] text-[#1f1f1f]">
              Monthly subscription
            </span>
            <span className="text-[14px] text-[#1f1f1f] font-semibold">
              <span className="text-[#B92B27]">7-Day</span> Free Trial
            </span>
          </div>
          <div className="text-right text-[12px] text-[#373a3c] mb-6">
            then $20 USD/mo
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-[16px] text-[#1f1f1f] font-semibold">
              Today's Total:
            </span>
            <span className="text-[16px] text-[#1f1f1f] font-semibold">
              $0 USD
            </span>
          </div>
        </div>

        <div className="bg-[#f5f5f5] p-3 rounded-[4px] text-[12px] leading-[18px] text-[#373a3c]">
          Your subscription begins today with a 7-day free trial. If you decide
          to stop during the trial period, visit My Purchases to cancel before
          November 19, 2025 and your card won't be charged. We can't issue
          refunds once your card is charged.
        </div>
      </div>

      {/* Testimonial / Trust Element (Optional as per image bottom right) */}
      <div className="border border-[#e7e7e7] rounded-[8px] p-6 bg-white flex items-center gap-4">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden shrink-0">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Learner"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[14px] leading-[20px] text-[#1f1f1f] italic mb-2">
            "Coursera helped me learn skills to develop my career and enrich my
            expertise."
          </p>
          <p className="text-[12px] font-semibold text-[#373a3c] text-right">
            — Elena M.
          </p>
        </div>
      </div>

      {/* Stats (Learners, Courses) */}
      <div className="flex items-center justify-around py-4 opacity-70 grayscale">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🌐</div>
          <div>
            <div className="text-[14px] font-bold text-[#0056D2]">
              140 Million+
            </div>
            <div className="text-[12px] text-[#373a3c]">Learners</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-2xl">📖</div>
          <div>
            <div className="text-[14px] font-bold text-[#1f1f1f]">10,000+</div>
            <div className="text-[12px] text-[#373a3c]">Courses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

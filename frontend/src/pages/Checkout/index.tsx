import React from "react";
import LoggedHeader from "../../components/layout/LoggedHeader";
import BillingInfo from "./components/BillingInfo";
import PaymentMethods from "./components/PaymentMethods";
import OrderSummary from "./components/OrderSummary";

const Checkout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LoggedHeader />

      <main className="container mx-auto px-4 md:px-8 py-8 max-w-[1200px]">
        {/* Page Title & Notification */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[32px] font-semibold text-[#1f1f1f] mb-2">
              Checkout
            </h1>
            <p className="text-[14px] text-[#373a3c]">
              All fields are required
            </p>
          </div>

          <div className="hidden md:block bg-[#D1F2EB] text-[#005342] px-4 py-2 rounded-full text-[14px] font-semibold">
            23,860 already enrolled!
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Billing & Payment */}
          <div className="lg:col-span-7">
            <BillingInfo />
            <div className="my-8 border-t border-[#e7e7e7]"></div>
            <PaymentMethods />
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>

        {/* Footer Copyright (Simple) */}
        <div className="mt-20 border-t border-[#e7e7e7] pt-8 flex justify-between items-center text-[12px] text-[#373a3c]">
          <div className="font-bold text-[18px] text-[#e0e0e0]">coursera</div>
          <div className="flex gap-4">
            <span>© 2025 Coursera Inc. All rights reserved.</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

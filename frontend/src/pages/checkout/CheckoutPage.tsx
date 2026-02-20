import React from "react";
import LoggedHeader from "../../components/layout/LoggedHeader";
import BillingInfo from "../../components/checkout/BillingInfo";
import PaymentMethods from "../../components/checkout/PaymentMethods";
import OrderSummary from "../../components/checkout/OrderSummary";
import { useCheckout } from "./useCheckout";

const Checkout: React.FC = () => {
  const { course, isLoading, studentName } = useCheckout();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="text-xl">Course not found.</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white font-sans">
      <LoggedHeader />

      <main className="container mx-auto px-4 md:px-8 py-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {}
          <div className="lg:col-span-7">
            {}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-[32px] font-semibold text-gray-dark-3 mb-2">
                  Checkout
                </h1>
                <p className="text-[14px] text-gray-medium-dark-2">
                  All fields are required
                </p>
              </div>

              <div className="hidden md:block bg-success-super-light-2 text-success-very-dark px-4 py-2 rounded-full text-[14px] font-semibold">
                23,860 already enrolled!
              </div>
            </div>
            <BillingInfo name={studentName} />
            <PaymentMethods course={course} />
          </div>

          {}
          <div className="lg:col-span-5">
            <OrderSummary course={course} />
          </div>
        </div>

        {}
        <div className="mt-4  pt-8 flex justify-between items-center text-[12px] text-gray-medium-dark-2">
          <div className="font-normal text-[18px] text-gray-medium-light">
            coursera
          </div>
          <div className="flex gap-2">
            <span className="text-gray-darkest">© 2025 Coursera Inc.</span>
            <span className="text-gray-darkest-alt">All rights reserved.</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

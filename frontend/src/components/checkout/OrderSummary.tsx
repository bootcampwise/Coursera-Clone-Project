import { IMAGES } from "../../constants/images";
import type { Course } from "../../types";

interface OrderSummaryProps {
  course: Course;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ course }) => {
  return (
    <div className="flex flex-col gap-6">
      {}
      <div className="border border-gray-light-2-alt rounded-[8px] p-6 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex gap-4 mb-4">
          <div className="w-[64px] h-[64px] shrink-0 border border-gray-light-2-alt p-1 rounded-[4px] flex items-center justify-center">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-blue-50 flex items-center justify-center text-primary font-bold">
                {course.title.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-[16px] leading-[22px] font-semibold text-gray-dark-3 mb-1">
              {course.title}
            </h3>
            <p className="text-[14px] text-gray-medium-dark-2">
              by {course.instructor?.name}
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-light-2-alt" />

        <div className="mb-6">
          <p className="text-[16px] text-gray-dark-3 mb-4 font-normal">
            No commitment. Cancel anytime.
          </p>

          <div className="flex justify-between items-start mb-1">
            <span className="text-[14px] text-gray-dark-3">
              {course.price === 0 ? "Course access" : "One-time enrollment"}
            </span>
            <span className="text-[14px] text-gray-dark-3 font-semibold">
              {course.price === 0 ? "Free" : `$${course.price} USD`}
            </span>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-[16px] text-gray-dark-3 font-semibold">
              Today's Total:
            </span>
            <span className="text-[20px] text-gray-dark-3 font-bold">
              ${course.price} USD
            </span>
          </div>
        </div>

        <hr className="my-6 border-gray-light-2-alt" />

        {course.price === 0 && (
          <div className="bg-success-super-light-2 p-3 rounded-[4px] text-[12px] leading-[18px] text-success-very-dark">
            You're enrolling in a free course. No payment information is
            required to start learning.
          </div>
        )}

        <div className="mt-4 text-[12px] leading-[18px] text-text-gray">
          Your subscription begins today with a 7-day free trial. If you decide
          to stop during the trial period, visit My Purchases to cancel before
          November 19, 2025 and your card won't be charged. We can't issue
          refunds once your card is charged.
        </div>
      </div>

      {}
      <div className="border border-gray-light-2-alt rounded-[8px] bg-white flex items-stretch gap-4 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="w-[140px] h-[120px] shrink-0">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Learner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <p className="text-[14px] leading-[20px] text-gray-dark-3 mb-2">
            Coursera helped me learn skills to develop my career and enrich my
            expertise.
          </p>
          <div className="flex items-center justify-end gap-2">
            <span className="h-px w-6 bg-gray-dark-3/40"></span>
            <span className="text-[12px] font-semibold text-gray-medium-dark-2">
              Elena M.
            </span>
          </div>
        </div>
      </div>

      {}
      <div className="flex items-center justify-center gap-6 py-4 opacity-70 grayscale">
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.UI.LEARNERS_ICON}
            alt=""
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="text-[14px] font-bold text-primary">
              140 Million+
            </div>
            <div className="text-[12px] text-gray-medium-dark-2">Learners</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.UI.BOOK_ICON_STATIC}
            alt=""
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="text-[14px] font-bold text-gray-dark-3">10,000+</div>
            <div className="text-[12px] text-gray-medium-dark-2">Courses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;





















































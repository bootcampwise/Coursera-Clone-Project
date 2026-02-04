import { IMAGES } from "../../../constants/images";

interface OrderSummaryProps {
  course: any;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ course }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Course Card */}
      <div className="border border-[#e7e7e7] rounded-[8px] p-6 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex gap-4 mb-4">
          <div className="w-[64px] h-[64px] shrink-0 border border-[#e7e7e7] p-1 rounded-[4px] flex items-center justify-center">
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
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#1f1f1f] mb-1">
              {course.title}
            </h3>
            <p className="text-[14px] text-[#373a3c]">
              by {course.instructor?.name}
            </p>
          </div>
        </div>

        <hr className="my-6 border-[#e7e7e7]" />

        <div className="mb-6">
          <p className="text-[16px] text-[#1f1f1f] mb-4 font-normal">
            No commitment. Cancel anytime.
          </p>

          <div className="flex justify-between items-start mb-1">
            <span className="text-[14px] text-[#1f1f1f]">
              {course.price === 0 ? "Course access" : "One-time enrollment"}
            </span>
            <span className="text-[14px] text-[#1f1f1f] font-semibold">
              {course.price === 0 ? "Free" : `$${course.price} USD`}
            </span>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-[16px] text-[#1f1f1f] font-semibold">
              Today's Total:
            </span>
            <span className="text-[20px] text-[#1f1f1f] font-bold">
              ${course.price} USD
            </span>
          </div>
        </div>

        <hr className="my-6 border-[#e7e7e7]" />

        {course.price === 0 && (
          <div className="bg-[#D1F2EB] p-3 rounded-[4px] text-[12px] leading-[18px] text-[#005342]">
            You're enrolling in a free course. No payment information is
            required to start learning.
          </div>
        )}

        <div className="mt-4 text-[12px] leading-[18px] text-[#5f6368]">
          Your subscription begins today with a 7-day free trial. If you decide
          to stop during the trial period, visit My Purchases to cancel before
          November 19, 2025 and your card won't be charged. We can't issue
          refunds once your card is charged.
        </div>
      </div>

      {/* Testimonial / Trust Element (Optional as per image bottom right) */}
      <div className="border border-[#e7e7e7] rounded-[8px] bg-white flex items-stretch gap-4 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="w-[140px] h-[120px] shrink-0">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Learner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <p className="text-[14px] leading-[20px] text-[#1f1f1f] mb-2">
            Coursera helped me learn skills to develop my career and enrich my
            expertise.
          </p>
          <div className="flex items-center justify-end gap-2">
            <span className="h-px w-6 bg-[#1f1f1f]/40"></span>
            <span className="text-[12px] font-semibold text-[#373a3c]">
              Elena M.
            </span>
          </div>
        </div>
      </div>

      {/* Stats (Learners, Courses) */}
      <div className="flex items-center justify-center gap-6 py-4 opacity-70 grayscale">
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.UI.LEARNERS_ICON}
            alt=""
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="text-[14px] font-bold text-[#0056D2]">
              140 Million+
            </div>
            <div className="text-[12px] text-[#373a3c]">Learners</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.UI.BOOK_ICON_STATIC}
            alt=""
            className="w-10 h-10 object-contain"
          />
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




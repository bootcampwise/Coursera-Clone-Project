import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { courseApi } from "../../../services/courseApi";

interface CourseHeroProps {
  course: any;
}

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !course.id) return;
      setIsCheckingEnrollment(true);
      try {
        const status = await courseApi.getEnrollmentStatus(course.id);
        setIsEnrolled(status.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      } finally {
        setIsCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [user, course.id]);

  const handleEnrollClick = () => {
    if (!user) {
      navigate("/login", { state: { from: `/course/${course.id}` } });
      return;
    }

    if (isEnrolled) {
      navigate("/my-learning");
      return;
    }

    navigate(`/checkout/${course.id}`);
  };

  const getButtonText = () => {
    if (isCheckingEnrollment) return "Checking...";
    if (isEnrolled) return "Go to Course";
    return course.price === 0
      ? "Enroll for Free"
      : `Enroll for $${course.price}`;
  };

  return (
    <section className="bg-gradient-to-r from-white via-white to-blue-50 relative overflow-hidden pt-12 pb-20 border-b border-gray-100 px-4 md:px-0">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-4 md:px-8">
        <div className="z-10">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            {course.instructor?.avatarUrl && (
              <img
                src={course.instructor.avatarUrl}
                alt={course.instructor.name}
                className="h-[32px] w-auto rounded-full"
              />
            )}
            <span className="font-bold text-gray-700">
              {course.instructor?.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[40px] md:text-[56px] font-bold text-[#1f1f1f] leading-[1.1] mb-6 tracking-tight">
            {course.title}
          </h1>

          <p className="text-[16px] text-gray-700 leading-relaxed mb-8 max-w-[600px]">
            {course.subtitle || course.description?.substring(0, 150) + "..."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={handleEnrollClick}
              disabled={isCheckingEnrollment}
              className="px-8 py-3 bg-[#0056D2] text-white rounded-[4px] font-bold text-[16px] hover:bg-[#00419e] transition-colors shadow-md disabled:bg-gray-400"
            >
              {getButtonText()}
            </button>
            <div className="text-[14px]">
              <span className="text-gray-600">Starts Oct 24</span>
              <br />
              <button className="text-[#0056D2] font-bold hover:underline">
                Financial aid available
              </button>
            </div>
          </div>

          <p className="mt-4 text-[14px] text-gray-500">
            <span className="font-bold text-[#1f1f1f]">208,460</span> already
            enrolled
          </p>
        </div>

        {/* Hero Image / Illustration Placeholder */}
        <div className="hidden lg:flex justify-end pr-8">
          <div className="relative w-[450px] h-[350px]">
            {/* Abstract shapes from design */}
            <div className="absolute top-0 right-0 w-full h-full bg-[#f2f4f6] rounded-[24px] rotate-3 opacity-40"></div>
            <div className="absolute top-0 right-0 w-full h-full border border-blue-100 rounded-[24px] -rotate-2"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="w-full h-full bg-white/60 backdrop-blur-sm rounded-[16px] shadow-sm flex items-center justify-center overflow-hidden border border-gray-100">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="0.5"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dots/shapes */}
      <div className="absolute bottom-0 right-0 p-8 opacity-20 hidden lg:block">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-blue-400 rounded-full"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseHero;

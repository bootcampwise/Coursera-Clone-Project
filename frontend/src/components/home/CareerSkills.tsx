import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { courseApi } from "../../services/courseApi";
import { useNavigate } from "react-router-dom";

const CareerSkills: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.getCourses({ limit: 6 });
        // Map backend data to UI format
        const mappedCourses = response.courses.map((c: any) => ({
          id: c.id,
          university: c.instructor?.name || "Instructor",
          logo:
            c.instructor?.avatarUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          title: c.title,
          type: `${c.difficulty || "Beginner"} · Course`,
          image:
            c.thumbnail ||
            "https://images.unsplash.com/photo-1591453089816-0fbb971ca25c?w=800&auto=format&fit=crop&q=60",
        }));
        setCourses(mappedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-[#F5F7F8] py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          Loading amazing courses...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5F7F8] py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Left Header Area */}
          <div className="md:w-1/4 flex flex-col items-start gap-6">
            <h2 className="text-[24px] md:text-[32px] font-semibold text-text-primary leading-tight font-sans">
              Career skills that work
            </h2>
            <Button
              variant="outline"
              className="!text-primary !border-primary !font-bold !border !py-2 md:!py-3 !px-4 md:!px-6 hover:!bg-blue-50 !rounded-[5px] text-[14px] md:text-[16px] whitespace-nowrap hidden md:block"
            >
              Start 7-day Free Trial
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-white rounded-lg shadow-sm border border-border-muted overflow-hidden flex flex-col hover:shadow-card transition-shadow cursor-pointer h-full"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {index === 2 && (
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold border border-gray-200 shadow-sm flex items-center gap-1">
                      <span>✨</span> AI skills
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={course.logo}
                      alt={course.university}
                      className="w-6 h-6 object-contain rounded-sm"
                    />
                    <span className="text-xs text-text-secondary truncate">
                      {course.university}
                    </span>
                  </div>
                  <h3 className="font-bold text-text-primary text-[16px] mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-auto">
                    {course.type}
                  </p>
                </div>
              </div>
            ))}

            {/* Mobile-only CTA */}
            <div className="w-full flex justify-center md:hidden mt-4">
              <Button
                variant="outline"
                className="!text-primary !border-primary !font-bold !border !py-3 !px-8 hover:!bg-blue-50 !rounded-[5px] text-[16px] w-full"
              >
                Start 7-day Free Trial
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-start md:ml-[25%] mt-8">
          <Button
            variant="outline"
            className="!text-primary !border-primary !font-bold !border !py-3 !px-8 hover:!bg-blue-50 !rounded-[5px] text-[16px] hidden md:inline-flex"
          >
            Show 8 more
          </Button>
          <Button
            variant="outline"
            className="!text-primary !border-primary !font-bold !border !py-3 !px-8 hover:!bg-blue-50 !rounded-[5px] text-[16px] inline-flex md:hidden w-full justify-center"
          >
            Show more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerSkills;

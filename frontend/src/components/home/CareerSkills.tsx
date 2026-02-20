import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { courseApi } from "../../services/courseApi";
import { useNavigate } from "react-router-dom";
import type { Course } from "../../types";

const CareerSkills: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.getCourses({ limit: 6 });

        const mappedCourses = response.courses.map((c: Course) => ({
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-surface py-1">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-blue-light-7 rounded-[16px] p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/4 flex flex-col items-start gap-6">
                <div className="h-7 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-44 bg-gray-200 rounded animate-pulse hidden md:block"></div>
              </div>
              <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-light-2-alt overflow-hidden"
                  >
                    <div className="aspect-[16/9] m-2 rounded-[12px] bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center md:justify-start md:ml-[27%] mt-1">
              <div className="h-10 w-36 bg-gray-200 rounded animate-pulse hidden md:block"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse md:hidden"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const visibleCourses = showAll ? courses : courses.slice(0, 3);
  const remainingCount = Math.max(courses.length - 3, 0);

  return (
    <section className="bg-surface py-1 container mx-auto rounded-2xl">
      <div className=" px-1">
        <div className="bg-blue-light-7 rounded-[16px] p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {}
            <div className="md:w-1/4 flex flex-col items-start gap-1 mt-20">
              <h2 className="text-[24px] md:text-[26px] font-normal text-purple-dark-text leading-tight font-sans">
                Career skills that work
              </h2>
              <Button
                variant="outline"
                className="!bg-white !text-primary !border-primary !font-bold !border !py-2 md:!py-3 !px-4 md:!px-6 hover:!bg-blue-50 !rounded-[5px] text-[14px] md:text-[16px] whitespace-nowrap hidden md:block"
              >
                Start 7-day Free Trial
              </Button>
            </div>

            {}
            <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleCourses.map((course, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="bg-white rounded-lg shadow-sm border border-gray-light-2-alt overflow-hidden flex flex-col hover:shadow-card transition-shadow cursor-pointer h-full"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] m-2">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-[10px]"
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

              {}
              <div className="w-full flex justify-center md:hidden mt-4">
                <Button
                  variant="outline"
                  className="!bg-white !text-primary !border-primary !font-bold !border !py-3 !px-8 hover:!bg-blue-50 !rounded-[5px] text-[16px] w-full"
                >
                  Start 7-day Free Trial
                </Button>
              </div>
            </div>
          </div>

          {!showAll && remainingCount > 0 && (
            <div className="flex justify-center md:justify-start md:ml-[27%] mt-1">
              <Button
                variant="outline"
                onClick={() => setShowAll(true)}
                className="!bg-white !text-primary !border-primary !font-bold !border !py-3 !px-8 hover:!bg-blue-50 !rounded-[5px] text-[16px] hidden md:inline-flex"
              >
                Show {remainingCount} more
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAll(true)}
                className="!bg-white !text-primary !border-primary !font-bold !border !py-3 !px-8 hover:!bg-blue-50 !rounded-[5px] text-[16px] inline-flex md:hidden w-full justify-center"
              >
                Show more
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerSkills;

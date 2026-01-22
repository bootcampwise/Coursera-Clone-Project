import React from "react";
import Button from "../common/Button";

const CareerSkills: React.FC = () => {
  const courses = [
    {
      university: "University of Michigan",

      title: "Python for Everybody",
      type: "Beginner · Specialization",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/5c/21/f46046e711e5a32ecf01833c8464/pythonlearn_thumbnail_1x1.png?auto=format%2Ccompress&dpr=1",
    },
    {
      university: "Vanderbilt University",
      logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/2a/822a933c066a50b3c5132af8b2f8af/vanderbilt_squared_logo.png?auto=format%2Ccompress&dpr=1",
      title: "Prompt Engineering",
      type: "Beginner Specialization",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/db/57/465030234125b04535352c80c0e5/Prompt-Engineering-for-ChatGPT_Square.png?auto=format%2Ccompress&dpr=1",
    },
    {
      university: "IBM",
      logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/bb/f5/8c92a54b455c91b58d3c52402170/ibm-logo.png?auto=format%2Ccompress&dpr=1",
      title: "IBM Data Science",
      type: "Beginner · Professional Certificate",
      image:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/08/33/f788647611e8a2c7cd16e792e3a1/Data-Science_Square.png?auto=format%2Ccompress&dpr=1",
    },
  ];

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

import React from "react";
import CourseCard from "./CourseCard";

interface SectionProps {
  title: string;
  showMoreLabel?: string;
  courses: Array<{
    title: string;
    provider: string;
    image: string;
    logo: string;
    badge?: string;
    type?: string;
  }>;
}

const CourseSection: React.FC<SectionProps> = ({
  title,
  courses,
  showMoreLabel = "Show 4 more",
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-[20px] font-bold text-[#1f1f1f] mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
      <button className="mt-8 px-6 py-[7px] border border-[#0056D2] text-[#0056D2] font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors">
        {showMoreLabel}
      </button>
    </div>
  );
};

export default CourseSection;

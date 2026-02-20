import React from "react";
import CourseCard from "./CourseCard";

interface SectionProps {
  title: string;
  showMoreLabel?: string;
  courses: Array<{
    id: string;
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
    <div className="mb-14">
      <h2 className="text-[22px] font-bold text-gray-dark-3 mb-6 tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
      <button className="mt-10 px-6 py-[10px] border border-primary text-primary font-bold rounded-[4px] text-[15px] hover:bg-surface transition-colors shadow-sm">
        {showMoreLabel}
      </button>
    </div>
  );
};

export default CourseSection;

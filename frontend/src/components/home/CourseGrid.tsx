import React from "react";
import CourseCard from "./CourseCard";
import { MOCK_COURSES } from "../../mocks/home";

const CourseGrid: React.FC = () => {
  const items = MOCK_COURSES;
  return (
    <section className="py-16 border-t border-border-muted">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
        <h2 className="text-[24px] md:text-[28px] font-semibold text-text-primary">
          Launch your new career with a Professional Certificate
        </h2>
        <button className="text-primary font-bold hover:underline self-start md:self-auto">
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((c) => (
          <CourseCard key={c.id} title={c.title} instructor={c.instructor} />
        ))}
      </div>
    </section>
  );
};

export default CourseGrid;


















































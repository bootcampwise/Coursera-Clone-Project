import React from "react";

const CourseCard: React.FC<{ title: string; instructor?: string }> = ({
  title,
  instructor = "Instructor",
}) => {
  return (
    <article className="bg-background rounded-lg shadow-card overflow-hidden">
      <div className="h-40 bg-surface flex items-center justify-center text-text-secondary">
        Course image
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <div className="text-sm text-text-secondary">{instructor}</div>
      </div>
    </article>
  );
};

export default CourseCard;


















































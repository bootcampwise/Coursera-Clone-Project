import React from "react";
import type { Course } from "../../types";

interface SidebarProps {
  course: Course;
}

const Sidebar: React.FC<SidebarProps> = ({ course }) => {
  return (
    <div className="space-y-8 sticky top-[120px]">
      {}
      <div className="bg-white rounded-[8px] border border-gray-100 p-6 shadow-sm">
        <h3 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4">
          Taught by
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden">
            {course.instructor?.avatarUrl ? (
              <img
                src={course.instructor.avatarUrl}
                alt={course.instructor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-primary">
                {course.instructor?.name?.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-gray-dark-3">
              {course.instructor?.name}
            </h4>
            <p className="text-[13px] text-gray-500">Instructor</p>
          </div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">
          Google Career Certificates are part of Grow with Google, an initiative
          that draws on Google's 20-year history of building products,
          platforms, and services that help people and businesses grow.
        </p>
      </div>

      {/* Offered by */}
      <div className="bg-white rounded-[8px] border border-gray-100 p-6 shadow-sm">
        <h3 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4">
          Offered by
        </h3>
        <div className="flex items-center gap-4 mb-2">
          {course.instructor?.avatarUrl && (
            <img
              src={course.instructor.avatarUrl}
              alt={course.instructor.name}
              className="h-6"
            />
          )}
          <span className="text-sm font-medium">{course.instructor?.name}</span>
        </div>
        <button className="text-primary text-[13px] font-bold hover:underline">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Sidebar;



















































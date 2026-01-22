import React from "react";

const CourseSeries: React.FC = () => {
  const courses = [
    {
      title: "Start Effective Prompting Essentials",
      type: "Course • 1 of 4",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300",
    },
    {
      title: "Design Prompts for Everyday Tasks",
      type: "Course • 2 of 4",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=300",
    },
    {
      title: "Speed Up Data Analysis and Presentation",
      type: "Course • 3 of 4",
      image:
        "https://images.unsplash.com/photo-1551288049-bbda48658a7e?auto=format&fit=crop&q=80&w=300",
    },
    {
      title: "Use Generative AI as an Expert Partner",
      type: "Course • 4 of 4",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=300",
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[28px] font-bold text-[#1f1f1f]">
          Specialization - 4 course series
        </h2>
      </div>

      <p className="text-[15px] text-gray-700 max-w-[800px] mb-8 leading-relaxed">
        Around the world, people are transforming their lives through Google
        Workspace. This specialization provides you with the skills to
        effectively use the most popular Google Workspace tools.
      </p>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex items-center gap-6 p-4 rounded-[8px] border border-gray-100 bg-white hover:bg-gray-50 transition-all cursor-pointer group shadow-sm"
          >
            <div className="w-[120px] h-[80px] shrink-0 rounded-[4px] overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1">
              <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                {course.type}
              </span>
              <h3 className="text-[18px] font-bold text-[#1f1f1f] group-hover:text-[#0056D2] transition-colors line-clamp-1">
                {course.title}
              </h3>
            </div>
            <div className="text-gray-400 group-hover:text-[#0056D2] transition-colors pr-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50/50 rounded-[8px] flex items-center gap-6 border border-blue-100">
        <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-sm">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0056D2"
            strokeWidth="2"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
        <div>
          <p className="text-[14px] text-gray-800">
            <span className="font-bold">Earn a career certificate</span>
            <br />
            Upon completion, you will receive a digital certificate that you can
            share on your professional network.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CourseSeries;

import React from "react";

interface Stat {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}

const Overview: React.FC = () => {
  const stats: Stat[] = [
    {
      label: "Published Courses",
      value: "6",
      helper: "2 drafts in progress",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      label: "Total Students",
      value: "18,420",
      helper: "+420 this month",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      label: "Avg Rating",
      value: "4.8",
      helper: "Across all courses",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.12 6.532a1 1 0 00.95.69h6.862c.969 0 1.371 1.24.588 1.81l-5.55 4.034a1 1 0 00-.364 1.118l2.12 6.532c.3.921-.755 1.688-1.54 1.118l-5.55-4.034a1 1 0 00-1.175 0l-5.55 4.034c-.784.57-1.838-.197-1.539-1.118l2.12-6.532a1 1 0 00-.364-1.118L.529 11.959c-.783-.57-.38-1.81.588-1.81h6.862a1 1 0 00.95-.69l2.12-6.532z"
          />
        </svg>
      ),
    },
    {
      label: "Monthly Revenue",
      value: "$2,940",
      helper: "+12% vs last month",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Instructor Overview
        </h1>
        <p className="text-sm text-gray-500">
          Quick snapshot of course performance and learner engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                {s.icon}
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {s.value}
            </div>
            <div className="text-sm font-medium text-gray-700">{s.label}</div>
            <div className="text-xs text-gray-500 mt-1">{s.helper}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Publishing Checklist
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Keep your course launches clean and consistent.
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
              Create Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Course Metadata",
                desc: "Title, description, outcomes, category.",
              },
              {
                title: "Curriculum Builder",
                desc: "Design modules and lessons structure.",
              },
              {
                title: "Video Content",
                desc: "Attach videos to lessons from Videos tab.",
              },
              {
                title: "Pricing & Publish",
                desc: "Set price, preview, publish.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-200 transition-colors cursor-default"
              >
                <div className="text-sm font-semibold text-gray-900">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-500">
              Latest course events and updates.
            </p>
          </div>
          <div className="space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
            {[
              {
                label: "New enrollment",
                detail: "React Fundamentals",
                time: "3m ago",
              },
              {
                label: "Video uploaded",
                detail: "Lesson 2 • Routing",
                time: "1h ago",
              },
              {
                label: "Review received",
                detail: "Course rating 5.0",
                time: "5h ago",
              },
              {
                label: "Draft updated",
                detail: "AI for Beginners",
                time: "1d ago",
              },
            ].map((a, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center text-xs font-semibold">
                  IN
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 font-medium">
                    {a.label}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">{a.detail}</div>
                  <div className="text-xs text-gray-400 mt-1">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
















































import React from "react";
import { useInstructorOverview } from "./useInstructorOverview";

const Overview: React.FC = () => {
  const { loading, error, stats, activities } = useInstructorOverview();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}
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
            {activities.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-10">
                No recent activity.
              </p>
            ) : (
              activities.map((a, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center text-xs font-semibold">
                    IN
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 font-medium">
                      {a.label}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      {a.detail}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{a.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

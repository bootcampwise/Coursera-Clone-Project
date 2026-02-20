import React from "react";
import { useInstructorAnalytics } from "./useInstructorAnalytics";

const Analytics: React.FC = () => {
  const { data, loading, error } = useInstructorAnalytics();

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
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Analytics</h1>
        <p className="text-sm text-gray-500">
          Track enrollments, watch-time, and performance across courses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Performance
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Connect analytics API to render charts.
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
              Export
            </button>
          </div>
          <div className="h-[320px] bg-linear-to-br from-blue-50 to-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600">
                Analytics charts
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Enrollments, watch-time, retention
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Quick Insights
          </h2>
          <p className="text-sm text-gray-500">
            High-signal KPIs for creators.
          </p>

          <div className="mt-5 space-y-3">
            {data?.insights.map((k) => (
              <div
                key={k.label}
                className="p-4 rounded-lg bg-gray-50 border border-gray-200"
              >
                <div className="text-xs text-gray-500">{k.label}</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  {k.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

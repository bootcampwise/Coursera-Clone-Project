import React from "react";
import {
  useAdminOverview,
  type StatCard,
  type Activity,
} from "./useAdminOverview.tsx";

const Overview: React.FC = () => {
  const { loading, error, stats, activities } = useAdminOverview();

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
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500">
          Monitor platform performance and user activity in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: StatCard) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-2.5 rounded-lg ${
                  stat.isPositive
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  stat.isPositive
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Growth Analytics
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Platform metric analysis
              </p>
            </div>
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600">
                Metric Visualization
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Historical data tracking is being initialized
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Recent Signups
            </h2>
            <p className="text-sm text-gray-500">Latest platform members</p>
          </div>
          <div className="space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
            {activities.length > 0 ? (
              activities.map((activity: Activity, index: number) => (
                <div key={index} className="flex gap-3 items-start group">
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white font-semibold text-xs shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {activity.user
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">
                        {activity.user}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-gray-900">
                        {activity.target}
                      </span>
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Joined on {activity.time}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-center py-12 text-gray-400">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

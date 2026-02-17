import React, { useState, useEffect } from "react";
import adminApi from "../../services/adminApiClient";
import { ENDPOINTS } from "../../services/endpoints";

interface StatCard {
  name: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface Activity {
  user: string;
  action: string;
  target: string;
  time: string;
}

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalReviews: number;
    totalCertificates?: number;
    totalRevenue: number;
  };
  recentSignups: Array<{ name: string; role: string; createdAt: string }>;
}

const Overview: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await adminApi.get(ENDPOINTS.ANALYTICS_ADMIN);
        setData(response.data);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(
          error.response?.data?.message || "Failed to load dashboard metrics",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const stats: StatCard[] = [
    {
      name: "Total Users",
      value: data?.overview.totalUsers || 0,
      change: "+2.5%", 
      isPositive: true,
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
      name: "Active Courses",
      value: data?.overview.totalCourses || 0,
      change: "+4.2%",
      isPositive: true,
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
      name: "Total Revenue",
      value: `$${(data?.overview.totalRevenue || 0).toLocaleString()}`,
      change: "+18.3%",
      isPositive: true,
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
    {
      name: "Enrollments",
      value: data?.overview.totalEnrollments || 0,
      change: "+5.1%",
      isPositive: true,
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
  ];

  const activities: Activity[] =
    data?.recentSignups.map((user) => ({
      user: user.name,
      action: "joined as",
      target:
        user.role === "student"
          ? "Learner"
          : user.role === "instructor"
            ? "Instructor"
            : "Admin",
      time: new Date(user.createdAt).toLocaleDateString(),
    })) || [];

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
        {stats.map((stat) => (
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
          <div className="h-[320px] bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
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
              activities.map((activity, index) => (
                <div key={index} className="flex gap-3 items-start group">
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white font-semibold text-xs shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
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


















































import { useState, useEffect, type ReactNode } from "react";
import instructorApi from "../../../services/instructorApiClient";
import { ENDPOINTS } from "../../../services/endpoints";

export interface Stat {
  label: string;
  value: string | number;
  helper: string;
  icon: ReactNode;
}

export interface Activity {
  label: string;
  detail: string;
  time: string;
}

export interface InstructorAnalyticsData {
  overview: {
    publishedCourses: number;
    draftCourses: number;
    totalStudents: number;
    avgRating: number;
    monthlyRevenue: number;
    studentsGrowth: number;
    revenueGrowth: number;
  };
  recentActivity: Array<{
    label: string;
    detail: string;
    time: string;
  }>;
}

export const useInstructorOverview = () => {
  const [data, setData] = useState<InstructorAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await instructorApi.get(
          ENDPOINTS.ANALYTICS_INSTRUCTOR
        );
        setData(response.data);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(
          error.response?.data?.message || "Failed to load instructor metrics"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const stats: Stat[] = [
    {
      label: "Published Courses",
      value: data?.overview.publishedCourses || "0",
      helper: `${data?.overview.draftCourses || 0} drafts in progress`,
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
      value: (data?.overview.totalStudents || 0).toLocaleString(),
      helper: `+${data?.overview.studentsGrowth || 0} this month`,
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
      value: data?.overview.avgRating?.toFixed(1) || "0.0",
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
      value: `$${(data?.overview.monthlyRevenue || 0).toLocaleString()}`,
      helper: `+${data?.overview.revenueGrowth || 0}% vs last month`,
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

  const activities: Activity[] = data?.recentActivity || [];

  return {
    loading,
    error,
    stats,
    activities,
  };
};

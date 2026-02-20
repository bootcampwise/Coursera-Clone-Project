import { useState, useEffect } from "react";
import instructorApi from "../../../services/instructorApiClient";
import { ENDPOINTS } from "../../../services/endpoints";

export interface Insight {
  label: string;
  value: string | number;
}

export interface PerformanceData {
  // Define structure for charts later if needed
  placeholder: boolean;
}

export interface InstructorAnalytics {
  insights: Insight[];
  performance: PerformanceData;
}

export const useInstructorAnalytics = () => {
  const [data, setData] = useState<InstructorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // We can use the same instructor analytics endpoint if it contains detailed data,
      // or a more specific one if available. For now, we'll structure it for the UI.
      const response = await instructorApi.get(ENDPOINTS.ANALYTICS_INSTRUCTOR);

      // Transform response data to match Analytics UI structure
      // This is a placeholder transformation until the backend is fully integrated
      const insights = [
        {
          label: "Top course",
          value: response.data.overview?.topCourse || "N/A",
        },
        {
          label: "Completion rate",
          value: `${response.data.overview?.completionRate || 0}%`,
        },
        {
          label: "Avg watch-time",
          value: `${response.data.overview?.avgWatchTime || 0}m`,
        },
        {
          label: "Refund rate",
          value: `${response.data.overview?.refundRate || 0}%`,
        },
      ];

      setData({
        insights,
        performance: { placeholder: true },
      });
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Failed to load detailed analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    data,
    loading,
    error,
    fetchAnalytics,
  };
};

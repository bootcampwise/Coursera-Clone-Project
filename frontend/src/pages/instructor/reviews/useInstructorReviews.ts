import { useState, useEffect } from "react";
import { reviewDashboardApi } from "../../../services/reviewDashboardApi";
import type { Review } from "../../../types";

export const useInstructorReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewDashboardApi.getInstructorReviews();
      setReviews(data || []);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Failed to load course reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return { reviews, loading, error, fetchReviews };
};

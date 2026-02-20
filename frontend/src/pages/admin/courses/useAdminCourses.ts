import { useState, useEffect } from "react";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import { toast } from "react-hot-toast";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  status: string;
  instructor: {
    name: string;
  };
  _count: {
    enrollments: number;
    reviews: number;
  };
}

export const useAdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await adminApi.get(ENDPOINTS.COURSES_ADMIN_CATALOG);
      setCourses(response.data);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Failed to load course catalog"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await adminApi.delete(ENDPOINTS.COURSES_BY_ID(id));
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    handleDeleteCourse,
  };
};

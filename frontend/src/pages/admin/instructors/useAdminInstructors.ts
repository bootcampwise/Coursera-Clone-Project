import { useState, useEffect } from "react";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import { toast } from "react-hot-toast";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  expertise?: string;
  _count: {
    courses: number;
    enrollments: number;
  };
}

export const useAdminInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const response = await adminApi.get(ENDPOINTS.USERS_LIST, {
        params: { role: "instructor", limit: 50 },
      });
      setInstructors(response.data.users);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Failed to load instructor network"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleRemoveInstructor = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this instructor?"))
      return;
    try {
      await adminApi.delete(ENDPOINTS.USERS_BY_ID(id));
      toast.success("Instructor removed successfully");
      fetchInstructors();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(
        error.response?.data?.message || "Failed to remove instructor"
      );
    }
  };

  return {
    instructors,
    loading,
    error,
    fetchInstructors,
    handleRemoveInstructor,
  };
};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import api from "../../services/apiClient";
import { ENDPOINTS } from "../../services/endpoints";
import type { Course } from "../../types";

export const useCheckout = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      setIsLoading(true);
      try {
        const data = await courseApi.getCourseById(courseId);
        setCourse(data);
      } catch (error) {
        // Fetch course for checkout failed
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get(ENDPOINTS.USERS_ME);
        setStudentName(response.data?.name || "");
      } catch (error) {
        // Fetch user profile failed
      }
    };
    fetchMe();
  }, []);

  return {
    course,
    isLoading,
    studentName,
  };
};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import type { Course } from "../../types";

export const useCourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seriesCourses, setSeriesCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await courseApi.getCourseById(id);
        setCourse(data);
      } catch (error) {
        // Fetch course details failed
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchSeriesCourses = async () => {
      if (!course?.id) return;
      try {
        const result = await courseApi.getCourses({ limit: 6 });
        const items = (result?.courses || [])
          .filter((c: Course) => c.id !== course.id)
          .slice(0, 4);
        setSeriesCourses(items);
      } catch (error) {
        // Fetch course series failed
      }
    };

    fetchSeriesCourses();
  }, [course?.id]);

  return {
    course,
    isLoading,
    seriesCourses,
  };
};

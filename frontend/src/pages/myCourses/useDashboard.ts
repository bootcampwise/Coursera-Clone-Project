import { useState, useEffect } from "react";
import { enrollmentApi } from "../../services/enrollmentApi";
import { courseApi } from "../../services/courseApi";
import type { Enrollment } from "../../types";

export const useDashboard = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [mostPopular, setMostPopular] = useState<any[]>([]);
  const [personalized, setPersonalized] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          enrolledData,
          recentlyViewedData,
          popularData,
          personalizedData,
        ] = await Promise.all([
          enrollmentApi.getMyEnrollments(),
          courseApi.getRecentlyViewed(),
          courseApi.getCourses({ limit: 4 }),
          courseApi.getCourses({ limit: 4, category: "Design" }),
        ]);

        setEnrollments(enrolledData);
        setRecentlyViewed(recentlyViewedData.slice(0, 4));
        setMostPopular(popularData.courses || popularData);
        setPersonalized(personalizedData.courses || personalizedData);
      } catch (error) {
        // Error handled silently as per requirements
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeEnrollment =
    enrollments.find((e) => !e.completed) || enrollments[0];

  return {
    enrollments,
    recentlyViewed,
    mostPopular,
    personalized,
    isLoading,
    activeEnrollment,
  };
};

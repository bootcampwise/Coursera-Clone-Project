import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../redux/slices/instructor/instructorSlice";
import { courseApi } from "../../../services/courseApi";
import { toast } from "react-hot-toast";
import type { AppDispatch, RootState } from "../../../redux/store";

export interface CourseRow {
  id: string;
  title: string;
  status: "Draft" | "Published";
  updatedAt: string;
  _count: {
    enrollments: number;
    reviews: number;
  };
}

export const useInstructorCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading: loading } = useSelector(
    (state: RootState) => state.instructor
  );

  const fetchCourses = () => {
    dispatch(fetchInstructorCourses());
  };

  useEffect(() => {
    fetchCourses();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseApi.deleteCourse(id);
      toast.success("Course deleted");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  return {
    courses,
    loading,
    fetchCourses,
    handleDelete,
  };
};

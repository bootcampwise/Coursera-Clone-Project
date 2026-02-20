import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyEnrollments,
  fetchMyCertificates,
} from "../../redux/slices/student/studentSlice";
import { reviewApi } from "../../services/reviewApi";
import type { Enrollment, Certificate } from "../../types";
import type { AppDispatch, RootState } from "../../redux/store";

export const useMyLearning = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { enrollments, certificates, isLoading } = useSelector(
    (state: RootState) => state.student
  );

  const [activeTab, setActiveTab] = useState("In Progress");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<Enrollment | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const tabs = ["In Progress", "Saved", "Completed"];

  useEffect(() => {
    dispatch(fetchMyEnrollments());
    dispatch(fetchMyCertificates());
  }, [dispatch]);

  const certificatesByCourseId = useMemo(() => {
    const map: Record<string, Certificate> = {};
    (certificates || []).forEach((c: Certificate) => {
      if (c.courseId) map[c.courseId] = c;
    });
    return map;
  }, [certificates]);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((enrollment) => {
      if (activeTab === "In Progress") return !enrollment.completed;
      if (activeTab === "Completed") return enrollment.completed;
      return false;
    });
  }, [enrollments, activeTab]);

  const handleReviewSubmit = async () => {
    if (!reviewRating || !reviewTarget) {
      setReviewError("Please select a rating.");
      return;
    }
    setIsSubmittingReview(true);
    setReviewError(null);
    try {
      await reviewApi.createReview(reviewTarget.course?.id || "", {
        rating: reviewRating,
        comment: reviewComment.trim() || undefined,
      });
      // Re-fetch to update state
      dispatch(fetchMyEnrollments());
      setIsReviewOpen(false);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setReviewError(
        error.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const openReviewModal = (enrollment: Enrollment) => {
    setReviewTarget(enrollment);
    setReviewRating(0);
    setReviewComment("");
    setReviewError(null);
    setIsReviewOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewOpen(false);
  };

  return {
    activeTab,
    setActiveTab,
    tabs,
    enrollments,
    filteredEnrollments,
    isLoading,
    isReviewOpen,
    openReviewModal,
    closeReviewModal,
    reviewTarget,
    reviewRating,
    setReviewRating,
    reviewComment,
    setReviewComment,
    isSubmittingReview,
    reviewError,
    handleReviewSubmit,
    certificatesByCourseId,
    navigate,
  };
};

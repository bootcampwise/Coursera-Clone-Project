import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import { enrollmentApi } from "../../services/enrollmentApi";
import type { Lesson, Module } from "../../types";

export const useCourseAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, assessmentId } = useParams<{
    courseId: string;
    assessmentId: string;
  }>();
  const assessmentStarted = Boolean((location.state as any)?.assessmentStarted);

  const [assessment, setAssessment] = useState<Lesson | null>(null);
  const [enrollment, setEnrollment] = useState<{
    courseId: string;
    enrollmentId?: string;
    studentName?: string;
    progress?: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [honorCodeAccepted, setHonorCodeAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId || !assessmentId) return;
      try {
        setLoading(true);
        const [courseRes, progressRes] = await Promise.all([
          courseApi.getCourseById(courseId),
          enrollmentApi.getCourseProgress(courseId),
        ]);

        const foundAssessment = courseRes.modules
          ?.flatMap((m: Module) => m.lessons)
          ?.find((l: Lesson) => l.id === assessmentId);

        if (!foundAssessment) {
          setError("Assessment not found");
          return;
        }

        let parsedContent;
        try {
          parsedContent = JSON.parse(foundAssessment.content || "{}");
        } catch (e) {
          setError("Invalid assessment content format.");
          return;
        }

        setAssessment({ ...foundAssessment, parsedContent });
        setEnrollment(progressRes);
      } catch (err) {
        setError("Failed to load assessment.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, assessmentId]);

  const questions = assessment?.parsedContent?.questions || [];

  const handleOptionChange = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setIsSubmitModalOpen(true);
  };

  const handleSubmitConfirm = async () => {
    setIsSubmitModalOpen(false);
    setIsSubmitting(true);

    let correctCount = 0;
    questions.forEach((q: any) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const finalScore = Number(
      ((correctCount / questions.length) * 100).toFixed(2)
    );
    const isPassed = assessment?.parsedContent?.passingScore
      ? finalScore >= assessment.parsedContent.passingScore
      : finalScore >= 80;

    try {
      if (enrollment?.enrollmentId) {
        await enrollmentApi.updateLessonProgress(
          enrollment.enrollmentId,
          assessmentId!,
          {
            completed: isPassed,
            passed: isPassed,
            score: finalScore,
          }
        );
      }

      setTimeout(() => {
        navigate(`/learn/${courseId}/assessment/${assessmentId}/result`, {
          state: {
            score: finalScore,
            passingScore: assessment?.parsedContent?.passingScore || 80,
            answers,
            questions,
            isPassed,
            title:
              assessment?.parsedContent?.title ||
              assessment?.title ||
              "Assessment",
            highestScore:
              (assessmentId &&
                typeof enrollment?.progress === "object" &&
                enrollment.progress?.[assessmentId]?.score) ||
              finalScore,
          },
        });
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      alert("Failed to submit assessment. Please try again.");
    }
  };

  return {
    courseId,
    assessmentId,
    assessment,
    enrollment,
    loading,
    error,
    answers,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    honorCodeAccepted,
    setHonorCodeAccepted,
    isSubmitting,
    questions,
    handleOptionChange,
    handleSubmit,
    handleSubmitConfirm,
    assessmentStarted,
    navigate,
  };
};

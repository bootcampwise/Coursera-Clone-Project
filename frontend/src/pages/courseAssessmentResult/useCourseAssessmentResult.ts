import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export interface QuestionResult {
  id: string | number;
  text: string;
  points: number;
  type: "single" | "multiple";
  options: string[];
  userAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  explanation: string;
}

export const useCourseAssessmentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams<{ courseId: string }>();
  const state = location.state || {};

  const {
    score = 0,
    passingScore = 80,
    questions = [],
    answers = {},
    isPassed = false,
    title = "Assessment Result",
    highestScore = 0,
  } = state;

  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(
    new Set(),
  );

  const results: QuestionResult[] = questions.map((q: Record<string, any>) => ({
    id: q.id,
    text: q.question,
    points: 1,
    type: "single",
    options: q.options,
    userAnswer: q.options[answers[q.id]] || "No answer",
    correctAnswer: q.options[q.correctAnswerIndex],
    isCorrect: answers[q.id] === q.correctAnswerIndex,
    explanation:
      q.explanation ||
      (answers[q.id] === q.correctAnswerIndex
        ? "Great job! You got it right."
        : "Keep studying and try again!"),
  }));

  const toggleExplanation = (questionId: string | number) => {
    setExpandedExplanations((prev) => {
      const newSet = new Set(prev);
      const idStr = String(questionId);
      if (newSet.has(idStr)) {
        newSet.delete(idStr);
      } else {
        newSet.add(idStr);
      }
      return newSet;
    });
  };

  return {
    courseId,
    score,
    passingScore,
    isPassed,
    title,
    highestScore,
    questions,
    results,
    expandedExplanations,
    toggleExplanation,
    navigate,
  };
};

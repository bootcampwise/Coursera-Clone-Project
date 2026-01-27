import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuestionResult {
  id: number;
  text: string;
  points: number;
  type: "single" | "multiple";
  options: string[];
  userAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  explanation: string;
}

const mockResults: QuestionResult[] = [
  {
    id: 1,
    text: "Receiving feedback from a diverse audience is one of the goals of soliciting feedback.",
    points: 1,
    type: "single",
    options: ["True", "False"],
    userAnswer: "True",
    correctAnswer: "True",
    isCorrect: true,
    explanation:
      "Correct! Receiving feedback from a diverse audience helps ensure you get multiple perspectives and comprehensive insights.",
  },
  {
    id: 2,
    text: "A team member provided feedback on a design: 'I don't like this design. I think you can do better than this. How can you turn this into actionable feedback in the future?'",
    points: 1,
    type: "single",
    options: [
      "Support the feedback with data",
      "Reframe the feedback as a question",
      "Use the sandwich method",
      "Provide an example",
    ],
    userAnswer: "Support the feedback with data",
    correctAnswer: "Provide an example",
    isCorrect: false,
    explanation:
      "The best approach is to provide an example. Specific examples help make feedback actionable and clear.",
  },
  {
    id: 3,
    text: "A design critique is an opportunity for designers to understand a design from the perspective of their audience.",
    points: 1,
    type: "single",
    options: ["True", "False"],
    userAnswer: "True",
    correctAnswer: "True",
    isCorrect: true,
    explanation:
      "That's right! Design critiques provide valuable insights into how your audience perceives and interacts with your design.",
  },
];

const CourseAssessmentResult: React.FC = () => {
  const navigate = useNavigate();
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(
    new Set(),
  );

  const score = 67;
  const totalPoints = 100;
  const isPassed = score >= 60;

  const toggleExplanation = (questionId: number) => {
    setExpandedExplanations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      {/* ================= HEADER ================= */}
      <header className="border-b border-[#dadce0] sticky top-0 bg-white z-50">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 min-h-[72px] py-4 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-1 text-[#0056D2] font-bold text-[14px] bg-transparent border-none cursor-pointer p-0"
            >
              <svg
                className="w-5 h-5 text-[#0056D2] group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            <div className="hidden md:block border-l border-[#dadce0] h-10 mx-2"></div>

            <div className="w-full md:w-auto">
              <h1 className="text-[16px] font-bold text-[#1f1f1f] leading-snug">
                Module 3 Challenge
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#5f6368] mt-1 md:mt-0">
                <span>Graded Assignment</span>
                <span className="hidden xs:inline">•</span>
                <span>1h</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-[#1f1f1f] font-medium w-full md:w-auto pt-2 md:pt-0 border-t md:border-none border-[#f5f5f5]">
            <svg
              className="w-5 h-5 text-[#5f6368]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className="text-[#1f1f1f]">Due Nov 13, 11:59 PM PST</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-[850px] mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Score Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-[32px] font-bold text-[#1f1f1f] mb-2">
                Your grade: {score}/{totalPoints}
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                    isPassed
                      ? "bg-[#E3F2FD] text-[#0056D2]"
                      : "bg-[#FFEBEE] text-[#D32F2F]"
                  }`}
                >
                  {isPassed ? "Passed" : "Failed"}
                </span>
                <span className="text-[14px] text-[#5f6368]">
                  Latest Submission Grade
                </span>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-[#0056D2] text-white font-semibold text-[14px] rounded hover:bg-primary-hover transition-colors">
              Rate this quiz
            </button>
          </div>
          <p className="text-[12px] text-[#5f6368]">
            Submitted Nov 13, 2023 11:45 PM PST
          </p>
        </div>

        {/* Questions Results */}
        <div className="space-y-8">
          {mockResults.map((question) => (
            <div key={question.id} className="border-b border-[#e1e1e1] pb-8">
              {/* Question Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 flex-1">
                  <span className="text-[14px] font-normal text-[#1f1f1f] w-4 shrink-0 pt-0.5">
                    {question.id}.
                  </span>
                  <p className="text-[16px] leading-relaxed text-[#1f1f1f] font-normal">
                    {question.text}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-[14px] text-[#5f6368] font-normal whitespace-nowrap">
                    {question.points} point
                  </span>
                </div>
              </div>

              {/* User's Answer */}
              <div className="ml-0 sm:ml-8 space-y-3 mb-4">
                {question.options.map((option) => {
                  const isUserAnswer = Array.isArray(question.userAnswer)
                    ? question.userAnswer.includes(option)
                    : question.userAnswer === option;

                  return (
                    <div
                      key={option}
                      className={`flex items-start gap-3 p-2 rounded ${
                        isUserAnswer && !question.isCorrect
                          ? "bg-[#FFEBEE]"
                          : ""
                      }`}
                    >
                      <div className="relative mt-0.5 shrink-0">
                        {question.type === "single" ? (
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              isUserAnswer
                                ? question.isCorrect
                                  ? "border-[#00A86B] border-[6px]"
                                  : "border-[#D32F2F] border-[6px]"
                                : "border-[#757575]"
                            } bg-white`}
                          ></div>
                        ) : (
                          <div
                            className={`w-5 h-5 rounded-[2px] border-2 flex items-center justify-center ${
                              isUserAnswer
                                ? question.isCorrect
                                  ? "bg-[#00A86B] border-[#00A86B]"
                                  : "bg-[#D32F2F] border-[#D32F2F]"
                                : "border-[#757575] bg-white"
                            }`}
                          >
                            {isUserAnswer && (
                              <svg
                                className="w-3.5 h-3.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-[16px] text-[#1f1f1f] leading-relaxed">
                        {option}
                      </span>
                      {isUserAnswer && (
                        <span className="ml-auto shrink-0">
                          {question.isCorrect ? (
                            <svg
                              className="w-5 h-5 text-[#00A86B]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 text-[#D32F2F]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Correct Answer Section (if incorrect) */}
              {!question.isCorrect && (
                <div className="ml-0 sm:ml-8 bg-[#E8F5E9] border-l-4 border-[#00A86B] p-4 rounded mb-4">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-[#00A86B] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <p className="text-[14px] font-semibold text-[#00A86B] mb-1">
                        Correct answer
                      </p>
                      <p className="text-[14px] text-[#1f1f1f]">
                        {Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.join(", ")
                          : question.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Explanation */}
              <div className="ml-0 sm:ml-8">
                <button
                  onClick={() => toggleExplanation(question.id)}
                  className="flex items-center gap-2 text-[#0056D2] font-semibold text-[14px] bg-transparent border-none cursor-pointer p-0 hover:underline"
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedExplanations.has(question.id) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Explain
                </button>
                {expandedExplanations.has(question.id) && (
                  <div className="mt-3 p-4 bg-[#F5F7F8] rounded text-[14px] text-[#1f1f1f] leading-relaxed">
                    {question.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-[#e1e1e1] pt-6 mt-8">
          <button className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px] bg-transparent border-none cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            Like
          </button>
          <button className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px] bg-transparent border-none cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
              />
            </svg>
            Dislike
          </button>
          <button className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px] bg-transparent border-none cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            Report an issue
          </button>
        </div>
      </main>
    </div>
  );
};

export default CourseAssessmentResult;

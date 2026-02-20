import React from "react";
import {
  useCourseAssessmentResult,
  type QuestionResult,
} from "./useCourseAssessmentResult";

const CourseAssessmentResult: React.FC = () => {
  const {
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
  } = useCourseAssessmentResult();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-dark-3">
      {}
      <header className="border-b border-gray-medium-4 sticky top-0 bg-white z-50">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 min-h-[72px] py-4 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
            <button
              onClick={() =>
                courseId ? navigate(`/learn/${courseId}`) : navigate(-1)
              }
              className="group flex items-center gap-1 text-primary font-bold text-[14px] bg-transparent border-none cursor-pointer p-0"
            >
              <svg
                className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform"
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

            <div className="hidden md:block border-l border-gray-medium-4 h-10 mx-2"></div>

            <div className="w-full md:w-auto">
              <h1 className="text-[16px] font-bold text-gray-dark-3 leading-snug">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-text-gray mt-1 md:mt-0">
                <span>Graded Assignment</span>
                <span className="hidden xs:inline">•</span>
                <span>{questions.length} Questions</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-gray-dark-3 font-medium w-full md:w-auto pt-2 md:pt-0 border-t md:border-none border-gray-very-light">
            <svg
              className="w-5 h-5 text-text-gray"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className="text-gray-dark-3">Latest Submission</span>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-[1000px] mx-auto pb-12">
        {}
        <div
          className={`w-full p-6 md:p-8 ${isPassed ? "bg-success-light-bg" : "bg-error-light-bg"} border-b border-gray-medium-4`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2
                className={`text-[24px] md:text-[32px] font-bold ${isPassed ? "text-success-dark-4" : "text-error-dark"}`}
              >
                Your grade: {score.toFixed(2)}%
              </h2>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-gray-dark-3">
                <span className="font-medium">
                  Your latest: {score.toFixed(2)}%
                </span>
                <span className="text-text-gray">•</span>
                <span className="font-medium">
                  Your highest: {Number(highestScore).toFixed(2)}%
                </span>
                <span className="text-text-gray">•</span>
                <span>
                  To pass you need at least {passingScore}%. We keep your
                  highest score.
                </span>
              </div>
            </div>

            {isPassed && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold text-[16px] rounded-[4px] hover:bg-primary-hover transition-colors"
              >
                Next item
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="max-w-[850px] mx-auto px-4 md:px-6 mt-8">
          <p className="text-[12px] text-text-gray mb-8">Submitted just now</p>

          {}
          <div className="space-y-8">
            {results.map((question: QuestionResult, idx: number) => (
              <div key={question.id} className="border-b border-border pb-8">
                {}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 flex-1">
                    <span className="text-[14px] font-normal text-gray-dark-3 w-4 shrink-0 pt-0.5">
                      {idx + 1}.
                    </span>
                    <p className="text-[16px] leading-relaxed text-gray-dark-3 font-normal">
                      {question.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="px-3 py-1 bg-gray-light-ultra-light rounded-full text-[12px] text-text-gray font-medium whitespace-nowrap">
                      1/1 point
                    </span>
                  </div>
                </div>

                {}
                <div className="ml-0 sm:ml-8 space-y-3 mb-4">
                  {question.options.map((option: string) => {
                    const isUserAnswer = Array.isArray(question.userAnswer)
                      ? question.userAnswer.includes(option)
                      : question.userAnswer === option;
                    const isCorrectOption = option === question.correctAnswer;

                    return (
                      <div key={option} className="flex items-start gap-4">
                        <div className="relative mt-1 shrink-0">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isUserAnswer
                                ? isCorrectOption
                                  ? "border-success-bright border-[6px]"
                                  : "border-error-bright border-[6px]"
                                : "border-gray-medium-dark"
                            } bg-white`}
                          ></div>
                        </div>
                        <span className="text-[16px] text-gray-dark-3 leading-relaxed">
                          {option}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {}
                <div
                  className={`ml-0 sm:ml-8 mb-6 p-4 rounded-[4px] flex items-center gap-3 ${
                    question.isCorrect
                      ? "bg-success-light-bg text-success-dark-4"
                      : "bg-error-light-bg text-error-dark"
                  }`}
                >
                  {question.isCorrect ? (
                    <svg
                      className="w-5 h-5 text-success-bright"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-error-bright"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <span className="text-[16px] font-bold">
                    {question.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                {}
                {!question.isCorrect && (
                  <div className="ml-0 sm:ml-8 bg-success-super-light border-l-4 border-success-bright p-4 rounded mb-4">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-success-bright shrink-0 mt-0.5"
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
                        <p className="text-[14px] font-semibold text-success-bright mb-1">
                          Correct answer
                        </p>
                        <p className="text-[14px] text-gray-dark-3">
                          {Array.isArray(question.correctAnswer)
                            ? question.correctAnswer.join(", ")
                            : question.correctAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {}
                <div className="ml-0 sm:ml-8">
                  <button
                    onClick={() => toggleExplanation(question.id)}
                    className="flex items-center gap-2 text-primary font-semibold text-[14px] bg-transparent border-none cursor-pointer p-0 hover:underline"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedExplanations.has(String(question.id))
                          ? "rotate-180"
                          : ""
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
                  {expandedExplanations.has(String(question.id)) && (
                    <div className="mt-3 p-4 bg-surface rounded text-[14px] text-gray-dark-3 leading-relaxed">
                      {question.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="max-w-[850px] mx-auto px-4 md:px-6 flex flex-wrap items-center gap-4 md:gap-6 border-t border-border pt-6 mt-8">
          <button className="flex items-center gap-2 text-primary font-bold text-[14px] bg-transparent border-none cursor-pointer">
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
          <button className="flex items-center gap-2 text-primary font-bold text-[14px] bg-transparent border-none cursor-pointer">
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
          <button className="flex items-center gap-2 text-primary font-bold text-[14px] bg-transparent border-none cursor-pointer">
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

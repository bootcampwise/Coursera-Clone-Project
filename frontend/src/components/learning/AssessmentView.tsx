import React, { useState } from "react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

interface AssessmentData {
  title: string;
  instructions: string;
  questions: Question[];
  passingScore: number;
}

interface AssessmentViewProps {
  content: string;
  onPass: () => void;
  isCompleted: boolean;
}

const AssessmentView: React.FC<AssessmentViewProps> = ({
  content,
  onPass,
  isCompleted,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  let data: AssessmentData;
  try {
    data = JSON.parse(content);
  } catch (e) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <h3 className="font-bold mb-2">Error Parsing Assessment</h3>
        <p className="text-sm">
          The assessment data is malformed. Please contact the instructor.
        </p>
      </div>
    );
  }

  const handleSubmit = () => {
    let correctCount = 0;
    data.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / data.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    if (finalScore >= data.passingScore) {
      onPass();
    }
  };

  const isPassed = score >= data.passingScore;

  if (showResults) {
    return (
      <div className="p-8 bg-white rounded-[12px] border border-gray-medium-4 shadow-sm animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isPassed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            {isPassed ? (
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {isPassed ? "Congratulations!" : "Keep learning!"}
          </h2>
          <p className="text-text-gray">
            You scored{" "}
            <span className="font-bold text-gray-dark-3">{score}%</span>. Passing
            score is {data.passingScore}%.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {data.questions.map((q, idx) => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswerIndex;
            return (
              <div
                key={q.id}
                className="p-4 rounded-lg border border-gray-medium-4"
              >
                <p className="font-medium text-[15px] mb-3">
                  {idx + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    const isCorrectOpt = q.correctAnswerIndex === optIdx;

                    let bgClass = "bg-white";
                    let borderClass = "border-gray-medium-4";

                    if (isSelected) {
                      bgClass = isCorrect ? "bg-green-50" : "bg-red-50";
                      borderClass = isCorrect
                        ? "border-green-500"
                        : "border-red-500";
                    } else if (isCorrectOpt) {
                      bgClass = "bg-green-50";
                      borderClass = "border-green-500";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 text-[14px] rounded-md border ${borderClass} ${bgClass} flex items-center justify-between`}
                      >
                        <span>{opt}</span>
                        {isSelected &&
                          (isCorrect ? (
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          {!isPassed ? (
            <button
              onClick={() => {
                setShowResults(false);
                setSelectedAnswers({});
              }}
              className="px-8 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition-colors"
            >
              Try Again
            </button>
          ) : (
            <div className="text-green-700 font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Assessment Passed! You can now move to the next item.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-bg-light-blue p-6 rounded-[12px] mb-8 border border-gray-medium-4">
        <h3 className="text-[20px] font-bold text-gray-dark-3 mb-2">
          {data.title}
        </h3>
        <p className="text-[14px] text-text-gray leading-relaxed">
          {data.instructions}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="bg-white px-3 py-1.5 rounded-full border border-gray-medium-4 text-[12px] font-bold text-gray-dark-3">
            {data.questions.length} Questions
          </div>
          <div className="bg-white px-3 py-1.5 rounded-full border border-gray-medium-4 text-[12px] font-bold text-gray-dark-3">
            Pass Score: {data.passingScore}%
          </div>
        </div>
      </div>

      <div className="space-y-8 mb-12">
        {data.questions.map((q, qIndex) => (
          <div key={q.id}>
            <p className="text-[16px] font-bold text-gray-dark-3 mb-4">
              {qIndex + 1}. {q.question}
            </p>
            <div className="space-y-3">
              {q.options.map((opt, optIndex) => {
                const isSelected = selectedAnswers[q.id] === optIndex;
                return (
                  <button
                    key={optIndex}
                    onClick={() =>
                      setSelectedAnswers({
                        ...selectedAnswers,
                        [q.id]: optIndex,
                      })
                    }
                    className={`w-full text-left p-4 rounded-[8px] border transition-all ${
                      isSelected
                        ? "border-primary bg-blue-light-1 shadow-sm"
                        : "border-gray-medium-4 hover:bg-gray-50 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-primary" : "border-gray-medium-4"}`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                        )}
                      </div>
                      <span
                        className={`text-[15px] ${isSelected ? "text-primary font-medium" : "text-gray-dark-3"}`}
                      >
                        {opt}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-medium-4">
        <button
          onClick={handleSubmit}
          disabled={
            Object.keys(selectedAnswers).length < data.questions.length ||
            isCompleted
          }
          className={`px-12 py-3 rounded-full font-bold text-[16px] transition-all shadow-md ${
            Object.keys(selectedAnswers).length < data.questions.length ||
            isCompleted
              ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
              : "bg-black text-white hover:bg-gray-800 active:scale-[0.98]"
          }`}
        >
          {isCompleted ? "Assessment Already Passed" : "Submit Quiz"}
        </button>
        {Object.keys(selectedAnswers).length < data.questions.length &&
          !isCompleted && (
            <p className="text-[12px] text-red-500 mt-2 font-medium">
              Please answer all questions before submitting.
            </p>
          )}
      </div>
    </div>
  );
};

export default AssessmentView;


















































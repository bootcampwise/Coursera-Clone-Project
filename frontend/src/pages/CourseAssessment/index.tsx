import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  text: string;
  points: number;
  type: "single" | "multiple";
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which of the following is a key characteristic of a supervised learning algorithm?",
    points: 1,
    type: "single",
    options: [
      "The algorithm learns from unlabeled data.",
      "The algorithm learns from labeled data.",
      "The algorithm does not require any data.",
      "The algorithm is used only for clustering.",
    ],
  },
  {
    id: 2,
    text: "Select all that apply: Which of these are common activation functions in neural networks?",
    points: 1,
    type: "multiple",
    options: [
      "ReLU (Rectified Linear Unit)",
      "Sigmoid",
      "Tanh",
      "Linear Regression",
    ],
  },
  {
    id: 3,
    text: "True or False: Overfitting occurs when a model learns the training data too well, including its noise.",
    points: 1,
    type: "single",
    options: ["True", "False"],
  },
];

const CourseAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [honorCodeAccepted, setHonorCodeAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (
    questionId: number,
    option: string,
    type: "single" | "multiple",
  ) => {
    setAnswers((prev) => {
      if (type === "single") {
        return { ...prev, [questionId]: option };
      } else {
        const currentAnswers = (prev[questionId] as string[]) || [];
        if (currentAnswers.includes(option)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((a) => a !== option),
          };
        } else {
          return { ...prev, [questionId]: [...currentAnswers, option] };
        }
      }
    });
  };

  const handleSubmit = () => {
    setIsSubmitModalOpen(true);
  };

  const handleSubmitConfirm = () => {
    setIsSubmitModalOpen(false);
    setIsSubmitting(true);
    // Simulate submission process
    setTimeout(() => {
      // Navigate to results page
      navigate("/learn/1/assessment/1/result");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f] relative">
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
              <h1 className="text-[16px] font-bold text-[#1f1f1f] leading-snug break-words">
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

      {/* ================= SUBMISSION REVIEW PAGE ================= */}
      {isSubmitting ? (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4">
          {/* Coursera Logo Spinner */}
          <div className="mb-8">
            <svg
              className="w-24 h-24 animate-spin"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 10 A 40 40 0 0 1 90 50"
                stroke="#0056D2"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="85" cy="65" r="6" fill="#0056D2" />
            </svg>
          </div>

          {/* Text Content */}
          <h2 className="text-[28px] font-bold text-[#1f1f1f] mb-3 text-center">
            Reviewing your submission...
          </h2>
          <p className="text-[16px] text-[#5f6368] text-center">
            Hang tight! This shouldn't take too long.
          </p>
        </main>
      ) : (
        <>
          {/* ================= MAIN CONTENT ================= */}
          <main className="max-w-[850px] mx-auto px-4 md:px-6 py-6 md:py-12">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#1f1f1f] mb-8 md:mb-12">
              Assessment
            </h2>

            <div className="space-y-8 md:space-y-12">
              {questions.map((q) => (
                <div key={q.id} className="relative">
                  {/* Question Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
                    <div className="flex gap-4">
                      <span className="text-[14px] font-normal text-[#1f1f1f] w-4 shrink-0 pt-0.5">
                        {q.id}.
                      </span>
                      <p className="text-[16px] leading-relaxed text-[#1f1f1f] font-normal max-w-[680px]">
                        {q.text}
                      </p>
                    </div>
                    <span className="text-[14px] text-[#5f6368] font-normal sm:text-right pl-8 sm:pl-0">
                      {q.points} point
                    </span>
                  </div>

                  {/* Options */}
                  <div className="ml-0 sm:ml-8 space-y-3">
                    {q.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-start gap-3 cursor-pointer group p-2 rounded hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative mt-0.5 shrink-0">
                          <input
                            type={q.type === "single" ? "radio" : "checkbox"}
                            name={`question-${q.id}`}
                            value={option}
                            checked={
                              q.type === "single"
                                ? answers[q.id] === option
                                : (answers[q.id] as string[])?.includes(option)
                            }
                            onChange={() =>
                              handleOptionChange(q.id, option, q.type)
                            }
                            className="peer sr-only"
                          />
                          {/* Custom Radio/Checkbox Design */}
                          {q.type === "single" ? (
                            <div className="w-5 h-5 rounded-full border border-[#757575] bg-white group-hover:border-[#1f1f1f] peer-checked:border-[#0056D2] peer-checked:border-[6px] transition-all"></div>
                          ) : (
                            <div className="w-5 h-5 rounded-[2px] border border-[#757575] bg-white group-hover:border-[#1f1f1f] peer-checked:bg-[#0056D2] peer-checked:border-[#0056D2] flex items-center justify-center transition-all">
                              <svg
                                className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100"
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
                            </div>
                          )}
                        </div>
                        <span className="text-[16px] text-[#1f1f1f] leading-relaxed select-none">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Honor Code Section */}
            <div className="mt-12 md:mt-16 mb-8 pt-8 border-t border-[#e1e1e1]">
              <p className="text-[14px] font-bold text-[#1f1f1f] mb-4">
                Coursera Honor Code{" "}
                <a
                  href="#"
                  className="text-[#0056D2] font-semibold no-underline hover:underline ml-1"
                >
                  Learn more
                </a>
              </p>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={honorCodeAccepted}
                    onChange={(e) => setHonorCodeAccepted(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded-[2px] border border-[#757575] bg-white hover:border-[#1f1f1f] peer-checked:bg-[#0056D2] peer-checked:border-[#0056D2] flex items-center justify-center transition-all">
                    <svg
                      className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100"
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
                  </div>
                </div>
                <div className="text-[12px] text-[#1f1f1f] leading-relaxed">
                  <span className="font-bold">
                    I, Zainab Murtaza, understand that submitting work that
                    isn&apos;t my own may result in permanent failure of this
                    course or deactivation of my Coursera account.
                  </span>
                  <br />
                  <span className="text-[#5f6368]">
                    You must select the checkbox in order to submit the
                    assignment
                  </span>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 md:mb-16">
              <button
                onClick={handleSubmit}
                disabled={!honorCodeAccepted}
                className="w-full sm:w-auto px-6 py-2 bg-[#0056D2] text-white font-bold text-[14px] rounded-[4px] hover:bg-primary-hover disabled:bg-[#dadce0] disabled:text-[#757575] border border-[#0056D2] disabled:border-[#dadce0] transition-colors cursor-pointer"
              >
                Submit
              </button>
              <button className="w-full sm:w-auto px-6 py-2 bg-white text-[#0056D2] font-bold text-[14px] rounded-[4px] border border-[#0056D2] hover:bg-[#f5f7f8] transition-colors cursor-pointer">
                Save Draft
              </button>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-[#e1e1e1] pt-6 mb-12">
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

          {/* ================= SUBMIT MODAL ================= */}
          {isSubmitModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-[400px] flex flex-col items-center">
                <h3 className="text-[20px] font-semibold text-[#1f1f1f] mb-8 text-center">
                  Ready to submit?
                </h3>

                <div className="flex items-center justify-center gap-4 w-full">
                  <button
                    onClick={handleSubmitConfirm}
                    className="px-8 py-2.5 bg-[#0056D2] text-white font-semibold text-[14px] rounded hover:bg-primary-hover transition-colors cursor-pointer border-none"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-8 py-2.5 bg-white text-[#0056D2] font-semibold text-[14px] rounded border border-[#0056D2] hover:bg-[#f5f7f8] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseAssessment;

import React, { useState, useEffect } from "react";

interface EditLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    title: string,
    description?: string,
    content?: string,
  ) => void;
  lesson: {
    id: string;
    title: string;
    type: "VIDEO" | "READING" | "ASSESSMENT";
    description?: string;
    content?: string;
    videoUrl?: string;
  } | null;
}

const EditLessonModal: React.FC<EditLessonModalProps> = ({
  isOpen,
  onClose,
  onSave,
  lesson,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [assessmentErrors, setAssessmentErrors] = useState<string[]>([]);
  const [assessmentWarnings, setAssessmentWarnings] = useState<string[]>([]);

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setDescription(lesson.description || "");
      setContent(lesson.content || "");
      setAssessmentErrors([]);
      setAssessmentWarnings([]);
    }
  }, [lesson]);

  if (!isOpen || !lesson) return null;

  const validateAssessmentContent = (raw: string) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    let parsed: Record<string, any> | null = null;

    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      errors.push("Invalid JSON format. Please check your syntax.");
      return { errors, warnings };
    }

    if (!parsed || typeof parsed !== "object") {
      errors.push("Assessment content must be a JSON object.");
      return { errors, warnings };
    }

    if (!parsed.title || typeof parsed.title !== "string") {
      errors.push("Assessment title is required and must be a string.");
    }
    if (typeof parsed.passingScore !== "number") {
      errors.push("Passing score is required and must be a number.");
    }

    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      errors.push("Assessment must include at least one question.");
    } else {
      parsed.questions.forEach((q: Record<string, any>, index: number) => {
        const label = `Question ${index + 1}`;
        if (!q.id || typeof q.id !== "string") {
          errors.push(`${label} is missing a string 'id'.`);
        }
        if (!q.question || typeof q.question !== "string") {
          errors.push(`${label} is missing 'question' text.`);
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          errors.push(`${label} must have exactly 4 options.`);
        }
        if (
          typeof q.correctAnswerIndex !== "number" ||
          q.correctAnswerIndex < 0 ||
          q.correctAnswerIndex > 3
        ) {
          errors.push(
            `${label} has invalid correctAnswerIndex (must be 0-3).`,
          );
        }
      });
    }

    if (parsed.instructions && typeof parsed.instructions !== "string") {
      warnings.push("Instructions should be a string if provided.");
    }

    return { errors, warnings };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (lesson.type === "ASSESSMENT") {
      const { errors, warnings } = validateAssessmentContent(content);
      setAssessmentErrors(errors);
      setAssessmentWarnings(warnings);
      if (errors.length > 0) {
        return;
      }
    }

    if (title.trim()) {
      const cleanedDescription = description.trim();
      onSave(
        lesson.id,
        title,
        cleanedDescription ? cleanedDescription : undefined,
        lesson.type === "READING" || lesson.type === "ASSESSMENT"
          ? content
          : undefined,
      );
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="edit-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div className="sm:flex sm:items-start">
            <div
              className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                lesson.type === "VIDEO"
                  ? "bg-indigo-100"
                  : lesson.type === "READING"
                    ? "bg-green-100"
                    : "bg-purple-100"
              }`}
            >
              {lesson.type === "VIDEO" && (
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
              {lesson.type === "READING" && (
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              )}
              {lesson.type === "ASSESSMENT" && (
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="edit-modal-title"
              >
                Edit{" "}
                {lesson.type === "VIDEO"
                  ? "Video"
                  : lesson.type === "READING"
                    ? "Reading"
                    : "Assessment"}{" "}
                Lesson
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label
                    htmlFor="edit-title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lesson Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="edit-title"
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="edit-description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lesson Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="edit-description"
                      name="description"
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="Short summary shown to learners (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {lesson.type === "READING" && (
                  <div>
                    <label
                      htmlFor="edit-content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reading Content
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="edit-content"
                        name="content"
                        rows={10}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border font-mono text-sm"
                        placeholder="Enter lesson content here (Markdown supported)..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {lesson.type === "ASSESSMENT" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="edit-assessment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Assessment JSON Data
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const template = {
                            title: "Quiz Title",
                            instructions: "Please select the correct answer.",
                            questions: [
                              {
                                id: "q1",
                                question: "What is React?",
                                options: [
                                  "A Library",
                                  "A Framework",
                                  "A Language",
                                  "A Database",
                                ],
                                correctAnswerIndex: 0,
                              },
                            ],
                            passingScore: 60,
                          };
                          setContent(JSON.stringify(template, null, 2));
                          setAssessmentErrors([]);
                          setAssessmentWarnings([]);
                        }}
                        className="text-[12px] text-indigo-600 font-bold hover:underline"
                      >
                        Insert Template
                      </button>
                    </div>

                    {(assessmentErrors.length > 0 ||
                      assessmentWarnings.length > 0) && (
                      <div className="space-y-3">
                        {assessmentErrors.length > 0 && (
                          <div className="bg-red-50 border-l-4 border-red-400 p-4">
                            <h4 className="text-sm font-bold text-red-800 mb-1">
                              Fix these errors before saving:
                            </h4>
                            <ul className="text-xs text-red-700 list-disc ml-4 space-y-1">
                              {assessmentErrors.map((err) => (
                                <li key={err}>{err}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {assessmentWarnings.length > 0 && (
                          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                            <h4 className="text-sm font-bold text-amber-800 mb-1">
                              Warnings:
                            </h4>
                            <ul className="text-xs text-amber-700 list-disc ml-4 space-y-1">
                              {assessmentWarnings.map((warn) => (
                                <li key={warn}>{warn}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                      <h4 className="text-sm font-bold text-amber-800 mb-1">
                        Instructional Guide:
                      </h4>
                      <ul className="text-xs text-amber-700 list-disc ml-4 space-y-1">
                        <li>Each question MUST include a unique string `id`.</li>
                        <li>Each question MUST have exactly 4 options.</li>
                        <li>
                          `correctAnswerIndex` must be 0, 1, 2, or 3 (0 = first
                          option).
                        </li>
                        <li>`passingScore` is a number (e.g., 60).</li>
                      </ul>
                    </div>

                    <div className="mt-1">
                      <textarea
                        id="edit-assessment"
                        name="content"
                        rows={12}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border font-mono text-[13px] bg-slate-50"
                        placeholder="Paste Assessment JSON here..."
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                          if (assessmentErrors.length > 0) {
                            setAssessmentErrors([]);
                          }
                          if (assessmentWarnings.length > 0) {
                            setAssessmentWarnings([]);
                          }
                        }}
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const { errors, warnings } =
                              validateAssessmentContent(content);
                            setAssessmentErrors(errors);
                            setAssessmentWarnings(warnings);
                          }}
                          className="text-[12px] text-slate-800 font-bold hover:underline"
                        >
                          Validate JSON
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            try {
                              const parsed = JSON.parse(content);
                              setContent(JSON.stringify(parsed, null, 2));
                            } catch {
                              setAssessmentErrors([
                                "Invalid JSON format. Please check your syntax.",
                              ]);
                            }
                          }}
                          className="text-[12px] text-slate-800 font-bold hover:underline"
                        >
                          Format JSON
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {lesson.type === "VIDEO" && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          Video content is managed in the Videos tab.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLessonModal;


















































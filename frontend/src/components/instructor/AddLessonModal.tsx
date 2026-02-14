import React, { useState } from "react";

interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    type: "VIDEO" | "READING" | "ASSESSMENT",
    description?: string,
    content?: string,
  ) => void;
  fixedType?: "VIDEO" | "READING" | "ASSESSMENT";
  showContentField?: boolean;
}

const AddLessonModal: React.FC<AddLessonModalProps> = ({
  isOpen,
  onClose,
  onSave,
  fixedType,
  showContentField,
}) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"VIDEO" | "READING" | "ASSESSMENT">(
    fixedType || "VIDEO",
  );
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  
  React.useEffect(() => {
    if (fixedType) {
      setType(fixedType);
    }
  }, [fixedType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const cleanedDescription = description.trim();
      const cleanedContent = content.trim();
      onSave(
        title,
        type,
        cleanedDescription ? cleanedDescription : undefined,
        cleanedContent ? cleanedContent : undefined,
      );
      setTitle("");
      setType(fixedType || "VIDEO");
      setDescription("");
      setContent("");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Add New Lesson
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Define the learning intent for this lesson. Content can be
                    added later.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Title <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="e.g., Introduction to React"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="Short summary shown to learners (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Type <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    disabled={!!fixedType}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border ${
                      fixedType ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    value={type}
                    onChange={(e) =>
                      setType(
                        e.target.value as "VIDEO" | "READING" | "ASSESSMENT",
                      )
                    }
                  >
                    <option value="VIDEO">Video Lesson</option>
                    <option value="READING">Reading / Article</option>
                    <option value="ASSESSMENT">Assessment / Quiz</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {type === "VIDEO" && "Learners will watch a video content."}
                  {type === "READING" && "Learners will read text or articles."}
                  {type === "ASSESSMENT" &&
                    "Learners will complete a multiple-choice quiz."}
                </p>
              </div>

              {showContentField && (
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {type === "ASSESSMENT"
                      ? "Assessment JSON Content"
                      : "Reading Content"}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      name="content"
                      rows={6}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border font-mono text-xs"
                      placeholder={
                        type === "ASSESSMENT"
                          ? 'e.g., [{"question": "...", "options": [...], "answer": "..."}]'
                          : "Enter lesson content (Markdown supported)..."
                      }
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  {type === "ASSESSMENT" && (
                    <p className="mt-1 text-xs text-gray-400">
                      Please enter valid JSON for the assessment.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                disabled={showContentField && !content.trim()}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Lesson
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLessonModal;


















































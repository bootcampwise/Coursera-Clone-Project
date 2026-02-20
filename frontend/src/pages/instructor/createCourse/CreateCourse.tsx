import React from "react";
import { useCreateCourse } from "./useCreateCourse";

const CreateCourse: React.FC = () => {
  const {
    id,
    isEditMode,
    isAdmin,
    form,
    thumbnailFile,
    thumbnailUrl,
    existingThumbnail,
    uploadMethod,
    showThumbnailInput,
    loading,
    fetching,
    instructors,
    setThumbnailFile,
    setThumbnailUrl,
    setUploadMethod,
    setShowThumbnailInput,
    onChange,
    onSubmit,
    navigate,
    location,
  } = useCreateCourse();

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {isEditMode ? "Edit Course" : "Create Course"}
        </h1>
        <p className="text-sm text-gray-500">
          {isEditMode
            ? "Update your course content and metadata."
            : "Build a course draft with clean metadata and outcomes."}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              Course Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  placeholder="e.g. React Fundamentals"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  name="subtitle"
                  value={form.subtitle}
                  onChange={onChange}
                  placeholder="Short value proposition for learners"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>Development</option>
                    <option>Business</option>
                    <option>Design</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={onChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={onChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>English</option>
                    <option>Urdu</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </div>

              {isAdmin && !isEditMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Instructor *
                  </label>
                  <select
                    required
                    name="instructorId"
                    value={form.instructorId || ""}
                    onChange={onChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select instructor...</option>
                    {instructors.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Thumbnail
                </label>

                {}
                {(existingThumbnail || thumbnailFile) && !showThumbnailInput ? (
                  <div className="space-y-3">
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={
                          thumbnailFile
                            ? URL.createObjectURL(thumbnailFile)
                            : existingThumbnail
                        }
                        alt="Course thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowThumbnailInput(true)}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      Change Thumbnail
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {}
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setUploadMethod("file")}
                        className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all ${
                          uploadMethod === "file"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMethod("url")}
                        className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all ${
                          uploadMethod === "url"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        Use URL
                      </button>
                    </div>

                    {uploadMethod === "file" ? (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setThumbnailFile(file);
                          setThumbnailUrl("");
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <input
                        type="url"
                        value={thumbnailUrl}
                        onChange={(e) => {
                          setThumbnailUrl(e.target.value);
                          setThumbnailFile(null);
                        }}
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    )}

                    {}
                    {(thumbnailFile || thumbnailUrl) && (
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mt-3">
                        <img
                          src={
                            thumbnailFile
                              ? URL.createObjectURL(thumbnailFile)
                              : thumbnailUrl
                          }
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EInvalid Image%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    )}

                    {existingThumbnail && showThumbnailInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowThumbnailInput(false);
                          setThumbnailFile(null);
                          setThumbnailUrl("");
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  {!existingThumbnail && !thumbnailFile && !showThumbnailInput
                    ? "Add a course thumbnail via file upload or URL"
                    : "Recommended: 1200x800px, JPG or PNG"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Write a clear course description for learners..."
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Outcomes
                </label>
                <textarea
                  name="outcomes"
                  value={form.outcomes}
                  onChange={onChange}
                  placeholder="Example: Build reusable React components, Manage state with hooks..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Tip: keep outcomes action-oriented and measurable.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              Publishing
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD)
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={onChange}
                  inputMode="decimal"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Set 0 for free courses.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update Course"
                    : "Create Course"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      location.pathname.includes("/admin")
                        ? `/admin/videos?courseId=${id}`
                        : `/instructor/videos?courseId=${id}`
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Manage Videos
                </button>
              )}
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Next Steps
            </h2>
            <p className="text-sm text-gray-500">
              After creating the course, upload videos and arrange lessons.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                {
                  title: "Upload videos",
                  desc: "Add lesson videos and assets.",
                },
                {
                  title: "Structure lessons",
                  desc: "Organize modules and lessons.",
                },
                {
                  title: "Preview & publish",
                  desc: "Validate content before publishing.",
                },
              ].map((n) => (
                <div
                  key={n.title}
                  className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div className="text-sm font-semibold text-gray-900">
                    {n.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{n.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { courseApi } from "../../services/courseApi";
import api from "../../services/apiClient"; // Import base API client for upload

interface LessonRow {
  id: string;
  title: string;
  moduleTitle: string;
  courseTitle: string;
  duration: number | null;
  videoUrl: string | null;
  updatedAt: string;
}

const Videos: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  // Embed Video State
  const [embedUrls, setEmbedUrls] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<{
    [key: string]: "upload" | "embed";
  }>({});

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      fetchLessons(selectedCourseId);
    } else {
      setLessons([]);
    }
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const data = await courseApi.getInstructorCourses();
      setCourses(data);
      if (data.length > 0) {
        setSelectedCourseId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const fetchLessons = async (courseId: string) => {
    setLoading(true);
    try {
      const modules = await courseApi.getModules(courseId);
      const videoLessons: LessonRow[] = [];
      const course = courses.find((c) => c.id === courseId);

      // Flatten lessons from modules
      if (modules && Array.isArray(modules)) {
        modules.forEach((module: any) => {
          if (module.lessons && Array.isArray(module.lessons)) {
            module.lessons.forEach((lesson: any) => {
              if (lesson.type === "VIDEO") {
                videoLessons.push({
                  id: lesson.id,
                  title: lesson.title,
                  moduleTitle: module.title,
                  courseTitle: course?.title || "Unknown",
                  duration: lesson.duration,
                  videoUrl: lesson.videoUrl,
                  updatedAt: lesson.updatedAt,
                });
                // Initialize state
                setActiveTab((prev) => ({ ...prev, [lesson.id]: "upload" }));
                setEmbedUrls((prev) => ({
                  ...prev,
                  [lesson.id]: lesson.videoUrl || "",
                }));
              }
            });
          }
        });
      }

      setLessons(videoLessons);
    } catch (error) {
      toast.error("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (lessonId: string, file: File) => {
    setUploading((prev) => ({ ...prev, [lessonId]: true }));
    const toastId = toast.loading("Uploading video...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // 1. Upload File
      const uploadResponse = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = uploadResponse.data.url;

      // 2. Update Lesson
      await courseApi.updateLesson(lessonId, {
        videoUrl: fileUrl,
        duration: 120, // Should calculate real duration if possible, default 2 mins
      });

      toast.success("Video uploaded successfully", { id: toastId });
      fetchLessons(selectedCourseId);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed", { id: toastId });
    } finally {
      setUploading((prev) => ({ ...prev, [lessonId]: false }));
    }
  };

  const handleEmbedSave = async (lessonId: string) => {
    const url = embedUrls[lessonId];
    if (!url) return toast.error("Please enter a URL");

    const toastId = toast.loading("Saving embed URL...");
    try {
      await courseApi.updateLesson(lessonId, {
        videoUrl: url,
        duration: 0, // External embeds might not provide duration easily
      });
      toast.success("Video URL saved", { id: toastId });
      fetchLessons(selectedCourseId);
    } catch (error) {
      toast.error("Failed to save URL", { id: toastId });
    }
  };

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lessonId: string,
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(lessonId, e.target.files[0]);
    }
  };

  const hasVideoLessons = lessons.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Videos</h1>
          <p className="text-sm text-gray-500">
            Manage video content for your lessons. Upload files or embed URLs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
            {courses.length === 0 && <option>No courses found</option>}
          </select>
        </div>

        <div className="lg:col-span-3">
          {!selectedCourseId ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center shadow-sm">
              <p className="text-gray-500">
                Please select a course to manage videos.
              </p>
            </div>
          ) : !loading && !hasVideoLessons ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No Video Lessons Found
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                This course doesn't have any lessons of type "VIDEO" yet. Videos
                must be attached to specific lessons in the curriculum.
              </p>
              <a
                href={`/instructor/courses/${selectedCourseId}/curriculum`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Curriculum Builder
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {lesson.moduleTitle}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {lesson.videoUrl ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Video Attached
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Missing Content
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-200 mb-4">
                    <nav className="-mb-px flex space-x-6">
                      <button
                        onClick={() =>
                          setActiveTab((prev) => ({
                            ...prev,
                            [lesson.id]: "upload",
                          }))
                        }
                        className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab[lesson.id] !== "embed"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Upload Video
                      </button>
                      <button
                        onClick={() =>
                          setActiveTab((prev) => ({
                            ...prev,
                            [lesson.id]: "embed",
                          }))
                        }
                        className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab[lesson.id] === "embed"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Embed URL
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  {activeTab[lesson.id] !== "embed" ? (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Video File
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => onFileChange(e, lesson.id)}
                          disabled={uploading[lesson.id]}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {uploading[lesson.id] && (
                          <span className="text-sm text-gray-500">
                            Uploading...
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Supported formats: MP4, WebM, Ogg. Max size: 100MB.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={embedUrls[lesson.id] || ""}
                          onChange={(e) =>
                            setEmbedUrls((prev) => ({
                              ...prev,
                              [lesson.id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => handleEmbedSave(lesson.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Paste a link to YouTube, Vimeo, or a hosted video file.
                      </p>
                    </div>
                  )}

                  {/* Current Video Preview if available */}
                  {lesson.videoUrl && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                        Current Video Source
                      </p>
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline truncate block"
                      >
                        {lesson.videoUrl}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;

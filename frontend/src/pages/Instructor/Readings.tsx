import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { courseApi } from "../../services/courseApi";
import EditLessonModal from "../../components/instructor/EditLessonModal";
import AddLessonModal from "../../components/instructor/AddLessonModal";
import type { Course, Module, Lesson } from "../../types/course";

interface LessonRow {
  id: string;
  title: string;
  moduleTitle: string;
  courseTitle: string;
  content?: string;
  updatedAt?: string;
}

const Readings: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      fetchModules(selectedCourseId);
    } else {
      setModules([]);
      setSelectedModuleId("");
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (selectedModuleId) {
      fetchLessons(selectedModuleId);
    } else {
      setLessons([]);
    }
  }, [selectedModuleId]);

  const fetchCourses = async () => {
    try {
      const data = isAdmin
        ? await courseApi.getAdminCourses()
        : await courseApi.getInstructorCourses();
      setCourses(data);

      const queryParams = new URLSearchParams(location.search);
      const queryCourseId = queryParams.get("courseId");

      if (queryCourseId) {
        setSelectedCourseId(queryCourseId);
      } else if (data.length > 0) {
        setSelectedCourseId(data[0].id);
      }
    } catch (error: unknown) {
      toast.error("Failed to fetch courses");
    }
  };

  const fetchModules = async (courseId: string) => {
    try {
      const data = await courseApi.getModules(courseId);
      setModules(data);
      if (data.length > 0) {
        setSelectedModuleId(data[0].id);
      } else {
        setSelectedModuleId("");
      }
    } catch (error) {
      toast.error("Failed to load modules");
    }
  };

  const fetchLessons = async (moduleId: string) => {
    setLoading(true);
    try {
      const module = modules.find((m) => m.id === moduleId);
      const readingLessons: LessonRow[] = (module?.lessons || [])
        .filter((l: Lesson) => l.type === "READING")
        .map((l: Lesson) => ({
          id: l.id,
          title: l.title,
          moduleTitle: module?.title || "Unknown",
          courseTitle:
            courses.find((c) => c.id === selectedCourseId)?.title || "Unknown",
          content: l.content,
          updatedAt: l.updatedAt,
        }));

      setLessons(readingLessons);
    } catch (error) {
      toast.error("Failed to load readings");
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = (lessonId: string) => {
    const module = modules.find((m) => m.id === selectedModuleId);
    const lesson = module?.lessons.find((l: Lesson) => l.id === lessonId);
    if (lesson) {
      setEditingLesson(lesson);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this reading material?"))
      return;
    try {
      await courseApi.deleteLesson(lessonId);
      toast.success("Reading material deleted");
      fetchModules(selectedCourseId);
    } catch (error) {
      toast.error("Failed to delete reading material");
    }
  };

  const handleSaveLesson = async (
    id: string,
    title: string,
    description?: string,
    content?: string,
  ) => {
    try {
      await courseApi.updateLesson(id, { title, description, content });
      toast.success("Reading material updated");
      fetchModules(selectedCourseId);
    } catch (error) {
      toast.error("Failed to update reading material");
    }
  };

  const handleAddLesson = async (
    title: string,
    type: string,
    description?: string,
    content?: string,
  ) => {
    void type;
    try {
      const module = modules.find((m) => m.id === selectedModuleId);
      const order = module ? module.lessons.length : 0;
      await courseApi.createLesson(selectedModuleId, {
        title,
        type: "READING",
        order,
        description,
        content,
      });
      toast.success("Reading material created");
      fetchModules(selectedCourseId);
    } catch (error) {
      toast.error("Failed to create reading material");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Reading Material
          </h1>
          <p className="text-sm text-gray-500">
            Manage articles and text-based lessons for your modules.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={!selectedModuleId}
          className="px-4 py-2 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Reading
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Module
          </label>
          <select
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={!selectedCourseId}
          >
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
            {modules.length === 0 && <option>No modules found</option>}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            <p className="text-gray-500 text-sm mt-4">Loading readings...</p>
          </div>
        ) : lessons.length === 0 ? (
          <div className="p-16 text-center">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-gray-900 font-medium">
              No reading material found
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Select a module or create a new reading lesson.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Lesson Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Last Updated
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lessons.map((lesson) => (
                  <tr
                    key={lesson.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lesson.moduleTitle}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {lesson.content ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lesson.updatedAt
                        ? new Date(lesson.updatedAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          onClick={() => handleEditLesson(lesson.id)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddLessonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddLesson}
        fixedType="READING"
        showContentField={true}
      />

      <EditLessonModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveLesson}
        lesson={editingLesson}
      />
    </div>
  );
};

export default Readings;

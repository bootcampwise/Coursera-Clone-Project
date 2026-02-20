import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { courseApi } from "../../../services/courseApi";
import type { Course, Module, Lesson } from "../../../types/course";

export interface LessonRow {
  id: string;
  title: string;
  moduleTitle: string;
  courseTitle: string;
  content?: string;
  updatedAt?: string;
}

export const useInstructorReadings = () => {
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
  }, [selectedModuleId, modules]);

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
    content?: string
  ) => {
    try {
      await courseApi.updateLesson(id, { title, description, content });
      toast.success("Reading material updated");
      fetchModules(selectedCourseId);
      setIsEditModalOpen(false);
      setEditingLesson(null);
    } catch (error) {
      toast.error("Failed to update reading material");
    }
  };

  const handleAddLesson = async (
    title: string,
    type: string,
    description?: string,
    content?: string
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
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error("Failed to create reading material");
    }
  };

  return {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    modules,
    selectedModuleId,
    setSelectedModuleId,
    lessons,
    loading,
    isAddModalOpen,
    isEditModalOpen,
    editingLesson,
    setIsAddModalOpen,
    setIsEditModalOpen,
    handleEditLesson,
    handleDeleteLesson,
    handleSaveLesson,
    handleAddLesson,
  };
};

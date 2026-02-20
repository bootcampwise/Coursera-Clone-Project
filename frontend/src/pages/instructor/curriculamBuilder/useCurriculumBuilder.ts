import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { courseApi } from "../../../services/courseApi";
import type { Module, Lesson } from "../../../types/course";

export const useCurriculumBuilder = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);

  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);

  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const fetchModules = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await courseApi.getModules(courseId);

      const sortedModules = data
        .map((m: Module) => ({
          ...m,
          lessons: m.lessons
            ? m.lessons.sort((a: Lesson, b: Lesson) => a.order - b.order)
            : [],
        }))
        .sort((a: Module, b: Module) => a.order - b.order);
      setModules(sortedModules);
    } catch (error) {
      toast.error("Failed to load curriculum");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  const handleAddModule = async () => {
    if (!courseId) return;
    const title = prompt("Enter Module Title:");
    if (title) {
      try {
        await courseApi.createModule(courseId, {
          title,
          order: modules.length,
        });
        toast.success("Module added");
        fetchModules();
      } catch (error) {
        toast.error("Failed to add module");
      }
    }
  };

  const handleEditModule = async (module: Module) => {
    const title = prompt("Edit Module Title:", module.title);
    if (title && title !== module.title) {
      try {
        await courseApi.updateModule(module.id, { title });
        toast.success("Module updated");
        fetchModules();
      } catch (error) {
        toast.error("Failed to update module");
      }
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (
      confirm(
        "Delete this module? All lessons inside will be removed and this will immediately affect student course content."
      )
    ) {
      try {
        await courseApi.deleteModule(moduleId);
        toast.success("Module deleted");
        fetchModules();
      } catch (error) {
        toast.error("Failed to delete module");
      }
    }
  };

  const handleAddLesson = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setIsAddLessonModalOpen(true);
  };

  const handleSaveLesson = async (
    title: string,
    type: "VIDEO" | "READING" | "ASSESSMENT",
    description?: string,
    content?: string
  ) => {
    if (!currentModuleId) return;

    try {
      const module = modules.find((m) => m.id === currentModuleId);
      const order = module ? module.lessons.length : 0;

      await courseApi.createLesson(currentModuleId, {
        title,
        type,
        order,
        description,
        content,
      });

      const typeLabel =
        type === "VIDEO"
          ? "Video"
          : type === "READING"
            ? "Reading"
            : "Assessment";
      toast.success(`${typeLabel} lesson added`);
      setIsAddLessonModalOpen(false);
      setCurrentModuleId(null);
      fetchModules();
    } catch (error) {
      toast.error("Failed to add lesson");
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsEditLessonModalOpen(true);
  };

  const handleSaveEditedLesson = async (
    id: string,
    title: string,
    description?: string,
    content?: string
  ) => {
    try {
      await courseApi.updateLesson(id, {
        title,
        description,
        content,
      });
      toast.success("Lesson updated");
      setIsEditLessonModalOpen(false);
      setEditingLesson(null);
      fetchModules();
    } catch (error) {
      toast.error("Failed to update lesson");
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (
      confirm(
        "Delete this lesson? This will immediately remove it from student course content."
      )
    ) {
      try {
        await courseApi.deleteLesson(lessonId);
        toast.success("Lesson deleted");
        fetchModules();
      } catch (error) {
        toast.error("Failed to delete lesson");
      }
    }
  };

  const handleReorderLessons = async (moduleId: string, lessons: Lesson[]) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return { ...m, lessons };
        }
        return m;
      })
    );

    try {
      const updates = lessons.map((l, index) => ({ id: l.id, order: index }));
      await courseApi.reorderLessons(updates);
    } catch (error) {
      toast.error("Failed to reorder lessons");
      fetchModules();
    }
  };

  return {
    modules,
    loading,
    isAddLessonModalOpen,
    isEditLessonModalOpen,
    editingLesson,
    setIsAddLessonModalOpen,
    setIsEditLessonModalOpen,
    handleAddModule,
    handleEditModule,
    handleDeleteModule,
    handleAddLesson,
    handleSaveLesson,
    handleEditLesson,
    handleSaveEditedLesson,
    handleDeleteLesson,
    handleReorderLessons,
  };
};

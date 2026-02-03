import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ModuleList from "../../components/instructor/ModuleList";
import { courseApi } from "../../services/courseApi";
import AddLessonModal from "../../components/instructor/AddLessonModal";
import EditLessonModal from "../../components/instructor/EditLessonModal";

// explicit types to avoid inference issues with unions
interface Lesson {
  id: string;
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  order: number;
  description?: string;
  content?: string;
  videoUrl?: string;
  updatedAt?: string;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

const CurriculumBuilder: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);

  // Add Lesson Modal State
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);

  // Edit Lesson Modal State
  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any | null>(null);

  const fetchModules = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await courseApi.getModules(courseId);
      // Ensure lessons are sorted by order
      const sortedModules = data
        .map((m: any) => ({
          ...m,
          lessons: m.lessons
            ? m.lessons.sort((a: any, b: any) => a.order - b.order)
            : [],
        }))
        .sort((a: any, b: any) => a.order - b.order);
      setModules(sortedModules);
    } catch (error) {
      toast.error("Failed to load curriculum");
      console.error(error);
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

  const handleEditModule = async (module: any) => {
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
        "Delete this module? All lessons inside will be removed and this will immediately affect student course content.",
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

  // --- Add Lesson Logic ---
  const handleAddLesson = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setIsAddLessonModalOpen(true);
  };

  const handleSaveLesson = async (
    title: string,
    type: "VIDEO" | "READING" | "ASSESSMENT",
    description?: string,
  ) => {
    if (!currentModuleId) return;

    try {
      // Find current module to determine order
      const module = modules.find((m) => m.id === currentModuleId);
      const order = module ? module.lessons.length : 0;

      await courseApi.createLesson(currentModuleId, {
        title,
        type,
        order,
        description,
      });

      const typeLabel =
        type === "VIDEO" ? "Video" : type === "READING" ? "Reading" : "Assessment";
      toast.success(`${typeLabel} lesson added`);
      setIsAddLessonModalOpen(false);
      setCurrentModuleId(null);
      fetchModules();
    } catch (error) {
      toast.error("Failed to add lesson");
    }
  };

  // --- Edit Lesson Logic ---
  const handleEditLesson = (lesson: any) => {
    setEditingLesson(lesson);
    setIsEditLessonModalOpen(true);
  };

  const handleSaveEditedLesson = async (
    id: string,
    title: string,
    description?: string,
    content?: string,
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
        "Delete this lesson? This will immediately remove it from student course content.",
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

  const handleReorderLessons = async (moduleId: string, lessons: any[]) => {
    // Optimistic update
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return { ...m, lessons };
        }
        return m;
      }),
    );

    try {
      const updates = lessons.map((l, index) => ({ id: l.id, order: index }));
      await courseApi.reorderLessons(updates);
    } catch (error) {
      toast.error("Failed to reorder lessons");
      fetchModules(); // Revert on error
    }
  };

  if (loading && modules.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Curriculum
          </h1>
          <p className="text-sm text-gray-500">
            Design your course structure with modules and lessons.
          </p>
        </div>
        <button
          onClick={handleAddModule}
          disabled={loading}
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
          Add Module
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <ModuleList
          modules={modules}
          onEditModule={handleEditModule}
          onDeleteModule={handleDeleteModule}
          onAddLesson={handleAddLesson}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleDeleteLesson}
          onReorderLessons={handleReorderLessons}
        />
      </div>

      <AddLessonModal
        isOpen={isAddLessonModalOpen}
        onClose={() => setIsAddLessonModalOpen(false)}
        onSave={handleSaveLesson}
      />

      <EditLessonModal
        isOpen={isEditLessonModalOpen}
        onClose={() => setIsEditLessonModalOpen(false)}
        onSave={handleSaveEditedLesson}
        lesson={editingLesson}
      />
    </div>
  );
};

export default CurriculumBuilder;

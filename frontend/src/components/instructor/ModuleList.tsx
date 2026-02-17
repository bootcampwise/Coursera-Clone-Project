import React from "react";
import LessonList from "./LessonList";

interface Lesson {
  id: string;
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  order: number;
  updatedAt?: string;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface ModuleListProps {
  modules: Module[];
  onEditModule: (module: Module) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string) => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  onReorderLessons: (moduleId: string, lessons: Lesson[]) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onEditModule,
  onDeleteModule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onReorderLessons,
}) => {
  return (
    <div className="space-y-6">
      {modules.map((module) => (
        <div
          key={module.id}
          className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 cursor-move">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                {module.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddLesson(module.id)}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors"
              >
                + Add Lesson
              </button>
              <button
                onClick={() => onEditModule(module)}
                className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDeleteModule(module.id)}
                className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <LessonList
            lessons={module.lessons}
            moduleId={module.id}
            onEdit={onEditLesson}
            onDelete={onDeleteLesson}
            onReorder={onReorderLessons}
          />
        </div>
      ))}
      {modules.length === 0 && (
        <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500">
            No modules yet. Create one to start building your curriculum.
          </p>
        </div>
      )}
    </div>
  );
};

export default ModuleList;

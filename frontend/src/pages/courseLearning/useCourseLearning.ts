import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import { enrollmentApi } from "../../services/enrollmentApi";
import type {
  Course,
  Module,
  Lesson as CourseLesson,
} from "../../types/course";
import type { Progress } from "../../types/index";

export interface LessonItem {
  id: string;
  title: string;
  type: string;
  duration?: number | null;
  status: "completed" | "in-progress" | "not-started";
  videoUrl?: string | null;
  content?: string | undefined;
}

export interface ModuleSection {
  id: string;
  title: string;
  lessons: LessonItem[];
  isExpanded: boolean;
  isComplete: boolean;
}

export const useCourseLearning = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [expandedSections, setExpandedSections] = useState<string[]>([
    "observe-crit",
  ]);
  const [isCourseMaterialOpen, setIsCourseMaterialOpen] = useState(true);
  const [isTopInfoOpen, setIsTopInfoOpen] = useState(true);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<Progress[] | null>(null);
  const [learningObjectives, setLearningObjectives] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        const [courseRes, progressRes] = await Promise.all([
          courseApi.getCourseById(courseId),
          enrollmentApi.getCourseProgress(courseId),
        ]);
        setCourse(courseRes);

        const lessonProgress = progressRes?.lessonProgress || [];
        const moduleProgress = progressRes?.moduleProgress || [];
        const flattenedProgress = [...lessonProgress, ...moduleProgress];
        setProgressData(flattenedProgress);

        const rawOutcomes = courseRes?.outcomes;
        if (Array.isArray(rawOutcomes)) {
          setLearningObjectives(rawOutcomes.filter(Boolean));
        } else if (typeof rawOutcomes === "string") {
          const split = rawOutcomes
            .split(/\r?\n|•|- /g)
            .map((s: string) => s.trim())
            .filter(Boolean);
          setLearningObjectives(split);
        } else {
          setLearningObjectives([]);
        }

        if (courseRes?.modules) {
          const firstUnfinished = courseRes.modules.find((m: Module) =>
            m.lessons.some(
              (l: CourseLesson) =>
                !(progressRes?.lessonProgress || []).some(
                  (p: any) => p.lessonId === l.id && p.completed
                )
            )
          );
          if (firstUnfinished) {
            setExpandedSections([firstUnfinished.id]);
          }
        }
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const isLessonCompleted = (lessonId: string) => {
    return progressData?.some(
      (p: Progress) => p.lessonId === lessonId && p.completed
    );
  };

  const getLessonStatus = (
    lessonId: string,
    index: number,
    allLessons: CourseLesson[]
  ) => {
    if (isLessonCompleted(lessonId)) return "completed";

    const prevLesson = allLessons[index - 1];
    if (!prevLesson || isLessonCompleted(prevLesson.id)) return "in-progress";

    return "not-started";
  };

  const sections: ModuleSection[] = (course?.modules || []).map(
    (module: Module) => {
      const moduleLessons = module.lessons.map(
        (lesson: CourseLesson, index: number) =>
          ({
            id: lesson.id,
            title: lesson.title,
            type: (lesson.type.charAt(0) +
              lesson.type.slice(1).toLowerCase()) as string,
            duration: lesson.duration ?? 0,
            status: getLessonStatus(lesson.id, index, module.lessons) as
              | "completed"
              | "in-progress"
              | "not-started",
            videoUrl: lesson.videoUrl ?? null,
            content: lesson.content,
          }) as LessonItem
      );

      const backendModuleProgress = progressData?.find(
        (p: Progress) => p.moduleId === module.id
      );
      const isComplete = backendModuleProgress
        ? backendModuleProgress.completed
        : moduleLessons.every((l) => l.status === "completed");

      return {
        id: module.id,
        title: module.title,
        lessons: moduleLessons,
        isExpanded: expandedSections.includes(module.id),
        isComplete,
      };
    }
  );

  return {
    courseId,
    course,
    loading,
    progressData,
    learningObjectives,
    sections,
    expandedSections,
    setExpandedSections,
    toggleSection,
    isCourseMaterialOpen,
    setIsCourseMaterialOpen,
    isTopInfoOpen,
    setIsTopInfoOpen,
    isObjectivesOpen,
    setIsObjectivesOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    navigate,
  };
};

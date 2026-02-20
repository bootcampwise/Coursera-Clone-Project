import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { courseApi } from "../../../services/courseApi";
import api from "../../../services/apiClient";
import type { Course, Module, Lesson } from "../../../types/course";

export interface LessonRow {
  id: string;
  title: string;
  moduleTitle: string;
  courseTitle?: string;
  duration?: number | null;
  videoUrl?: string | null;
  updatedAt?: string;
}

export const useInstructorVideos = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  const [embedUrls, setEmbedUrls] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<{
    [key: string]: "upload" | "embed";
  }>({});
  const [durationInputs, setDurationInputs] = useState<{
    [key: string]: string;
  }>({});

  const formatDurationInput = (seconds: number | null | undefined) => {
    if (!seconds || Number.isNaN(seconds)) return "";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const parseDurationInput = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (trimmed.includes(":")) {
      const [m, s] = trimmed.split(":");
      const mins = Number(m);
      const secs = Number(s);
      if (Number.isNaN(mins) || Number.isNaN(secs) || secs >= 60 || secs < 0)
        return null;
      return Math.max(0, mins * 60 + secs);
    }
    const asSeconds = Number(trimmed);
    if (Number.isNaN(asSeconds) || asSeconds < 0) return null;
    return Math.floor(asSeconds);
  };

  const getVideoDuration = (file: File): Promise<number | null> =>
    new Promise((resolve) => {
      const video = document.createElement("video");
      const objectUrl = URL.createObjectURL(file);
      const cleanup = () => {
        URL.revokeObjectURL(objectUrl);
        video.removeAttribute("src");
      };
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        const duration = Number.isFinite(video.duration)
          ? Math.floor(video.duration)
          : null;
        cleanup();
        resolve(duration);
      };
      video.onerror = () => {
        cleanup();
        resolve(null);
      };
      video.src = objectUrl;
    });

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
      const videoLessons: LessonRow[] = [];
      const course = courses.find((c) => c.id === selectedCourseId);
      const nextActiveTab: { [key: string]: "upload" | "embed" } = {};
      const nextEmbedUrls: { [key: string]: string } = {};
      const nextDurationInputs: { [key: string]: string } = {};

      if (module && module.lessons && Array.isArray(module.lessons)) {
        module.lessons.forEach((lesson: Lesson) => {
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
            nextActiveTab[lesson.id] = "upload";
            nextEmbedUrls[lesson.id] = lesson.videoUrl || "";
            nextDurationInputs[lesson.id] = formatDurationInput(
              lesson.duration
            );
          }
        });
      }

      setLessons(videoLessons);
      setActiveTab((prev) => ({ ...prev, ...nextActiveTab }));
      setEmbedUrls((prev) => ({ ...prev, ...nextEmbedUrls }));
      setDurationInputs((prev) => ({ ...prev, ...nextDurationInputs }));
    } catch (error) {
      toast.error("Failed to load lessons");
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

  const handleFileUpload = async (lessonId: string, file: File) => {
    setUploading((prev) => ({ ...prev, [lessonId]: true }));
    const toastId = toast.loading("Uploading video...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const durationSec = await getVideoDuration(file);
      const uploadResponse = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = uploadResponse.data.url;
      const payload: { videoUrl: string; duration?: number } = {
        videoUrl: fileUrl,
      };
      if (durationSec !== null) {
        payload.duration = durationSec;
        setDurationInputs((prev) => ({
          ...prev,
          [lessonId]: formatDurationInput(durationSec),
        }));
      }
      await courseApi.updateLesson(lessonId, payload);

      toast.success("Video uploaded successfully", { id: toastId });
      fetchLessons(selectedModuleId);
    } catch (error) {
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
      const durationSec = parseDurationInput(durationInputs[lessonId] || "");
      const payload: { videoUrl: string; duration?: number } = {
        videoUrl: url,
      };
      if (durationSec !== null) payload.duration = durationSec;
      await courseApi.updateLesson(lessonId, payload);
      toast.success("Video URL saved", { id: toastId });
      fetchLessons(selectedModuleId);
    } catch (error) {
      toast.error("Failed to save URL", { id: toastId });
    }
  };

  const handleDurationSave = async (lessonId: string) => {
    const durationSec = parseDurationInput(durationInputs[lessonId] || "");
    if (durationSec === null) {
      toast.error("Enter a valid duration (e.g., 540 or 9:00).");
      return;
    }
    const toastId = toast.loading("Saving duration...");
    try {
      await courseApi.updateLesson(lessonId, { duration: durationSec });
      toast.success("Duration saved", { id: toastId });
      fetchLessons(selectedModuleId);
    } catch (error) {
      toast.error("Failed to save duration", { id: toastId });
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
    uploading,
    embedUrls,
    setEmbedUrls,
    activeTab,
    setActiveTab,
    durationInputs,
    setDurationInputs,
    handleFileUpload,
    handleEmbedSave,
    handleDurationSave,
  };
};

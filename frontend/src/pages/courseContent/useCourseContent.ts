import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import { enrollmentApi } from "../../services/enrollmentApi";
import type { Course, Module, Lesson, Progress } from "../../types";

export const useCourseContent = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [progressData, setProgressData] = useState<{
    lessonProgress: Progress[];
    enrollmentId?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transcript" | "notes-downloads">(
    "transcript"
  );
  const [isCoachOpen, setIsCoachOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSavedTime = useRef<number>(0);

  const transcript = [
    {
      id: "t-001",
      startTime: 1,
      endTime: 38,
      text: "Welcome back. We're moments away from checking out an example of a crit session in action. A standard design critique session is at least 30 minutes, and the designer usually spends five to ten of those minutes presenting. But keep in mind, the session length will depend on the amount of feedback requested and the number of reviewers involved. We don't have time to share a full crit session with you. So the upcoming video is just a snapshot of what usually happens. In the mock crit session, I'll play the role of the presenter, sharing some of the mockups for the dog walker app with two colleagues who were the reviewers.",
    },
    {
      id: "t-002",
      startTime: 38,
      endTime: 78,
      text: "There will also be a facilitator guiding the flow of the interaction. While you've been working on your mockups throughout this course, so have I. The mockups I'll present in the design critique session are my current iteration of the dog walker app. As the presenter, I'll ask for feedback on two parts of this design, the scheduling flow and the call-to-action buttons. Remember, call-to-action buttons are elements in the design that tell the user to take action. In the dog walker app, the call-to-action buttons are labeled things like \"book appointment\" and \"next.\" You'll have a chance to watch how the flow of ideas and communication happens as I present my work and receive feedback.",
    },
    {
      id: "t-003",
      startTime: 78,
      endTime: 109,
      text: "As you watch, take note of how I, as the presenter, respond to the feedback I'm receiving. Ask yourself, is the presenter actively listening? Is the presenter taking notes? What types of follow-up questions is the presenter asking? You should also focus on the way that reviewers share their feedback and opinions. Ask yourself, do the reviewers share the reasoning behind their feedback? Do the reviewers focus on problems with the design instead of offering solutions?",
    },
    {
      id: "t-004",
      startTime: 109,
      endTime: 150,
      text: "Do the reviewers connect their feedback to the objectives of the design critique session? With these questions in mind, let's join the crit session. Meet you there.",
    },
  ];

  const currentLesson = course?.modules
    ?.flatMap((m: Module) => m.lessons)
    ?.find((l: Lesson) => l.id === lessonId);

  const isLessonCompleted = (id: string) => {
    return progressData?.lessonProgress?.some(
      (p: Progress) => p.lessonId === id && p.completed
    );
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const formatUpdatedAt = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (
      currentLesson?.type?.toLowerCase() === "reading" &&
      activeTab === "transcript"
    ) {
      setActiveTab("notes-downloads");
    }
  }, [currentLesson?.id, currentLesson?.type, activeTab]);

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
        setProgressData(progressRes);

        if (lessonId && courseRes?.modules) {
          const activeModule = courseRes.modules.find((m: Module) =>
            m.lessons.some((l: Lesson) => l.id === lessonId)
          );
          if (activeModule) {
            setExpandedModules([activeModule.id]);
          }
        }
      } catch (error) {
        // Fetch course data failed
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, lessonId]);

  useEffect(() => {
    if (
      currentLesson?.type?.toLowerCase() !== "video" ||
      !videoRef.current ||
      !progressData
    ) {
      return;
    }

    const lessonProgress = progressData.lessonProgress?.find(
      (p: Progress) => p.lessonId === lessonId
    );
    if (!lessonProgress?.lastPlayed || lessonProgress.lastPlayed <= 0) return;

    const videoEl = videoRef.current;
    const applyResume = () => {
      if (
        videoEl.currentTime < 1 &&
        typeof lessonProgress.lastPlayed === "number"
      ) {
        videoEl.currentTime = lessonProgress.lastPlayed;
      }
    };

    if (videoEl.readyState >= 1) {
      applyResume();
    } else {
      videoEl.addEventListener("loadedmetadata", applyResume);
    }

    return () => {
      videoEl.removeEventListener("loadedmetadata", applyResume);
    };
  }, [lessonId, progressData, currentLesson]);

  useEffect(() => {
    const markReadingComplete = async () => {
      if (
        lessonId &&
        currentLesson?.type?.toLowerCase() === "reading" &&
        progressData?.enrollmentId &&
        !isLessonCompleted(lessonId)
      ) {
        try {
          await enrollmentApi.updateLessonProgress(
            progressData.enrollmentId,
            lessonId!,
            { completed: true }
          );
          const newProgress = await enrollmentApi.getCourseProgress(courseId!);
          setProgressData(newProgress);
        } catch (err) {
          // Mark reading complete failed
        }
      }
    };
    markReadingComplete();
  }, [lessonId, progressData?.enrollmentId, currentLesson]);

  const handleTimeUpdate = async () => {
    if (!videoRef.current || !progressData?.enrollmentId || !lessonId) return;

    const currentTime = videoRef.current.currentTime;
    const currentTimeInt = Math.floor(currentTime);
    const duration = Math.floor(videoRef.current.duration);

    if (
      currentTimeInt !== lastSavedTime.current &&
      (currentTimeInt % 10 === 0 ||
        (duration > 0 && currentTimeInt >= duration - 1))
    ) {
      lastSavedTime.current = currentTimeInt;

      const isNearEnd = duration > 0 && currentTimeInt >= duration * 0.98;
      const alreadyCompleted = isLessonCompleted(lessonId);

      try {
        await enrollmentApi.updateLessonProgress(
          progressData.enrollmentId,
          lessonId!,
          {
            lastPlayed: currentTimeInt,
            completed:
              alreadyCompleted || isNearEnd || currentTimeInt >= duration - 1,
            videoDuration: duration,
          }
        );

        if (
          !alreadyCompleted &&
          (isNearEnd || currentTimeInt >= duration - 1)
        ) {
          const newProgress = await enrollmentApi.getCourseProgress(courseId!);
          setProgressData(newProgress);
        }
      } catch (err) {
        // Track progress failed
      }
    }
  };

  const handlePause = async () => {
    if (!videoRef.current || !progressData?.enrollmentId || !lessonId) return;
    const currentTimeInt = Math.floor(videoRef.current.currentTime);
    const duration = Math.floor(videoRef.current.duration || 0);

    try {
      await enrollmentApi.updateLessonProgress(
        progressData.enrollmentId,
        lessonId,
        { lastPlayed: currentTimeInt, videoDuration: duration || undefined }
      );
    } catch (err) {
      // Save pause progress failed
    }
  };

  const handleNext = async () => {
    if (!enrollmentApi || !progressData?.enrollmentId || !lessonId) return;

    try {
      if (!isLessonCompleted(lessonId)) {
        await enrollmentApi.updateLessonProgress(
          progressData.enrollmentId,
          lessonId,
          {
            completed: true,
            forceComplete: currentLesson?.type?.toLowerCase() === "reading",
          }
        );
      }

      const allLessons =
        course?.modules?.flatMap((m: Module) => m.lessons) || [];
      const currentIndex = allLessons.findIndex(
        (l: Lesson) => l.id === lessonId
      );

      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        if (nextLesson.type?.toLowerCase() === "assessment") {
          navigate(`/learn/${courseId}/assessment/${nextLesson.id}`);
        } else {
          navigate(`/learn/${courseId}/lecture/${nextLesson.id}`);
        }
        const newProgress = await enrollmentApi.getCourseProgress(
          courseId as string
        );
        setProgressData(newProgress);
      } else {
        navigate(`/learn/${courseId}`);
      }
    } catch (err) {
      // Update progress failed
    }
  };

  const handleVideoEnded = async () => {
    if (!progressData?.enrollmentId || !lessonId || !videoRef.current) return;
    const duration = Math.floor(videoRef.current.duration || 0);
    try {
      await enrollmentApi.updateLessonProgress(
        progressData.enrollmentId,
        lessonId!,
        {
          lastPlayed: duration,
          completed: true,
          videoDuration: duration || undefined,
        }
      );
      const newProgress = await enrollmentApi.getCourseProgress(
        courseId as string
      );
      setProgressData(newProgress);
    } catch (err) {
      // Video ended handling failed
    }
  };

  return {
    courseId,
    lessonId,
    course,
    currentLesson,
    progressData,
    setProgressData,
    loading,
    activeTab,
    setActiveTab,
    isCoachOpen,
    setIsCoachOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    videoRef,
    transcript,
    toggleModule,
    expandedModules,
    isLessonCompleted,
    formatUpdatedAt,
    handleTimeUpdate,
    handlePause,
    handleNext,
    handleVideoEnded,
    navigate,
  };
};

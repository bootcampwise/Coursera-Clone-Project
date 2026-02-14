import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import { enrollmentApi } from "../../services/enrollmentApi";
import CourseContentHeader from "../../components/layout/CourseContentHeader";
import { IMAGES } from "../../constants/images";

const CourseContent: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [progressData, setProgressData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transcript" | "notes-downloads">(
    "transcript",
  );
  const [isCoachOpen, setIsCoachOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const transcript: {
    id: string;
    startTime: number;
    endTime: number;
    text: string;
  }[] = [
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
    ?.flatMap((m: any) => m.lessons)
    ?.find((l: any) => l.id === lessonId);

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

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSavedTime = useRef<number>(0);

  const isLessonCompleted = (id: string) => {
    return progressData?.lessonProgress?.some(
      (p: any) => p.lessonId === id && p.completed,
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
        setProgressData(progressRes);

        
        if (lessonId && courseRes?.modules) {
          const activeModule = courseRes.modules.find((m: any) =>
            m.lessons.some((l: any) => l.id === lessonId),
          );
          if (activeModule) {
            setExpandedModules([activeModule.id]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch course data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, lessonId]);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  
  useEffect(() => {
    if (
      currentLesson?.type?.toLowerCase() !== "video" ||
      !videoRef.current ||
      !progressData
    ) {
      return;
    }

    const lessonProgress = progressData.lessonProgress?.find(
      (p: any) => p.lessonId === lessonId,
    );
    if (!lessonProgress?.lastPlayed || lessonProgress.lastPlayed <= 0) return;

    const videoEl = videoRef.current;
    const applyResume = () => {
      if (videoEl.currentTime < 1) {
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
            { completed: true },
          );
          const newProgress = await enrollmentApi.getCourseProgress(courseId!);
          setProgressData(newProgress);
        } catch (err) {
          console.error("Failed to mark reading as complete", err);
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
          },
        );

        
        if (
          !alreadyCompleted &&
          (isNearEnd || currentTimeInt >= duration - 1)
        ) {
          const newProgress = await enrollmentApi.getCourseProgress(courseId!);
          setProgressData(newProgress);
        }
      } catch (err) {
        console.error("Failed to track progress", err);
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
        { lastPlayed: currentTimeInt, videoDuration: duration || undefined },
      );
    } catch (err) {
      console.error("Failed to save pause progress", err);
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
          },
        );
      }

      const allLessons = course?.modules?.flatMap((m: any) => m.lessons) || [];
      const currentIndex = allLessons.findIndex((l: any) => l.id === lessonId);

      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        if (nextLesson.type?.toLowerCase() === "assessment") {
          navigate(`/learn/${courseId}/assessment/${nextLesson.id}`);
        } else {
          navigate(`/learn/${courseId}/lecture/${nextLesson.id}`);
        }
        const newProgress = await enrollmentApi.getCourseProgress(
          courseId as string,
        );
        setProgressData(newProgress);
      } else {
        navigate(`/learn/${courseId}`);
      }
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!loading && (!course || !currentLesson)) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Content unavailable
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          We couldn't find the course or lesson you were looking for. It might
          have been deleted by the instructor.
        </p>
        <button
          onClick={() => navigate("/my-learning")}
          className="px-8 py-3 bg-primary text-white font-bold rounded-[4px] hover:bg-primary-hover transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-dark-3">
      <CourseContentHeader
        onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      <div className="flex bg-white min-h-[calc(100vh-64px)] relative">
        {/* ================= LEFT SIDEBAR (Desktop & Mobile Drawer) ================= */}
        <aside
          className={`fixed lg:sticky top-[64px] h-[calc(100vh-64px)] bg-white border rounded-b-3xl lg:rounded-none border-gray-medium-4 overflow-y-auto flex flex-col shrink-0 custom-scrollbar z-40 transition-transform duration-300 ease-in-out
            ${isMobileSidebarOpen ? "translate-x-0 w-[300px] sm:w-[350px] shadow-xl" : "-translate-x-full lg:translate-x-0 w-[350px]"}
          `}
          style={{ left: 0 }}
        >
          {/* Top Course Title Block */}
          <div className="p-4 py-8 border-b border-gray-medium-4 sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start gap-3">
              <h2 className="text-[14px] font-bold text-black leading-snug">
                {course.title}
              </h2>
              <button
                onClick={() => navigate(`/learn/${courseId}`)}
                className="text-primary hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center font-bold text-[24px] leading-none shrink-0"
              >
                ×
              </button>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="flex-1 pb-10">
            {course.modules.map((module: any, index: number) => (
              <div key={module.id} className="border-b border-gray-medium-4">
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full flex items-center justify-between p-4 py-5 text-left hover:bg-surface ${
                    expandedModules.includes(module.id) ? "bg-surface" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] text-text-gray font-medium">
                        Module {index + 1}
                      </p>
                      <svg
                        className={`w-5 h-5 text-text-gray transition-transform ${
                          expandedModules.includes(module.id)
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <p
                      className={`text-[14px] mt-1 ${
                        expandedModules.includes(module.id)
                          ? "font-bold text-gray-dark-3"
                          : "font-medium text-shade-7"
                      }`}
                    >
                      {module.title}
                    </p>
                  </div>
                </button>

                {expandedModules.includes(module.id) && (
                  <div className="bg-white pb-2">
                    {module.lessons.map((lesson: any) => {
                      const isActive = lesson.id === lessonId;
                      const isComplete = isLessonCompleted(lesson.id);

                      return (
                        <Link
                          key={lesson.id}
                          to={
                            lesson.type?.toLowerCase() === "assessment"
                              ? `/learn/${courseId}/assessment/${lesson.id}`
                              : `/learn/${courseId}/lecture/${lesson.id}`
                          }
                          className={`flex items-start gap-3 p-4 py-4 cursor-pointer transition-colors ${
                            isActive
                              ? "bg-blue-light-2 relative"
                              : "hover:bg-surface"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary" />
                          )}
                          <div className="shrink-0 mt-0.5">
                            {isComplete ? (
                              <svg
                                className="w-[18px] h-[18px] text-success-dark-2"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            ) : (
                              <div className="w-[18px] h-[18px] border-2 border-gray-medium-4 rounded-full" />
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-[13px] leading-tight ${
                                isActive
                                  ? "text-primary font-bold"
                                  : "text-shade-7 font-normal"
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-[11px] text-text-gray font-medium">
                                {(lesson.type || "Lesson")
                                  .toString()
                                  .toLowerCase()
                                  .replace(/^./, (c: string) =>
                                    c.toUpperCase(),
                                  )}{" "}
                                {lesson.duration
                                  ? `${Math.floor(lesson.duration / 60)} min`
                                  : "5 min"}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar relative pb-32">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 md:py-8 md:px-12">
            {/* Title and Save Note - Above for Reading/Assessment, Below for Video */}
            {currentLesson.type?.toLowerCase() !== "video" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="min-w-0 flex-1">
                  <h1 className="text-[20px] sm:text-[24px] md:text-[28px] font-normal font-sans text-gray-dark-3 leading-tight pr-4 wrap-break-word">
                    {currentLesson.title}
                  </h1>
                  {currentLesson.updatedAt && (
                    <p className="mt-1 text-[11px] sm:text-[12px] text-text-gray">
                      Updated {formatUpdatedAt(currentLesson.updatedAt)}
                    </p>
                  )}
                </div>
                {currentLesson.type?.toLowerCase() !== "assessment" && (
                  <button className="flex items-center gap-2 text-primary font-bold text-[14px] hover:bg-blue-light-1 px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 border border-transparent hover:border-blue-light-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Save note
                  </button>
                )}
              </div>
            )}

            {/* Video / Content Player */}
            <div className="mb-6 md:mb-8 -mx-4 sm:mx-0">
              {currentLesson.type?.toLowerCase() === "video" ? (
                <div className="aspect-video bg-black sm:rounded-[8px] overflow-hidden shadow-lg">
                  {currentLesson.videoUrl ? (
                    currentLesson.videoUrl.includes("<iframe") ? (
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{
                          __html: currentLesson.videoUrl
                            .replace(/autoplay=1/g, "autoplay=0")
                            .replace(/autoplay/g, "autoplay=0"),
                        }}
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        src={currentLesson.videoUrl}
                        controls
                        className="w-full h-full"
                        onTimeUpdate={handleTimeUpdate}
                        onPause={handlePause}
                        onEnded={async () => {
                          if (
                            !progressData?.enrollmentId ||
                            !lessonId ||
                            !videoRef.current
                          ) {
                            return;
                          }
                          const duration = Math.floor(
                            videoRef.current.duration || 0,
                          );
                          try {
                            await enrollmentApi.updateLessonProgress(
                              progressData.enrollmentId,
                              lessonId!,
                              {
                                lastPlayed: duration,
                                completed: true,
                                videoDuration: duration || undefined,
                              },
                            );
                            const newProgress =
                              await enrollmentApi.getCourseProgress(
                                courseId as string,
                              );
                            setProgressData(newProgress);
                          } catch (err) {
                            console.error("Failed to complete video", err);
                          }
                        }}
                        autoPlay={false}
                        preload="metadata"
                      />
                    )
                  ) : (
                    <div className="relative w-full h-full group">
                      <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
                        alt="Video content"
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 cursor-pointer hover:scale-105 transition-transform">
                          <svg
                            className="w-10 h-10 text-white fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="prose prose-slate max-w-none text-gray-dark-3 leading-relaxed">
                  <div className="p-8 bg-gray-very-light-2 rounded-[8px] border border-gray-medium-4">
                    {currentLesson.content || "No content available."}
                  </div>
                </div>
              )}
            </div>

            {/* Title and Save Note - Below for Video */}
            {currentLesson.type?.toLowerCase() === "video" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="min-w-0 flex-1">
                  <h1 className="text-[20px] sm:text-[24px] md:text-[28px] font-normal font-sans text-gray-dark-3 leading-tight pr-4 wrap-break-word">
                    {currentLesson.title}
                  </h1>
                  {currentLesson.updatedAt && (
                    <p className="mt-1 text-[11px] sm:text-[12px] text-text-gray">
                      Updated {formatUpdatedAt(currentLesson.updatedAt)}
                    </p>
                  )}
                </div>
                <button className="flex items-center gap-2 text-primary font-bold text-[14px] hover:bg-blue-light-1 px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 border border-transparent hover:border-blue-light-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Save note
                </button>
              </div>
            )}

            {/* Coach AI Box - Only for Video Lessons */}
            {currentLesson.type?.toLowerCase() === "video" && (
              <div className="bg-bg-light-blue rounded-[16px] p-6 mb-12 border border-transparent hover:border-gray-medium-4 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[18px] font-serif italic text-shade-7 font-medium tracking-tight">
                    coach
                  </span>
                  <button
                    onClick={() => setIsCoachOpen((prev) => !prev)}
                    className="text-text-gray hover:bg-white/50 p-1 rounded-md"
                    aria-label="Toggle coach section"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform ${isCoachOpen ? "" : "-rotate-90"}`}
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                </div>
                {isCoachOpen && (
                  <>
                    <p className="text-[14px] text-gray-dark-3 mb-6 leading-relaxed">
                      Let me know if you have any questions about this material,
                      I&apos;m here to help!
                    </p>

                    {/* AI Prompts */}
                    <div className="flex flex-wrap gap-2 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                      {[
                        "Give me practice questions",
                        "Explain this topic in simple terms",
                        "Give me a summary",
                        "Give me real-life examples",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          className="flex items-center gap-2 bg-white border border-gray-medium-4 px-4 py-2.5 rounded-[8px] text-[13px] font-medium text-gray-dark-3 hover:bg-gray-very-light-2 shadow-sm transition-all active:scale-[0.98]"
                        >
                          <svg
                            className="w-4 h-4 text-primary"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                          </svg>
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Bottom Tabs: Transcript / Notes / Downloads - Only for Video Lessons */}
            {currentLesson.type?.toLowerCase() === "video" && (
              <>
                <div className="border-b border-gray-medium-4 mb-8 overflow-x-auto no-scrollbar">
                  <div className="flex gap-4 sm:gap-8 whitespace-nowrap min-w-max px-2">
                    {["Transcript", "Notes Downloads"].map((tab) => {
                      const slug =
                        tab === "Transcript" ? "transcript" : "notes-downloads";
                      if (
                        slug === "transcript" &&
                        currentLesson.type?.toLowerCase() !== "video"
                      ) {
                        return null;
                      }
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(slug)}
                          className={`pb-3 text-[14px] font-bold border-b-[3px] transition-all ${
                            activeTab === slug
                              ? "border-gray-dark-3 text-gray-dark-3"
                              : "border-transparent text-text-gray hover:text-gray-dark-3"
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content: Transcript - Only for Video Lessons */}
                {activeTab === "transcript" &&
                  currentLesson.type?.toLowerCase() === "video" && (
                    <div className="pb-32">
                      <div className="flex items-center gap-1 mb-8">
                        <span className="text-[13px] font-medium text-gray-dark-3">
                          Transcript language:
                        </span>
                        <div className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-dark-3 cursor-pointer">
                          <span className="text-[13px] font-medium text-gray-dark-3">
                            English
                          </span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>

                      <div className="space-y-1 w-full max-h-[600px] overflow-y-auto pr-4 no-scrollbar">
                        {transcript.length > 0 ? (
                          transcript.map((line) => (
                            <div
                              id={`transcript-line-${line.id}`}
                              key={line.id}
                              className="flex items-start gap-4 md:gap-10 group cursor-pointer p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-50 border-l-4 border-transparent"
                            >
                              <span className="text-[10px] sm:text-[11px] mt-1 shrink-0 font-mono w-8 sm:w-10 text-text-gray">
                                {Math.floor(line.startTime / 60)}:
                                {String(
                                  Math.floor(line.startTime % 60),
                                ).padStart(2, "0")}
                              </span>
                              <p className="text-[14px] leading-[1.6] text-text-gray group-hover:text-gray-dark-3">
                                {line.text}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 bg-gray-very-light-2 rounded-lg border border-dashed border-gray-medium-4">
                            <p className="text-text-gray">
                              Transcript not available for this lesson.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {/* Other Tab Contents (Placeholders) */}
                {activeTab === "notes-downloads" && (
                  <div className="pb-32">
                    <div className="p-8 text-center bg-gray-very-light-2 rounded-lg border border-dashed border-gray-medium-4">
                      <p className="text-text-gray">
                        Your notes and downloads for this lesson will appear
                        here.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navigation Bar */}
          <div
            className={`fixed bottom-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-medium-4 h-[72px] sm:h-[80px] p-2 px-4 sm:px-8 z-40 flex flex-col justify-center transition-all duration-300 ease-in-out
              ${isMobileSidebarOpen ? "left-0 lg:left-[350px]" : "left-0 lg:left-[350px]"}
            `}
          >
            <div className="flex items-center gap-4 text-[12px] sm:gap-6 sm:text-[13px] mb-2 sm:mb-3">
              <button className="flex items-center gap-1 text-primary cursor-pointer">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 10h4v10H2zM6 10l4-7h4a2 2 0 012 2v5h4l-3 10H6"
                  />
                </svg>
                Like
              </button>
              <button className="flex items-center gap-1 text-primary cursor-pointer">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 14h4V4H2zM6 14l4 7h4a2 2 0 002-2v-5h4l-3-10H6"
                  />
                </svg>
                Dislike
              </button>
              <button className="flex items-center gap-1 text-primary cursor-pointer">
                <img src={IMAGES.UI.REPORT_ICON} alt="" className="w-3 h-3" />
                Report an issue
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={
                  (currentLesson.type?.toLowerCase() === "assessment" &&
                    !isLessonCompleted(currentLesson.id)) ||
                  (currentLesson.type?.toLowerCase() === "video" &&
                    !isLessonCompleted(currentLesson.id))
                }
                className={`flex items-center gap-2 px-4 py-2 text-[12px] sm:px-5 sm:py-2.5 sm:text-[13px] lg:px-6 lg:text-[14px] rounded-[4px] font-bold transition-colors ${
                  isLessonCompleted(currentLesson.id)
                    ? "bg-primary text-white hover:bg-primary-hover"
                    : currentLesson.type?.toLowerCase() === "assessment" ||
                        currentLesson.type?.toLowerCase() === "video"
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white border border-primary text-primary hover:bg-blue-light-1"
                }`}
              >
                {isLessonCompleted(currentLesson.id)
                  ? "Go to next item"
                  : currentLesson.type?.toLowerCase() === "assessment"
                    ? "Locked (Pass to continue)"
                    : currentLesson.type?.toLowerCase() === "video"
                      ? "Go to next item"
                      : "Mark as completed"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseContent;



















































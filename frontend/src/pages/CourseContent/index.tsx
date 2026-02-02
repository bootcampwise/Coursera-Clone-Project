import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import { enrollmentApi } from "../../services/enrollmentApi";
import { transcriptApi } from "../../services/transcriptApi";
import type { TranscriptLine } from "../../services/transcriptApi";

const CourseContent: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  // State
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [progressData, setProgressData] = useState<any>(null);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "transcript" | "notes" | "downloads"
  >("transcript");

  // Derive current lesson from course data
  const currentLesson = course?.modules
    ?.flatMap((m: any) => m.lessons)
    ?.find((l: any) => l.id === lessonId);

  // Reset tab to "notes" if switching to a Reading lesson where Transcript is hidden
  useEffect(() => {
    if (
      currentLesson?.type?.toLowerCase() === "reading" &&
      activeTab === "transcript"
    ) {
      setActiveTab("notes");
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

        // Auto-expand the module containing the current lesson
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

  // Fetch transcript
  useEffect(() => {
    const fetchTranscript = async () => {
      if (lessonId && currentLesson?.type?.toLowerCase() === "video") {
        try {
          const data = await transcriptApi.getTranscript(lessonId);
          console.log(
            `✅ Transcript loaded for lesson ${lessonId}: ${data.length} lines`,
          );
          setTranscript(data);
        } catch (err) {
          console.error("Failed to fetch transcript", err);
          setTranscript([]); // Fallback to empty
        }
      } else {
        setTranscript([]);
      }
    };
    fetchTranscript();
  }, [lessonId, currentLesson]);

  // Sync transcript highlighting (Auto-scroll removed as requested)
  useEffect(() => {
    // Highlighting is handled via state and inline classes, no side-effect needed for scroll.
  }, [activeLineId]);

  // Resume playback logic
  useEffect(() => {
    if (
      currentLesson?.type?.toLowerCase() === "video" &&
      videoRef.current &&
      progressData
    ) {
      const lessonProgress = progressData.lessonProgress?.find(
        (p: any) => p.lessonId === lessonId,
      );
      if (
        lessonProgress?.lastPlayed > 0 &&
        videoRef.current.currentTime === 0
      ) {
        videoRef.current.currentTime = lessonProgress.lastPlayed;
      }
    }
  }, [lessonId, progressData, currentLesson]);

  // Auto-complete reading lessons on open
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

  // Throttled progress update
  const handleTimeUpdate = async () => {
    if (!videoRef.current || !progressData?.enrollmentId || !lessonId) return;

    const currentTime = videoRef.current.currentTime;
    const currentTimeInt = Math.floor(currentTime);
    const duration = Math.floor(videoRef.current.duration);

    // Sync active transcript line
    if (transcript.length > 0) {
      const activeLine = transcript.find(
        (line) => currentTime >= line.startTime && currentTime < line.endTime,
      );
      if (activeLine && activeLine.id !== activeLineId) {
        setActiveLineId(activeLine.id);
      } else if (!activeLine && activeLineId) {
        setActiveLineId(null);
      }
    }

    // Save every 10 seconds or when finished
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
          },
        );

        // If it was just completed, refresh progress data to update sidebar
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

  const handleNext = async () => {
    if (!enrollmentApi || !progressData?.enrollmentId || !lessonId) return;

    try {
      // Mark as completed if not already
      if (!isLessonCompleted(lessonId)) {
        await enrollmentApi.updateLessonProgress(
          progressData.enrollmentId,
          lessonId,
          { completed: true },
        );
      }

      const allLessons = course?.modules?.flatMap((m: any) => m.lessons) || [];
      const currentIndex = allLessons.findIndex((l: any) => l.id === lessonId);

      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        navigate(`/learn/${courseId}/lecture/${nextLesson.id}`);
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
  if (!course || !currentLesson)
    return <div className="p-10">Lesson not found</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      <CourseContentHeader />

      <div className="flex bg-[#f8f9fa] min-h-[calc(100vh-64px)] overflow-hidden">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-[350px] border-r border-[#dadce0] bg-white overflow-y-auto flex flex-col shrink-0 custom-scrollbar relative z-10 h-[calc(100vh-64px)]">
          {/* Top Course Title Block */}
          <div className="p-4 py-8 border-b border-[#dadce0] sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start gap-3">
              <h2 className="text-[14px] font-bold text-[#1f1f1f] leading-snug">
                {course.title}
              </h2>
              <button
                onClick={() => navigate(`/learn/${courseId}`)}
                className="text-[#0056D2] hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center font-bold text-[24px] leading-none shrink-0"
              >
                ×
              </button>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="flex-1 pb-10">
            {course.modules.map((module: any) => (
              <div key={module.id} className="border-b border-[#dadce0]">
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full flex items-center justify-between p-4 py-5 text-left hover:bg-[#f5f7f8] ${
                    expandedModules.includes(module.id) ? "bg-[#f5f7f8]" : ""
                  }`}
                >
                  <div>
                    <p className="text-[12px] text-[#5f6368] mb-1 font-medium">
                      Module {module.order || ""}
                    </p>
                    <p
                      className={`text-[14px] ${
                        expandedModules.includes(module.id)
                          ? "font-bold text-[#1f1f1f]"
                          : "font-medium text-[#3c4043]"
                      }`}
                    >
                      {module.title}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-[#5f6368] transition-transform ${
                      expandedModules.includes(module.id) ? "rotate-180" : ""
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
                              ? "bg-[#e8f0fe] relative"
                              : "hover:bg-[#f5f7f8]"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0056D2]" />
                          )}
                          <div className="shrink-0 mt-0.5">
                            {isComplete ? (
                              <svg
                                className="w-[18px] h-[18px] text-[#00814d]"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            ) : (
                              <div className="w-[18px] h-[18px] border-2 border-[#dadce0] rounded-full" />
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-[13px] leading-tight ${
                                isActive
                                  ? "text-[#0056D2] font-bold"
                                  : "text-[#3c4043] font-normal"
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              {lesson.type?.toLowerCase() === "video" ? (
                                <svg
                                  className="w-3.5 h-3.5 text-[#5f6368]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-3.5 h-3.5 text-[#5f6368]"
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
                              )}
                              <span className="text-[11px] text-[#5f6368] font-medium uppercase tracking-wider">
                                {lesson.type || "Lesson"} •{" "}
                                {lesson.duration
                                  ? `${Math.floor(lesson.duration / 60)}m`
                                  : "5m"}
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

          {/* Progress Indicator */}
          <div className="p-6 bg-white border-t border-[#dadce0] mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] font-bold text-[#1f1f1f]">
                Course Progress
              </span>
              <span className="text-[12px] font-bold text-[#1f1f1f]">
                {progressData?.progress || 0}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#e8f0fe] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0056D2] transition-all duration-500"
                style={{ width: `${progressData?.progress || 0}%` }}
              />
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar relative">
          <div className="max-w-[1000px] mx-auto px-6 py-8 md:px-12">
            {/* Title and Save Note - Above for Reading/Assessment, Below for Video */}
            {currentLesson.type?.toLowerCase() !== "video" && (
              <div className="flex items-start justify-between mb-8">
                <h1 className="text-[28px] font-normal font-sans text-[#1f1f1f] leading-tight">
                  {currentLesson.title}
                </h1>
                {currentLesson.type?.toLowerCase() !== "assessment" && (
                  <button className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px] hover:bg-[#f0f7ff] px-3 py-2 rounded-md transition-colors whitespace-nowrap">
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
            <div className="mb-8">
              {currentLesson.type?.toLowerCase() === "video" ? (
                <div className="aspect-video bg-black rounded-[8px] overflow-hidden shadow-lg">
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
                <div className="prose prose-slate max-w-none text-[#1f1f1f] leading-relaxed">
                  <div className="p-8 bg-[#f8f9fa] rounded-[8px] border border-[#dadce0]">
                    {currentLesson.content || "No content available."}
                  </div>
                </div>
              )}
            </div>

            {/* Title and Save Note - Below for Video */}
            {currentLesson.type?.toLowerCase() === "video" && (
              <div className="flex items-start justify-between mb-8">
                <h1 className="text-[28px] font-normal font-sans text-[#1f1f1f] leading-tight">
                  {currentLesson.title}
                </h1>
                <button className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px] hover:bg-[#f0f7ff] px-3 py-2 rounded-md transition-colors whitespace-nowrap">
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
              <div className="bg-[#f0f4f9] rounded-[16px] p-6 mb-12 border border-transparent hover:border-[#dadce0] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[18px] font-serif italic text-[#3c4043] font-medium tracking-tight">
                    coach
                  </span>
                  <button className="text-[#5f6368] hover:bg-white/50 p-1 rounded-md">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                </div>
                <p className="text-[14px] text-[#1f1f1f] mb-6 leading-relaxed">
                  Let me know if you have any questions about this material,
                  I&apos;m here to help!
                </p>

                {/* AI Prompts */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Give me practice questions",
                    "Explain this topic in simple terms",
                    "Give me a summary",
                    "Give me real-life examples",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      className="flex items-center gap-2 bg-white border border-[#dadce0] px-4 py-2.5 rounded-[8px] text-[13px] font-medium text-[#1f1f1f] hover:bg-[#f8f9fa] shadow-sm transition-all active:scale-[0.98]"
                    >
                      <svg
                        className="w-4 h-4 text-[#0056D2]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                      </svg>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Tabs: Transcript / Notes / Downloads - Only for Video Lessons */}
            {currentLesson.type?.toLowerCase() === "video" && (
              <>
                <div className="border-b border-[#dadce0] mb-8">
                  <div className="flex gap-8">
                    {["Transcript", "Notes", "Downloads"].map((tab) => {
                      const slug = tab.toLowerCase() as any;
                      // Only show Transcript tab for Video lessons
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
                              ? "border-[#1f1f1f] text-[#1f1f1f]"
                              : "border-transparent text-[#5f6368] hover:text-[#1f1f1f]"
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
                      <div className="flex items-center gap-3 mb-8">
                        <span className="text-[13px] font-medium text-[#1f1f1f]">
                          Transcript language:
                        </span>
                        <div className="relative inline-flex items-center border border-[#dadce0] rounded-md px-3 py-1.5 bg-white cursor-pointer hover:bg-[#f8f9fa]">
                          <span className="text-[13px] font-medium text-[#1f1f1f] mr-2">
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

                      <div className="space-y-8 max-w-[700px] max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                        {transcript.length > 0 ? (
                          transcript.map((line) => (
                            <div
                              id={`transcript-line-${line.id}`}
                              key={line.id}
                              className={`flex items-start gap-10 group cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                                activeLineId === line.id
                                  ? "bg-[#e8f0fe] border-l-4 border-[#0056D2] shadow-sm"
                                  : "hover:bg-gray-50 border-l-4 border-transparent"
                              }`}
                              onClick={() => {
                                if (videoRef.current) {
                                  videoRef.current.currentTime = line.startTime;
                                  videoRef.current.play();
                                }
                              }}
                            >
                              <span
                                className={`text-[11px] mt-1 shrink-0 font-mono w-10 ${
                                  activeLineId === line.id
                                    ? "text-[#0056D2] font-bold"
                                    : "text-[#5f6368]"
                                }`}
                              >
                                {Math.floor(line.startTime / 60)}:
                                {String(
                                  Math.floor(line.startTime % 60),
                                ).padStart(2, "0")}
                              </span>
                              <p
                                className={`text-[14px] leading-[1.6] ${
                                  activeLineId === line.id
                                    ? "text-[#1f1f1f] font-medium"
                                    : "text-[#5f6368] group-hover:text-[#1f1f1f]"
                                }`}
                              >
                                {line.text}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 bg-[#f8f9fa] rounded-lg border border-dashed border-[#dadce0]">
                            <p className="text-[#5f6368]">
                              Transcript not available for this lesson.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {/* Other Tab Contents (Placeholders) */}
                {activeTab === "notes" && (
                  <div className="p-8 text-center bg-[#f8f9fa] rounded-lg border border-dashed border-[#dadce0]">
                    <p className="text-[#5f6368]">
                      Your notes for this lesson will appear here.
                    </p>
                  </div>
                )}
                {activeTab === "downloads" && (
                  <div className="p-8 text-center bg-[#f8f9fa] rounded-lg border border-dashed border-[#dadce0]">
                    <p className="text-[#5f6368]">
                      Any downloadable resources will be listed here.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navigation Bar */}
          <div className="fixed bottom-0 right-0 left-[350px] bg-white/80 backdrop-blur-sm border-t border-[#dadce0] p-4 flex items-center justify-end px-12 z-40">
            <button
              onClick={handleNext}
              disabled={
                currentLesson.type?.toLowerCase() === "assessment" &&
                !isLessonCompleted(currentLesson.id)
              }
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[4px] font-bold text-[14px] transition-colors ${
                isLessonCompleted(currentLesson.id)
                  ? "bg-[#0056D2] text-white hover:bg-[#00419e]"
                  : currentLesson.type?.toLowerCase() === "assessment"
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white border border-[#0056D2] text-[#0056D2] hover:bg-[#f0f7ff]"
              }`}
            >
              {isLessonCompleted(currentLesson.id)
                ? "Go to next item"
                : currentLesson.type?.toLowerCase() === "assessment"
                  ? "Locked (Pass to continue)"
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
        </main>
      </div>
    </div>
  );
};

export default CourseContent;

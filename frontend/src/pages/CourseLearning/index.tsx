import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CourseLearningHeader from "../../components/layout/CourseLearningHeader";
import { courseApi } from "../../services/courseApi";
import { IMAGES } from "../../constants/images";
import { enrollmentApi } from "../../services/enrollmentApi";

interface Lesson {
  id: string;
  title: string;
  type: string;
  duration?: number;
  status: "completed" | "in-progress" | "not-started";
  videoUrl?: string;
  content?: string;
}

interface ModuleSection {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
  isComplete: boolean;
}

const CourseLearning: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  // Default expanded state to match screenshot
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "observe-crit",
  ]);
  const [isCourseMaterialOpen, setIsCourseMaterialOpen] = useState(true);
  const [isTopInfoOpen, setIsTopInfoOpen] = useState(true);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<any>(null);
  const [learningObjectives, setLearningObjectives] = useState<string[]>([]);

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
        // Normalize outcomes into a list for objectives rendering
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

        // Auto-expand the first unfinished module
        if (courseRes?.modules) {
          const firstUnfinished = courseRes.modules.find((m: any) =>
            m.lessons.some(
              (l: any) =>
                !progressRes?.lessonProgress.find(
                  (p: any) => p.lessonId === l.id && p.completed,
                ),
            ),
          );
          if (firstUnfinished) {
            setExpandedSections([firstUnfinished.id]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch course data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const isLessonCompleted = (lessonId: string) => {
    return progressData?.lessonProgress?.some(
      (p: any) => p.lessonId === lessonId && p.completed,
    );
  };

  const getLessonStatus = (
    lessonId: string,
    index: number,
    allLessons: any[],
  ) => {
    if (isLessonCompleted(lessonId)) return "completed";

    // If it's the first uncompleted lesson, mark as in-progress (next up)
    const prevLesson = allLessons[index - 1];
    if (!prevLesson || isLessonCompleted(prevLesson.id)) return "in-progress";

    return "not-started";
  };

  if (loading) return <div className="p-10">Loading course content...</div>;
  if (!loading && !course) {
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
          Course not found
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The course you're looking for might have been removed or you don't
          have access to it.
        </p>
        <button
          onClick={() => navigate("/my-learning")}
          className="px-8 py-3 bg-[#0056D2] text-white font-bold rounded-[4px] hover:bg-[#00419e] transition-colors"
        >
          Go to My Learning
        </button>
      </div>
    );
  }

  const sections: ModuleSection[] = course.modules.map((module: any) => {
    const moduleLessons = module.lessons.map((lesson: any, index: number) => ({
      id: lesson.id,
      title: lesson.title,
      type: lesson.type.charAt(0) + lesson.type.slice(1).toLowerCase(), // VIDEO -> Video
      duration: lesson.duration || 0, // Keep as number for now, format later
      status: getLessonStatus(lesson.id, index, module.lessons),
      videoUrl: lesson.videoUrl,
      content: lesson.content,
    }));

    const backendModuleProgress = progressData?.moduleProgress?.find(
      (m: any) => m.moduleId === module.id,
    );
    const isComplete = backendModuleProgress
      ? backendModuleProgress.completed
      : moduleLessons.every((l: any) => l.status === "completed");

    return {
      id: module.id,
      title: module.title,
      lessons: moduleLessons,
      isExpanded: expandedSections.includes(module.id),
      isComplete,
    };
  });

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      <CourseLearningHeader />

      <div className="flex">
        {/* Left Sidebar - Course Navigation */}
        <aside className="w-[300px] border-r border-[#dadce0] bg-white h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px] shrink-0 custom-scrollbar">
          <div className="p-4 pt-6">
            <div className="flex flex-col items-start text-left mb-10 ml-6">
              <div className="w-16 h-16 rounded-full shrink-0 overflow-hidden bg-white flex items-start justify-start mb-2">
                <img
                  src={IMAGES.LOGOS.GOOGLE_LOGO}
                  alt="Google"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="text-[13px] font-medium text-[#1f1f1f] leading-snug">
                  {course.title}
                </span>
                <span className="text-[12px] text-[#5f6368]">Google</span>
                <span className="text-[12px] text-[#5f6368]">
                  {course.instructor?.name || "Instructor"}
                </span>
              </div>
            </div>

            <div className="mb-3 ml-6">
              <button
                onClick={() => setIsCourseMaterialOpen((prev) => !prev)}
                className="flex items-center gap-2 w-full text-left bg-transparent border-none cursor-pointer"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-[#5f6368] transition-transform ${
                    isCourseMaterialOpen ? "" : "rotate-180"
                  }`}
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
                <h2 className="text-[12px] font-bold text-[#1f1f1f] uppercase tracking-wide">
                  Course Material
                </h2>
              </button>
            </div>

            {isCourseMaterialOpen && (
              <div className="relative pl-2 space-y-0">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`relative pl-8 py-2 rounded-[6px] mx-2 ${
                      section.isExpanded ? "bg-[#e8f0fe]" : ""
                    }`}
                  >
                    {section.isExpanded && (
                      <div className="absolute left-[6px] top-1 bottom-1 w-[3px] bg-[#0056D2] rounded-full" />
                    )}
                    {/* Module item */}
                    <div className="absolute left-[19px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white z-10 flex items-center justify-center">
                      {section.isComplete ? (
                        <div className="w-4 h-4 rounded-full bg-[#188038] flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#dadce0] bg-white"></div>
                      )}
                    </div>
                    <button
                      className={`text-left text-[14px] font-medium w-full truncate pl-2 ${
                        section.isExpanded ? "text-[#1f1f1f]" : "text-[#5f6368]"
                      }`}
                    >
                      Module {index + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-[#dadce0] space-y-1">
              {[
                {
                  label: "Grades",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6z",
                },
                {
                  label: "Notes",
                  icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                },
                {
                  label: "Discussion Forums",
                  icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
                },
                {
                  label: "Messages",
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
                {
                  label: "Course Info",
                  icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-[6px] hover:bg-[#f5f7f8] text-[#1f1f1f] transition-colors bg-transparent border-none cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-[#5f6368]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.icon}
                    />
                  </svg>
                  <span className="text-[14px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-w-0 bg-white">
          <div className="max-w-[610px] mx-auto mt-6 mb-16 px-8 py-8 border border-[#e6e9ef] rounded-[12px]">
            {/* Top Info Block */}
            <div className="mb-10">
              <div className="flex items-start gap-2 mb-4">
                <button
                  onClick={() => setIsTopInfoOpen((prev) => !prev)}
                  className="text-[#5f6368] hover:bg-[#f5f5f5] p-2 rounded-full -ml-2"
                  aria-label="Toggle section"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${
                      isTopInfoOpen ? "" : "-rotate-90"
                    }`}
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
                <div className="flex-1">
                  <h2 className="text-[20px] font-normal font-serif text-[#1f1f1f]">
                    {course.title}
                  </h2>
                </div>
              </div>

              {isTopInfoOpen && (
                <>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4 ml-10 text-[13px] text-[#5f6368]">
                    <div className="flex items-center gap-2">
                      <img
                        src={IMAGES.UI.VIDEO_ICON}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>18 min of videos left</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={IMAGES.UI.BOOK_ICON}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>2 min of readings left</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={IMAGES.UI.GRADE_ICON}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>1 graded assessment left</span>
                    </div>
                  </div>

                  <div className="h-px bg-[#cfd4dc] my-5 -mx-8"></div>

                  <div className="text-[14px] text-[#1f1f1f] leading-loose mb-4">
                    <p>{course.description}</p>
                  </div>

                  <button
                    onClick={() => setIsObjectivesOpen((prev) => !prev)}
                    className="text-[14px] text-[#266ED8] font-bold flex items-center gap-1 ml-6  hover:underline bg-transparent border-none cursor-pointer p-0"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${
                        isObjectivesOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    Show Learning Objectives
                  </button>
                  {isObjectivesOpen && learningObjectives.length > 0 && (
                    <div className="mt-4 ml-6 space-y-2 text-[14px] text-[#1f1f1f]">
                      {learningObjectives.map((item, idx) => (
                        <div key={`${item}-${idx}`} className="flex gap-2">
                          <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[#1f1f1f]"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sections List */}
            <div className="space-y-4">
              {sections.map((section) => {
                const isExpanded = expandedSections.includes(section.id);
                return (
                  <div key={section.id} className="">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between py-2 bg-transparent border-none cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <svg
                          className={`w-4 h-4 text-[#5f6368] transition-transform ${isExpanded ? "" : "-rotate-90"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[16px] font-normal text-[#1A1C1F] group-hover:text-[#0056D2] transition-colors">
                          {section.title}
                        </span>
                      </div>
                      {section.isComplete && (
                        <div className="flex items-center gap-1 text-[#188038] bg-[#e6f4ea] px-2 py-0.5 rounded text-[12px] font-bold uppercase tracking-wider">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Complete
                        </div>
                      )}
                    </button>

                    {/* Lessons List */}
                    {isExpanded && (
                      <div className="mt-2 ml-8 pl-4 space-y-6">
                        {section.lessons.map((lesson) => (
                          <div key={lesson.id} className="relative group">
                            <Link
                              to={
                                lesson.type?.toLowerCase() === "assessment"
                                  ? `/learn/${courseId}/assessment/${lesson.id}`
                                  : `/learn/${courseId}/lecture/${lesson.id}`
                              }
                              className="block"
                            >
                              <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="mt-1 shrink-0">
                                  {lesson.status === "completed" ? (
                                    <div className="w-8 h-8 rounded-full bg-[#188038] flex items-center justify-center text-white">
                                      <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="3"
                                      >
                                        <path d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                                      <img
                                        src={
                                          lesson.type === "Video"
                                            ? IMAGES.UI.VIDEO_LESSON_PLAYER
                                            : lesson.type === "Reading"
                                              ? IMAGES.UI.READING_ARTICLE_ICON
                                              : IMAGES.UI.ASSESSMENT_ICON
                                        }
                                        alt=""
                                        className="w-8 h-8 object-contain"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Content */}
                                <div
                                  className={`flex-1 ${lesson.status === "in-progress" ? "pr-28 relative" : ""}`}
                                >
                                  <p
                                    className={`text-[14px] ${lesson.status === "in-progress" ? "font-bold" : "font-normal"} text-[#1f1f1f] mb-1 group-hover:text-[#0056D2] cursor-pointer`}
                                  >
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 text-[12px] text-[#5f6368]">
                                    <span>
                                      {lesson.type} •{" "}
                                      {lesson.duration
                                        ? `${Math.floor(lesson.duration / 60)} min`
                                        : "5 min"}
                                    </span>
                                  </div>

                                  {lesson.status === "in-progress" && (
                                    <div className="absolute right-0 top-0">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (
                                            lesson.type?.toLowerCase() ===
                                            "assessment"
                                          ) {
                                            navigate(
                                              `/learn/${courseId}/assessment/${lesson.id}`,
                                              {
                                                state: {
                                                  assessmentStarted: true,
                                                },
                                              },
                                            );
                                          } else {
                                            navigate(
                                              `/learn/${courseId}/lecture/${lesson.id}`,
                                            );
                                          }
                                        }}
                                        className="bg-[#0056D2] text-white px-5 py-2 rounded-[6px] font-normal text-[13px] hover:bg-[#00419e] transition-colors"
                                      >
                                        {lesson.type === "Assessment"
                                          ? "Start"
                                          : "Resume"}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Info Cards */}
        <aside className="w-[320px] bg-white h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px] p-6 pr-8 hidden lg:block">
          {/* Learning Plan */}
          <div className="rounded-[8px] border border-[#e1e1e1] p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <h3 className="font-bold text-[16px] text-[#1f1f1f] mb-3">
              Learning plan
            </h3>
            <p className="text-[14px] text-[#1f1f1f] mb-5 leading-relaxed">
              You&apos;re on track with your 6-day learning plan this week. Keep
              up the excellent work!
            </p>
            <div className="flex justify-between items-center mb-5 px-1">
              {["M", "T", "W", "T", "F", "S", "S"].slice(0, 6).map((day, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    i < 6
                      ? "bg-[#1f8354] text-white"
                      : "bg-transparent text-[#5f6368]"
                  }`}
                >
                  {i < 6 ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    day
                  )}
                </div>
              ))}
            </div>
            <button className="text-[14px] font-bold text-[#0056D2] hover:underline bg-transparent border-none cursor-pointer p-0">
              Edit my learning plan
            </button>
          </div>

          {/* Course Timeline */}
          <div className="rounded-[8px] bg-[#f2f8ff] border border-[#d4e4f7] p-5">
            <h3 className="font-bold text-[16px] text-[#1f1f1f] mb-2">
              Course timeline
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[12px] font-bold text-[#1f8354] bg-[#e6f4ea] px-2 py-0.5 rounded">
                Right on schedule!
              </span>
            </div>
            <p className="text-[14px] text-[#1f1f1f] mb-6 leading-relaxed">
              You&apos;re making great progress! Keep this momentum going and
              you&apos;ll meet your deadlines and estimated end date.
            </p>

            <div className="relative pl-4 space-y-6">
              {/* Vertical Dashed Line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-[1.5px] border-l-2 border-dashed border-[#0056D2]/30"></div>

              {/* Start Date */}
              <div className="relative pl-6">
                <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#5f6368] bg-white z-10"></div>
                <p className="text-[12px] text-[#5f6368] font-medium">
                  Start date: August 10, 2025
                </p>
              </div>

              {/* Deadlines */}
              <div className="relative pl-6">
                <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0056D2] z-10 box-content ring-4 ring-[#f2f8ff]"></div>
                <p className="text-[14px] text-[#1f1f1f] font-bold mb-3">
                  Your next two deadlines
                </p>

                <div className="space-y-3">
                  <div className="bg-white rounded-[8px] border border-[#dadce0] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[14px] font-bold text-[#0056D2] hover:underline cursor-pointer">
                        Module 3 Challenge
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] bg-[#f5f5f5] text-[#5f6368] px-1.5 py-0.5 rounded font-medium">
                        Graded Assignment
                      </span>
                      <span className="text-[12px] text-[#5f6368]">
                        Due in 2 days
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-[8px] border border-[#dadce0] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[14px] font-bold text-[#0056D2] hover:underline cursor-pointer">
                        Module 4 Challenge
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] bg-[#f5f5f5] text-[#5f6368] px-1.5 py-0.5 rounded font-medium">
                        Graded Assignment
                      </span>
                      <span className="text-[12px] text-[#5f6368]">
                        Due in 9 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated End Date */}
              <div className="relative pl-6">
                <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#5f6368] bg-white z-10"></div>
                <p className="text-[12px] text-[#5f6368] font-medium">
                  Estimated end date: November 15, 2025
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseLearning;





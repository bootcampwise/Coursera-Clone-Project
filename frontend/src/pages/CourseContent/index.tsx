import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CourseContentHeader from "../../components/layout/CourseContentHeader";
import { courseApi } from "../../services/courseApi";
import { enrollmentApi } from "../../services/enrollmentApi";

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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "transcript" | "notes" | "downloads"
  >("transcript");

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

  const currentLesson = course?.modules
    ?.flatMap((m: any) => m.lessons)
    ?.find((l: any) => l.id === lessonId);

  const isLessonCompleted = (id: string) => {
    return progressData?.lessonProgress?.some(
      (p: any) => p.lessonId === id && p.completed,
    );
  };

  const handleNext = async () => {
    if (!enrollmentApi || !progressData?.enrollmentId || !lessonId) return;

    try {
      await enrollmentApi.updateLessonProgress(
        progressData.enrollmentId,
        lessonId,
        { completed: true, lastPlayed: 0 },
      );

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
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
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
                          to={`/learn/${courseId}/lecture/${lesson.id}`}
                          className={`flex items-start gap-3 p-4 py-4 cursor-pointer transition-colors ${
                            isActive
                              ? "bg-[#e8f0fe] relative"
                              : "hover:bg-[#f5f7f8]"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0056D2]"></div>
                          )}

                          <div className="mt-0.5">
                            {isComplete ? (
                              <svg
                                className="w-5 h-5 text-[#188038]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <div
                                className={`w-5 h-5 rounded-full border-2 bg-white ${
                                  isActive
                                    ? "border-[#0056D2]"
                                    : "border-[#dadce0]"
                                }`}
                              ></div>
                            )}
                          </div>

                          <div className="flex-1">
                            <p
                              className={`text-[14px] leading-snug ${
                                isActive
                                  ? "font-bold text-[#1f1f1f]"
                                  : "text-[#3c4043]"
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-1.5 text-[12px] text-[#5f6368] mt-1.5">
                              {lesson.type?.toLowerCase() === "video" ? (
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              ) : (
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                </svg>
                              )}
                              <span>
                                {lesson.type} • {lesson.duration || 5} min
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

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar relative">
          <div className="max-w-[1000px] mx-auto px-6 py-8 md:px-12">
            {/* Video / Content Player */}
            <div className="mb-8">
              {currentLesson.type?.toLowerCase() === "video" ? (
                <div className="aspect-video bg-black rounded-[8px] overflow-hidden shadow-lg">
                  {currentLesson.videoUrl ? (
                    currentLesson.videoUrl.includes("<iframe") ? (
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{
                          __html: currentLesson.videoUrl,
                        }}
                      />
                    ) : (
                      <video
                        src={currentLesson.videoUrl}
                        controls
                        className="w-full h-full"
                      />
                    )
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
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

            {/* Title and Save Note */}
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

            {/* Coach AI Box */}
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

            {/* Bottom Tabs: Transcript / Notes / Downloads */}
            <div className="border-b border-[#dadce0] mb-8">
              <div className="flex gap-8">
                {["Transcript", "Notes", "Downloads"].map((tab) => {
                  const slug = tab.toLowerCase() as any;
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

            {/* Tab Content: Transcript */}
            {activeTab === "transcript" && (
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

                <div className="space-y-8 max-w-[700px]">
                  <div className="flex items-start gap-10 group">
                    <span className="text-[11px] text-[#5f6368] mt-1 shrink-0 font-mono w-10">
                      0:01
                    </span>
                    <p className="text-[14px] text-[#1f1f1f] leading-[1.6]">
                      Welcome back. We&apos;re moments away from checking out an
                      example of a crit session in action. A standard design
                      critique session is at least 30 minutes, and the designer
                      usually spends five to ten of those minutes presenting.
                      But keep in mind, the session length will depend on the
                      amount of feedback requested and the number of reviewers
                      involved. We don&apos;t have time to share a full crit
                      session with you. So the upcoming video is just a snapshot
                      of what usually happens. In the mock crit session,
                      I&apos;ll play the role of the presenter, sharing some of
                      the mockups for the dog walker app with two colleagues who
                      were the reviewers.
                    </p>
                  </div>

                  <div className="flex items-start gap-10 group">
                    <span className="text-[11px] text-[#5f6368] mt-1 shrink-0 font-mono w-10">
                      0:38
                    </span>
                    <div>
                      <p className="text-[14px] text-[#1f1f1f] leading-[1.6] mb-4">
                        There will also be a facilitator guiding the flow of the
                        interaction. While you&apos;ve been working on your
                        mockups throughout this course, so have I.{" "}
                        <span className="bg-[#e6f4ea] border-b border-[#188038]/30">
                          The mockups I&apos;ll present in the design critique
                          session are my current iteration of the dog walker
                          app.
                        </span>{" "}
                        As the presenter, I&apos;ll ask for feedback on two
                        parts of this design, the scheduling flow and the
                        call-to-action buttons. Remember, call-to-action buttons
                        are elements in the design that tell the user to take
                        action. In the dog walker app, the call-to-action
                        buttons are labeled things like &quot;book
                        appointment&quot; and &quot;next.&quot; You&apos;ll have
                        a chance to watch how the flow of ideas and
                        communication happens as I present my work and receive
                        feedback.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-10 group">
                    <span className="text-[11px] text-[#5f6368] mt-1 shrink-0 font-mono w-10">
                      1:18
                    </span>
                    <p className="text-[14px] text-[#1f1f1f] leading-[1.6]">
                      As you watch, take note of how I, as the presenter,
                      respond to the feedback I&apos;m receiving. Ask yourself,
                      is the presenter actively listening? Is the presenter
                      taking notes? What types of follow-up questions is the
                      presenter asking? You should also focus on the way that
                      reviewers share their feedback and opinions. Ask yourself,
                      do the reviewers share the reasoning behind their
                      feedback? Do the reviewers focus on problems with the
                      design instead of offering solutions?
                    </p>
                  </div>
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
                  Downloadable resources for this lesson.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Floating AI / Tool Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#dadce0] p-1.5 flex items-center gap-1">
            <div className="flex items-center gap-1 px-2 border-r border-gray-200">
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-[#0056D2]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0V12m-3-1V5m3 6V3.5a1.5 1.5 0 113 0V11m-3-1V2a1.5 1.5 0 113 0v11m-3-1c.142.14.772.635 1.256 1.12l4.89 4.89a2 2 0 010 2.828l-.172.172a2 2 0 01-2.828 0l-4.242-4.242-1-1" />
                </svg>
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
            <button className="bg-[#0056D2] text-white px-5 py-2 rounded-full font-bold text-[14px] hover:bg-[#00419e] transition-colors shadow-sm ml-1">
              Ask to edit
            </button>
            <div className="flex items-center gap-1 pl-1 pr-2 border-l border-gray-200 ml-1">
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Simple Footer / Next Button */}
        <div className="fixed bottom-0 right-0 left-[350px] bg-white/80 backdrop-blur-sm border-t border-[#dadce0] p-4 flex items-center justify-end px-12 z-40">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-white border border-[#0056D2] text-[#0056D2] px-6 py-2.5 rounded-[4px] font-bold text-[14px] hover:bg-[#f0f7ff] transition-colors"
          >
            Go to next item
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
    </div>
  );
};

export default CourseContent;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseLearningHeader from "../../components/layout/CourseLearningHeader";

interface Lesson {
  id: string;
  title: string;
  type:
    | "Video"
    | "Reading"
    | "Ungraded Plugin"
    | "Graded Practice Assignment"
    | "Practice Assignment";
  duration?: string;
  status: "completed" | "in-progress" | "not-started";
  grade?: number;
}

interface ModuleSection {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
  isComplete: boolean;
}

const CourseLearning: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  // Default expanded state to match screenshot
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "observe-crit",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const modules = [
    { id: "1", title: "Module 1", status: "completed" },
    { id: "2", title: "Module 2", status: "completed" },
    { id: "3", title: "Module 3", status: "in-progress" },
    { id: "4", title: "Module 4", status: "not-started" },
  ];

  const sections: ModuleSection[] = [
    {
      id: "participating",
      title: "Participating in design critique sessions",
      isExpanded: false,
      isComplete: false,
      lessons: [], // This is the header section in the design, handled separately in main
    },
    {
      id: "give-feedback",
      title: "Give and receive design feedback",
      isExpanded: false,
      isComplete: true,
      lessons: [
        {
          id: "1",
          title: "Give and receive feedback as a UX designer",
          type: "Video",
          duration: "5 min",
          status: "completed",
        },
        {
          id: "2",
          title: "Practice giving and receiving design feedback",
          type: "Ungraded Plugin",
          duration: "15 min",
          status: "completed",
        },
      ],
    },
    {
      id: "explore-crit",
      title: "Explore design critique sessions",
      isExpanded: false,
      isComplete: true,
      lessons: [
        {
          id: "3",
          title: "The basics of design critique sessions",
          type: "Video",
          duration: "3 min",
          status: "completed",
        },
        {
          id: "4",
          title: "Best practices for design critique sessions",
          type: "Video",
          duration: "3 min",
          status: "completed",
        },
        {
          id: "5",
          title: "Learn more about design critique sessions",
          type: "Reading",
          duration: "4 min",
          status: "completed",
        },
        {
          id: "6",
          title: "Test your knowledge on design critique sessions",
          type: "Graded Practice Assignment",
          status: "completed",
          grade: 100,
        },
        {
          id: "7",
          title: "Kunal - My experience with design critique sessions",
          type: "Video",
          duration: "3 min",
          status: "completed",
        },
        {
          id: "8",
          title: "Self-Reflection: Request feedback on your work",
          type: "Graded Practice Assignment",
          status: "completed",
          grade: 100,
        },
      ],
    },
    {
      id: "observe-crit",
      title: "Observe a mock crit session",
      isExpanded: true,
      isComplete: false,
      lessons: [
        {
          id: "9",
          title: "Introduction to a mock crit session",
          type: "Video",
          duration: "2 min",
          status: "completed",
        },
        {
          id: "10",
          title: "Observe a mock crit session",
          type: "Video",
          duration: "5 min",
          status: "not-started",
        },
      ],
    },
    {
      id: "implement-feedback",
      title: "Implement feedback from crit sessions",
      isExpanded: false,
      isComplete: false,
      lessons: [
        {
          id: "11",
          title: "Turn crit session feedback into actions",
          type: "Video",
          duration: "5 min",
          status: "not-started",
        },
        {
          id: "12",
          title: "Iterate on mockups based on feedback from crit sessions",
          type: "Video",
          duration: "4 min",
          status: "not-started",
        },
        {
          id: "13",
          title:
            "Test your knowledge on implementing feedback from crit sessions",
          type: "Practice Assignment",
          duration: "30 min",
          status: "not-started",
        },
      ],
    },
    {
      id: "module-review",
      title: "Module 3 Review",
      isExpanded: false,
      isComplete: false,
      lessons: [
        {
          id: "14",
          title: "Iterate on mockups based on feedback from crit sessions",
          type: "Video",
          duration: "4 min",
          status: "not-started",
        },
        {
          id: "15",
          title: "Learn more about design critique sessions",
          type: "Reading",
          duration: "4 min",
          status: "not-started",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      <CourseLearningHeader />

      <div className="flex">
        {/* Left Sidebar - Course Navigation */}
        <aside className="w-[300px] border-r border-[#dadce0] bg-white h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px] shrink-0 custom-scrollbar">
          <div className="p-4 pt-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-[4px] shrink-0 overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                  className="w-full h-full object-contain p-1 bg-white border border-[#dadce0]"
                />
              </div>
              <div>
                <h1 className="text-[14px] font-bold text-[#1f1f1f] leading-tight mb-1">
                  Build Dynamic User Interfaces (UI) for Websites
                </h1>
                <p className="text-[12px] text-[#5f6368]">Google</p>
              </div>
            </div>

            <div className="mb-4">
              <button className="flex items-center justify-between w-full text-left bg-transparent border-none cursor-pointer">
                <h2 className="text-[12px] font-bold text-[#1f1f1f] uppercase tracking-wide">
                  Course Material
                </h2>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#5f6368]"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            </div>

            <div className="relative pl-4 space-y-0">
              {/* Vertical line connector */}
              <div className="absolute left-[27px] top-2 bottom-6 w-[2px] bg-[#dadce0]"></div>

              {modules.map((module, index) => (
                <div key={module.id} className="relative pl-8 py-2">
                  {/* Module item */}
                  <div className="absolute left-[19px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white z-10 flex items-center justify-center">
                    {module.status === "completed" ? (
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
                    ) : module.id === "3" ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#1f1f1f] bg-white"></div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#dadce0] bg-white"></div>
                    )}
                  </div>
                  <button
                    className={`text-left text-[14px] font-medium w-full truncate pl-2 ${module.id === "3" ? "font-bold" : ""}`}
                  >
                    {module.title}
                  </button>
                  {module.id === "3" && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0056D2] rounded-r"></div>
                  )}
                </div>
              ))}
            </div>

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
          <div className="max-w-[800px] mx-auto px-8 py-8">
            {/* Top Info Block */}
            <div className="mb-10 border-b border-[#dadce0] pb-8">
              <div className="flex justify-between items-start mb-4">
                <button className="text-[#5f6368] hover:bg-[#f5f5f5] p-2 rounded-full -ml-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
              </div>

              <h2 className="text-[24px] font-normal font-serif text-[#1f1f1f] mb-4">
                Participating in design critique sessions
              </h2>
              <div className="flex flex-wrap items-center gap-6 mb-4 text-[13px] text-[#1f1f1f]">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                      strokeWidth="2"
                    />
                    <path d="M8 21h8" strokeWidth="2" />
                    <path d="M12 17v4" strokeWidth="2" />
                  </svg>
                  <span>18 min of videos left</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span>2 min of readings left</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>1 graded assessment left</span>
                </div>
              </div>

              <div className="text-[14px] text-[#1f1f1f] leading-loose mb-4">
                <p>
                  After you&apos;ve empathized with users, defined the user
                  problem to solve, and begun to ideate possible solutions,
                  it&apos;s time to bring your ideas to life in wireframes. Your
                  responsive website will have different layouts, depending on
                  the device and...
                </p>
              </div>

              <button className="text-[14px] text-[#0056D2] font-bold flex items-center gap-1 hover:underline bg-transparent border-none cursor-pointer p-0">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                Show Learning Objectives
              </button>
            </div>

            {/* Sections List */}
            <div className="space-y-4">
              {sections.slice(1).map((section) => {
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
                        <span className="text-[16px] font-bold text-[#1f1f1f] group-hover:text-[#0056D2] transition-colors">
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
                      <div className="mt-2 ml-8 pl-4 border-l border-[#dadce0] space-y-6">
                        {section.lessons.map((lesson) => (
                          <div key={lesson.id} className="relative group">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className="mt-1 shrink-0">
                                {lesson.status === "completed" ? (
                                  <div className="w-6 h-6 rounded-full bg-[#188038] flex items-center justify-center text-white">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      strokeWidth="3"
                                    >
                                      <path d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full border-2 border-[#1f1f1f] bg-white flex items-center justify-center text-[#1f1f1f]">
                                    {lesson.type === "Video" && (
                                      <svg
                                        className="w-3 h-3 ml-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                      </svg>
                                    )}
                                    {lesson.type === "Reading" && (
                                      <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                      </svg>
                                    )}
                                    {lesson.type.includes("Assignment") && (
                                      <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M9 11l3 3L22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                      </svg>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <p
                                  className={`text-[14px] ${lesson.status === "in-progress" ? "font-bold" : "font-normal"} text-[#1f1f1f] mb-1 group-hover:text-[#0056D2] cursor-pointer`}
                                >
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 text-[12px] text-[#5f6368]">
                                  {lesson.type === "Video" && (
                                    <span>Video • {lesson.duration}</span>
                                  )}
                                  {lesson.type === "Reading" && (
                                    <span>Reading • {lesson.duration}</span>
                                  )}
                                  {lesson.type === "Ungraded Plugin" && (
                                    <span>
                                      Ungraded Plugin • {lesson.duration}
                                    </span>
                                  )}
                                  {lesson.type ===
                                    "Graded Practice Assignment" && (
                                    <>
                                      <span className="bg-[#e6f4ea] text-[#1e8e3e] px-1 rounded font-bold uppercase text-[10px] tracking-wide">
                                        Graded
                                      </span>
                                      <span>
                                        Practice Assessment • Submitted
                                      </span>
                                    </>
                                  )}
                                  {lesson.grade && (
                                    <span>• Grade: {lesson.grade}%</span>
                                  )}
                                </div>

                                {lesson.status === "in-progress" &&
                                  lesson.title ===
                                    "Introduction to a mock crit session" && (
                                    <div className="mt-3">
                                      <button className="bg-[#0056D2] text-white px-6 py-2 rounded-[4px] font-bold text-[14px] hover:bg-[#00419e] transition-colors">
                                        Resume
                                      </button>
                                    </div>
                                  )}
                              </div>
                            </div>
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

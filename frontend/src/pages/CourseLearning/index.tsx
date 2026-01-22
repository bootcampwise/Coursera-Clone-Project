import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseLearningHeader from "../../components/layout/CourseLearningHeader";

interface Lesson {
  id: string;
  title: string;
  type: "Video" | "Reading" | "Ungraded Plugin" | "Graded Practice Assignment" | "Practice Assignment";
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
  const [expandedSections, setExpandedSections] = useState<string[]>(["observe-crit"]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
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
      id: "give-feedback",
      title: "Give and receive design feedback",
      isExpanded: false,
      isComplete: true,
      lessons: [
        { id: "1", title: "Give and receive feedback as a UX designer", type: "Video", duration: "5 min", status: "completed" },
        { id: "2", title: "Practice giving and receiving design feedback", type: "Ungraded Plugin", duration: "15 min", status: "completed" },
      ],
    },
    {
      id: "explore-crit",
      title: "Explore design critique sessions",
      isExpanded: false,
      isComplete: true,
      lessons: [
        { id: "3", title: "The basics of design critique sessions", type: "Video", duration: "3 min", status: "completed" },
        { id: "4", title: "Best practices for design critique sessions", type: "Video", duration: "3 min", status: "completed" },
        { id: "5", title: "Learn more about design critique sessions", type: "Reading", duration: "4 min", status: "completed" },
        { id: "6", title: "Test your knowledge on design critique sessions", type: "Graded Practice Assignment", status: "completed", grade: 100 },
        { id: "7", title: "Kunal - My experience with design critique sessions", type: "Video", duration: "3 min", status: "completed" },
        { id: "8", title: "Self-Reflection: Request feedback on your work", type: "Graded Practice Assignment", status: "completed", grade: 100 },
      ],
    },
    {
      id: "observe-crit",
      title: "Observe a mock crit session",
      isExpanded: true,
      isComplete: false,
      lessons: [
        { id: "9", title: "Introduction to a mock crit session", type: "Video", duration: "2 min", status: "in-progress" },
        { id: "10", title: "Observe a mock crit session", type: "Video", duration: "5 min", status: "not-started" },
      ],
    },
    {
      id: "implement-feedback",
      title: "Implement feedback from crit sessions",
      isExpanded: false,
      isComplete: false,
      lessons: [
        { id: "11", title: "Turn crit session feedback into actions", type: "Video", duration: "5 min", status: "not-started" },
        { id: "12", title: "Iterate on mockups based on feedback from crit sessions", type: "Video", duration: "4 min", status: "not-started" },
        { id: "13", title: "Test your knowledge on implementing feedback from crit sessions", type: "Practice Assignment", duration: "30 min", status: "not-started" },
      ],
    },
    {
      id: "module-review",
      title: "Module 3 Review",
      isExpanded: false,
      isComplete: false,
      lessons: [
        { id: "14", title: "Iterate on mockups based on feedback from crit sessions", type: "Video", duration: "4 min", status: "not-started" },
        { id: "15", title: "Learn more about design critique sessions", type: "Reading", duration: "4 min", status: "not-started" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <CourseLearningHeader />

      <div className="flex">
        {/* Left Sidebar - Course Navigation */}
        <aside className="w-[280px] border-r border-[#e1e1e1] bg-white h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px]">
          <div className="p-6 border-b border-[#e1e1e1]">
            <h1 className="text-[16px] font-semibold text-[#1f1f1f] mb-1">
              Build Dynamic User Interfaces (UI) for Websites
            </h1>
            <p className="text-[13px] text-[#5f6368]">Google</p>
          </div>

          <div className="p-4">
            <h2 className="text-[13px] font-semibold text-[#1f1f1f] mb-3 uppercase tracking-wide">
              Course Material
            </h2>
            <div className="space-y-2">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-[6px] cursor-pointer transition-colors ${
                    module.id === "3"
                      ? "bg-[#e8f0fe] text-[#1557b0]"
                      : "hover:bg-[#f5f7f8] text-[#1f1f1f]"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {module.status === "completed" ? (
                      <svg className="w-5 h-5 text-[#34a853]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : module.status === "in-progress" ? (
                      <div className="w-5 h-5 border-2 border-[#1557b0] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-[#dadce0] rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-[14px] font-medium ${module.id === "3" ? "text-[#1557b0]" : ""}`}>
                    {module.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#e1e1e1]">
              <button className="flex items-center gap-3 px-3 py-2 rounded-[6px] hover:bg-[#f5f7f8] text-[#1f1f1f] transition-colors w-full text-left">
                <svg className="w-5 h-5 text-[#5f6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-[14px] font-medium">Grades</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 max-w-[800px] mx-auto px-8 py-8">
          {/* Module Overview */}
          <div className="mb-8">
            <h2 className="text-[24px] font-semibold text-[#1f1f1f] mb-4">
              Participating in design critique sessions
            </h2>
            <div className="flex items-center gap-6 mb-4 text-[14px] text-[#5f6368]">
              <span>18 min of videos left</span>
              <span>2 min of readings left</span>
              <span>1 graded assessment left</span>
            </div>
            <p className="text-[14px] text-[#1f1f1f] leading-relaxed mb-4">
              After you&apos;ve empathized with users, defined the user problem to solve, and begun to ideate possible solutions, it&apos;s time to bring your ideas to life in wireframes. Your responsive website will have different layouts, depending on the device and...
            </p>
            <button className="text-[14px] text-[#1557b0] hover:underline font-medium">
              Show Learning Objectives
            </button>
          </div>

          {/* Lesson Sections */}
          <div className="space-y-1">
            {sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              return (
                <div
                  key={section.id}
                  className="border border-[#e1e1e1] rounded-[6px] overflow-hidden bg-white"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#f5f7f8] transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {section.isComplete ? (
                        <svg className="w-5 h-5 text-[#34a853] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 border-2 border-[#dadce0] rounded-full shrink-0"></div>
                      )}
                      <span className="text-[15px] font-medium text-[#1f1f1f]">
                        {section.title}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#5f6368] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[#e1e1e1] bg-[#fafafa]">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="px-5 py-3 border-b border-[#e1e1e1] last:border-b-0 hover:bg-white transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            {lesson.status === "completed" ? (
                              <svg className="w-5 h-5 text-[#34a853] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : lesson.status === "in-progress" ? (
                              <div className="w-5 h-5 border-2 border-[#1557b0] border-t-transparent rounded-full animate-spin shrink-0 mt-0.5"></div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-[#dadce0] rounded-full shrink-0 mt-0.5"></div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p className="text-[14px] text-[#1f1f1f] font-medium">
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[12px] text-[#5f6368]">
                                      {lesson.type}
                                    </span>
                                    {lesson.duration && (
                                      <>
                                        <span className="text-[#dadce0]">•</span>
                                        <span className="text-[12px] text-[#5f6368]">
                                          {lesson.duration}
                                        </span>
                                      </>
                                    )}
                                    {lesson.grade !== undefined && (
                                      <>
                                        <span className="text-[#dadce0]">•</span>
                                        <span className="text-[12px] text-[#5f6368]">
                                          Grade: {lesson.grade}%
                                        </span>
                                      </>
                                    )}
                                    {lesson.status === "completed" && lesson.type.includes("Graded") && (
                                      <>
                                        <span className="text-[#dadce0]">•</span>
                                        <span className="text-[12px] text-[#5f6368]">Submitted</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {lesson.status === "in-progress" && (
                                  <button className="px-4 py-1.5 bg-[#1557b0] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#1557b0]/90 transition-colors shrink-0">
                                    Resume
                                  </button>
                                )}
                              </div>
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

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1557b0]"></div>
              <div className="w-2 h-2 rounded-full bg-[#dadce0]"></div>
              <div className="w-2 h-2 rounded-full bg-[#dadce0]"></div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Learning Plan & Timeline */}
        <aside className="w-[320px] border-l border-[#e1e1e1] bg-white h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px] p-6">
          {/* Learning Plan */}
          <div className="bg-[#e8f5e9] border border-[#c8e6c9] rounded-[8px] p-5 mb-6">
            <h3 className="text-[15px] font-semibold text-[#1f1f1f] mb-3">
              Learning plan
            </h3>
            <p className="text-[13px] text-[#1f1f1f] mb-4 leading-relaxed">
              You&apos;re on track with your 6-day learning plan this week. Keep up the excellent work!
            </p>
            <div className="flex items-center justify-between mb-4">
              {["M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-[#34a853] flex items-center justify-center text-white text-[12px] font-semibold"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>
            <button className="w-full px-4 py-2 bg-white border border-[#dadce0] text-[13px] font-medium text-[#1f1f1f] rounded-[6px] hover:bg-[#f5f7f8] transition-colors">
              Edit my learning plan
            </button>
          </div>

          {/* Course Timeline */}
          <div className="bg-[#e3f2fd] border border-[#bbdefb] rounded-[8px] p-5">
            <h3 className="text-[15px] font-semibold text-[#1f1f1f] mb-3">
              Course timeline
            </h3>
            <p className="text-[13px] text-[#1f1f1f] mb-4 leading-relaxed">
              Right on schedule! You&apos;re making great progress! Keep this momentum going and you&apos;ll meet your deadlines and estimated end date.
            </p>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-[12px] text-[#5f6368] mb-1">Start date:</p>
                <p className="text-[13px] font-medium text-[#1f1f1f]">August 10, 2025</p>
              </div>
              <div>
                <p className="text-[12px] text-[#5f6368] mb-2">Your next two deadlines:</p>
                <div className="space-y-2">
                  <div className="bg-white rounded-[6px] p-3 border border-[#dadce0]">
                    <p className="text-[13px] font-medium text-[#1f1f1f] mb-1">
                      Module 3 Challenge
                    </p>
                    <p className="text-[12px] text-[#5f6368]">Graded Assignment</p>
                    <p className="text-[12px] text-[#5f6368] mt-1">days</p>
                  </div>
                  <div className="bg-white rounded-[6px] p-3 border border-[#dadce0]">
                    <p className="text-[13px] font-medium text-[#1f1f1f] mb-1">
                      Module 4 Challenge
                    </p>
                    <p className="text-[12px] text-[#5f6368]">Graded Assignment</p>
                    <p className="text-[12px] text-[#5f6368] mt-1">days</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[12px] text-[#5f6368] mb-1">Estimated end date:</p>
                <p className="text-[13px] font-medium text-[#1f1f1f]">November 15, 2025</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseLearning;

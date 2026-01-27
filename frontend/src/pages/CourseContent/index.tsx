import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseContentHeader from "../../components/layout/CourseContentHeader";

const CourseContent: React.FC = () => {
  const navigate = useNavigate();
  // Sidebar states
  const [expandedModules, setExpandedModules] = useState<string[]>([
    "module-3",
  ]);

  // Tab state
  const [activeTab, setActiveTab] = useState<
    "transcript" | "notes" | "downloads"
  >("transcript");

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      <CourseContentHeader />

      <div className="flex h-[calc(100vh-64px)]">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-[350px] border-r border-[#dadce0] bg-white overflow-y-auto flex flex-col shrink-0 custom-scrollbar relative z-10">
          {/* Top Course Title Block */}
          <div className="p-4 border-b border-[#dadce0] sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start">
              <h2 className="text-[14px] font-bold text-[#1f1f1f] leading-snug w-[90%]">
                Build Dynamic User Interfaces (UI) for Websites
              </h2>
              <button className="text-[#0056D2] hover:text-[#00419e] font-bold text-[18px] leading-none">
                ×
              </button>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="flex-1 pb-10">
            {/* Module 1 */}
            <div className="border-b border-[#dadce0]">
              <button
                onClick={() => toggleModule("module-1")}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f5f7f8]"
              >
                <div>
                  <p className="text-[12px] text-[#5f6368] mb-1">Module 1</p>
                  <p className="text-[14px] font-medium text-[#1f1f1f]">
                    Plan a responsive website
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-[#5f6368] transform transition-transform ${expandedModules.includes("module-1") ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Module 2 */}
            <div className="border-b border-[#dadce0]">
              <button
                onClick={() => toggleModule("module-2")}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f5f7f8]"
              >
                <div>
                  <p className="text-[12px] text-[#5f6368] mb-1">Module 2</p>
                  <p className="text-[14px] font-medium text-[#1f1f1f]">
                    Create and test prototypes
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-[#5f6368] transform transition-transform ${expandedModules.includes("module-2") ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Module 3 (Active) */}
            <div className="border-b border-[#dadce0]">
              <button
                onClick={() => toggleModule("module-3")}
                className="w-full flex items-center justify-between p-4 text-left bg-[#f5f7f8]"
              >
                <div>
                  <p className="text-[12px] text-[#5f6368] mb-1">Module 3</p>
                  <p className="text-[14px] font-bold text-[#1f1f1f]">
                    Participating in design critique sessions
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-[#5f6368] transform transition-transform ${expandedModules.includes("module-3") ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedModules.includes("module-3") && (
                <div className="bg-white pb-2">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3 p-3 pl-4 hover:bg-[#f5f7f8] cursor-pointer">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-[#1f8354]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] text-[#1f1f1f]">
                        Give and receive feedback as a UX designer
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#5f6368] mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Video • 5 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3 p-3 pl-4 hover:bg-[#f5f7f8] cursor-pointer">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-[#1f8354]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] text-[#1f1f1f]">
                        Practice giving and receiving design feedback
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#5f6368] mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Video • 3 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3 p-3 pl-4 hover:bg-[#f5f7f8] cursor-pointer">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-[#1f8354]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] text-[#1f1f1f]">
                        The basics of design critique sessions
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#5f6368] mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Video • 3 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start gap-3 p-3 pl-4 hover:bg-[#f5f7f8] cursor-pointer">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-[#1f8354]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] text-[#1f1f1f]">
                        The basics of design critique sessions
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#5f6368] mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Video • 3 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Item (with blue bar) */}
                  <div className="flex items-start gap-3 p-3 pl-4 bg-[#e6f0ff] relative cursor-pointer">
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0056D2]"></div>
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded-full border-2 border-[#0056D2] bg-white"></div>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#1f1f1f]">
                        Introduction to a mock crit session
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#1f1f1f] mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Video • 3 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Items */}
                  <div className="flex items-start gap-3 p-3 pl-4 hover:bg-[#f5f7f8] cursor-pointer">
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded-full border border-[#5f6368] bg-white"></div>
                    </div>
                    <div>
                      <p className="text-[14px] text-[#1f1f1f]">
                        Observe a mock crit session
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#5f6368] mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Video • 5 min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 pl-4 hover:bg-[#f5f7f8] cursor-pointer">
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded-full border border-[#5f6368] bg-white"></div>
                    </div>
                    <div>
                      <p className="text-[14px] text-[#1f1f1f]">
                        Turn crit session feedback into actions
                      </p>
                      <div className="flex items-center gap-1 text-[12px] text-[#5f6368] mt-0.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Video • 3 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Module 4 */}
            <div className="border-b border-[#dadce0]">
              <button
                onClick={() => toggleModule("module-4")}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f5f7f8]"
              >
                <div>
                  <p className="text-[12px] text-[#5f6368] mb-1">Module 4</p>
                  <p className="text-[14px] font-medium text-[#1f1f1f]">
                    Revise and iterate
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-[#5f6368] transform transition-transform ${expandedModules.includes("module-4") ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 overflow-y-auto bg-white p-6 md:p-10 relative">
          <div className="max-w-[1000px] mx-auto">
            {/* Video Player Mockup */}
            <div className="aspect-video bg-black rounded-lg mb-6 relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                alt="Video content"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform">
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Controls Bar Mock */}
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-3">
                <div className="w-full flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <div className="text-sm">0:00 / 5:32</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold bg-white/20 px-1 rounded">
                      CC
                    </span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Title and Save Note */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[24px] font-normal font-sans text-[#1f1f1f]">
                Introduction to a mock crit session
              </h1>
              <button className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px] hover:bg-[#f5f7f8] px-3 py-2 rounded">
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
            <div className="bg-[#f2f8ff] rounded-[8px] p-6 mb-8 relative border border-[#d4e4f7]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-serif italic text-[#5f6368]">
                    coach
                  </span>
                </div>
                <button className="text-[#5f6368 hover:text-[#1f1f1f]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-[14px] text-[#1f1f1f] mb-4 font-normal">
                Let me know if you have any questions about this material.
                I&apos;m here to help!
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="bg-white border border-[#0056D2] text-[#0056D2] px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-[#f0f7ff] flex items-center gap-2">
                  Give me practice questions
                </button>
                <button className="bg-white border border-[#0056D2] text-[#0056D2] px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-[#f0f7ff] flex items-center gap-2">
                  Explain this topic in simple terms
                </button>
                <button className="bg-white border border-[#0056D2] text-[#0056D2] px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-[#f0f7ff] flex items-center gap-2">
                  Give me a summary
                </button>
                <button className="bg-white border border-[#0056D2] text-[#0056D2] px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-[#f0f7ff] flex items-center gap-2">
                  Give me real-life examples
                </button>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="border-b border-[#dadce0] flex gap-8 mb-6">
              <button
                className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === "transcript" ? "border-[#1f1f1f] text-[#1f1f1f]" : "border-transparent text-[#5f6368] hover:text-[#1f1f1f]"}`}
                onClick={() => setActiveTab("transcript")}
              >
                Transcript
              </button>
              <button
                className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === "notes" ? "border-[#1f1f1f] text-[#1f1f1f]" : "border-transparent text-[#5f6368] hover:text-[#1f1f1f]"}`}
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>
              <button
                className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === "downloads" ? "border-[#1f1f1f] text-[#1f1f1f]" : "border-transparent text-[#5f6368] hover:text-[#1f1f1f]"}`}
                onClick={() => setActiveTab("downloads")}
              >
                Downloads
              </button>
            </div>

            {/* Transcript Area */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[12px] text-[#5f6368] font-bold">
                  Transcript language:
                </span>
                <button className="text-[12px] text-[#1f1f1f] flex items-center gap-1 font-bold">
                  English{" "}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="text-[12px] text-[#0056D2] font-bold shrink-0 mt-0.5 cursor-pointer hover:underline">
                    0:01
                  </span>
                  <p className="text-[14px] leading-relaxed text-[#1f1f1f]">
                    Welcome back. We&apos;re moments away from checking out an
                    example of a crit session in action. A standard design
                    critique session is at least 30 minutes, and the designer
                    usually spends five to ten of those minutes presenting.{" "}
                    <span className="font-bold bg-[#fff0b3]">
                      But keep in mind, the session length will depend on the
                      amount of feedback requested and the number of reviewers
                      involved.
                    </span>{" "}
                    We don&apos;t have time to share a full crit session with
                    you. So the upcoming video is just a snapshot of what
                    usually happens. In the mock crit session, I&apos;ll play
                    the role of the presenter, sharing some of the mockups for
                    the dog walker app with two colleagues who were the
                    reviewers.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-[12px] text-[#0056D2] font-bold shrink-0 mt-0.5 cursor-pointer hover:underline">
                    0:38
                  </span>
                  <p className="text-[14px] leading-relaxed text-[#1f1f1f] opacity-70">
                    There will also be a facilitator guiding the flow of the
                    interaction. While you&apos;ve been working on your mockups
                    throughout this course, so have I. The mockups I&apos;ll
                    present in the design critique session are my current
                    iteration of the dog walker app. As the presenter, I&apos;ll
                    ask for feedback on two parts of this design, the scheduling
                    flow and the call-to-action buttons. Remember,
                    call-to-action buttons are elements in the design that tell
                    the user to take action. In the dog walker app, the
                    call-to-action buttons are labeled things like &quot;book
                    appointment&quot; and &quot;next.&quot; You&apos;ll have a
                    chance to watch how the flow of ideas and communication
                    happens as I present my work and receive feedback.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-[12px] text-[#0056D2] font-bold shrink-0 mt-0.5 cursor-pointer hover:underline">
                    1:18
                  </span>
                  <p className="text-[14px] leading-relaxed text-[#1f1f1f] opacity-70">
                    As you watch, take note of how I, as the presenter, respond
                    to the feedback I&apos;m receiving. Ask yourself, is the
                    presenter actively listening? Is the presenter taking notes?
                    What types of follow-up questions is the presenter asking?
                    You should also focus on the way that reviewers share their
                    feedback and opinions. Ask yourself, do the reviewers share
                    the reasoning behind their feedback? Do the reviewers focus
                    on problems with the design instead of offering solutions?
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-[12px] text-[#0056D2] font-bold shrink-0 mt-0.5 cursor-pointer hover:underline">
                    1:45
                  </span>
                  <p className="text-[14px] leading-relaxed text-[#1f1f1f] opacity-70">
                    Do the reviewers connect their feedback to the objectives of
                    the design critique session? With these questions in mind,
                    let&apos;s join the crit session. Meet you there.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between border-t border-[#dadce0] pt-6 mb-20">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  Like
                </button>
                <button className="flex items-center gap-2 text-[#5f6368] font-bold text-[14px]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                    />
                  </svg>
                  Dislike
                </button>
                <button className="flex items-center gap-2 text-[#5f6368] font-bold text-[14px]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                  Report an issue
                </button>
              </div>

              <button className="flex items-center gap-2 border border-[#0056D2] text-[#0056D2] px-4 py-2 rounded-[4px] font-bold text-[14px] hover:bg-[#f0f7ff]">
                Go to next item
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
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

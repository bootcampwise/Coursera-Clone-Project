import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import LoggedHeader from "../../components/layout/LoggedHeader";
import Footer from "../../components/home/Footer";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const displayName = user?.name || "Learner";
  const avatarUrl = user?.avatarUrl;

  return (
    <div className="min-h-screen bg-[#f5f7f8] font-sans text-[#1f1f1f]">
      <LoggedHeader />

      <main className="max-w-[1120px] mx-auto px-4 md:px-8 pt-10 pb-16">
        {/* Top: Personal + Experience/Education */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px,minmax(0,1fr)] gap-6 lg:gap-10 mb-12">
          {/* Left column: profile + side cards */}
          <aside className="space-y-4">
            {/* Personal details */}
            <section className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[14px] font-semibold text-[#1f1f1f]">
                  Personal details
                </h2>
                <button className="text-[#5f6368] hover:text-[#1f1f1f] transition-colors" aria-label="Edit personal details">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-white text-[32px] font-semibold"
                    style={{ backgroundColor: getAvatarColor(displayName) }}
                  >
                    {getInitials(displayName)}
                  </div>
                )}
                <p className="text-[16px] font-semibold text-[#1f1f1f]">
                  {displayName}
                </p>

                <button className="mt-5 w-full h-[34px] rounded-[6px] border border-[#c7c7c7] text-[13px] font-medium text-[#1a73e8] hover:bg-[#f3f6fb] flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0 0-7.07 5 5 0 0 0-7.07 0L10 5"></path>
                    <path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.41a5 5 0 0 0 0 7.07 5 5 0 0 0 7.07 0L14 19"></path>
                  </svg>
                  Share profile link
                </button>

                <button className="mt-3 text-[12px] text-[#1557b0] hover:underline">
                  Update profile visibility
                </button>
              </div>
            </section>

            {/* Highlights */}
            <section className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-5">
              <h3 className="text-[14px] font-semibold text-[#1f1f1f] mb-3">
                Highlights
              </h3>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="Google"
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1f1f1f]">
                    Google Prompting Essentials Specialization (Google)
                  </p>
                  <button className="mt-1 text-[12px] text-[#1557b0] hover:underline">
                    View certificate
                  </button>
                </div>
              </div>
            </section>

            {/* Work preferences */}
            <section className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-5">
              <p className="text-[13px] text-[#5f6368] mb-3">
                Let recruiters know what role you&apos;re looking for to make
                sure you find opportunities that are right for you.
              </p>
              <button className="w-full h-[34px] rounded-[6px] border border-[#c7c7c7] text-[13px] font-medium text-[#1557b0] hover:bg-[#f3f6fb]">
                + Add work preferences
              </button>
            </section>

            {/* Additional info */}
            <section className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-5">
              <p className="text-[13px] text-[#5f6368] mb-3">
                Help recruiters get to know you better by describing what makes
                you a great candidate and sharing other links.
              </p>
              <button className="w-full h-[34px] rounded-[6px] border border-[#c7c7c7] text-[13px] font-medium text-[#1557b0] hover:bg-[#f3f6fb]">
                + Add additional info
              </button>
            </section>
          </aside>

          {/* Right column: experience + education */}
          <section className="space-y-6">
            {/* Experience */}
            <div>
              <h2 className="text-[20px] font-semibold text-[#1f1f1f] mb-4">
                Experience
              </h2>

              {/* Projects */}
              <div className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-[#1f1f1f]">Projects</p>
                    <span className="text-[13px] text-[#5f6368]">ⓘ</span>
                  </div>
                  <button className="text-[13px] text-[#1557b0] hover:underline">
                    Browse Projects
                  </button>
                </div>
                <p className="text-[13px] text-[#5f6368] mb-1">
                  Showcase your skills to recruiters with job-relevant projects
                </p>
                <p className="text-[13px] text-[#5f6368]">
                  Add projects here to demonstrate your technical expertise and ability to solve real-world problems.
                </p>
              </div>

              {/* Work history */}
              <div className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px] font-semibold text-[#1f1f1f]">
                    Work history
                  </p>
                  <span className="text-[13px] text-[#5f6368]">ⓘ</span>
                </div>
                <p className="text-[13px] text-[#5f6368] mb-4">
                  Add your past work experience here. If you&apos;re just
                  starting out, you can add internships or volunteer experience
                  instead.
                </p>
                <button className="h-[34px] px-4 rounded-[6px] border border-[#c7c7c7] text-[13px] font-medium text-[#1557b0] hover:bg-[#f3f6fb]">
                  + Add work experience
                </button>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-[20px] font-semibold text-[#1f1f1f] mb-4">
                Education
              </h2>

              {/* Credentials */}
              <div className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <p className="text-[14px] font-semibold text-[#1f1f1f]">
                      Credentials
                    </p>
                    <span className="text-[13px] text-[#5f6368]">ⓘ</span>
                  </div>
                  <button className="h-[32px] px-4 rounded-[6px] border border-[#c7c7c7] text-[13px] font-medium text-[#1557b0] hover:bg-[#f3f6fb]">
                    + Add
                  </button>
                </div>

                {/* University credential (mock) */}
                <div className="flex gap-3 mb-4">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-[6px] bg-[#f5f7f8] border border-[#e1e1e1] flex items-center justify-center text-[#1f1f1f]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10L12 5 2 10l10 5 10-5z"></path>
                        <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1f1f1f]">
                      University of Agriculture, Faisalabad
                    </p>
                    <p className="text-[13px] text-[#5f6368]">
                      Bachelor&apos;s degree in Computer Science, graduated
                      June 2025
                    </p>
                    <p className="text-[12px] text-[#5f6368] mt-1">
                      September 2021 - June 2025
                    </p>
                  </div>
                </div>

                {/* Google specialization (mock) */}
                <div className="flex gap-3">
                  <div className="mt-1">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                      alt="Google"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1f1f1f]">
                      Google Prompting Essentials Specialization (Google)
                    </p>
                    <button className="text-[12px] text-[#1557b0] hover:underline">
                      View certificate
                    </button>
                    <p className="text-[12px] text-[#5f6368] mt-1">
                      Completed August 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Courses list */}
              <div className="bg-white rounded-[12px] border border-[#e1e1e1] shadow-sm px-6 py-5">
                <div className="flex items-center gap-1 mb-4">
                  <p className="text-[14px] font-semibold text-[#1f1f1f]">
                    Courses
                  </p>
                  <span className="text-[13px] text-[#5f6368]">ⓘ</span>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title:
                        "Speed Up Data Analysis and Presentation Building",
                      completed: "Completed August 2025",
                    },
                    {
                      title: "Start Writing Prompts like a Pro",
                      completed: "Completed August 2025",
                    },
                    {
                      title:
                        "Foundations of User Experience (UX) Design",
                      completed: "Completed August 2025",
                    },
                  ].map((course) => (
                    <div key={course.title} className="flex gap-3">
                      <div className="mt-1">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                          alt="Google"
                          className="w-8 h-8"
                        />
                      </div>
                      <div>
                        <p className="text-[12px] text-[#5f6368]">
                          Google · Course
                        </p>
                        <p className="text-[14px] font-semibold text-[#1f1f1f] mt-0.5">
                          {course.title}
                        </p>
                        <button className="text-[12px] text-[#1557b0] hover:underline">
                          View certificate
                        </button>
                        <p className="text-[12px] text-[#5f6368] mt-1">
                          {course.completed}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-4 text-[13px] text-[#1557b0] hover:underline">
                  Show all 5 courses ▾
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;


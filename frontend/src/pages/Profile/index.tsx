import React from "react";
import ProfileHeader from "../../components/layout/ProfileHeader";
import Footer from "../../components/home/Footer";

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f7f8] font-sans text-[#1f1f1f]">
      <ProfileHeader />

      <main className="max-w-[1120px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[320px,1fr] gap-x-12 gap-y-10 items-start">
          {/* Left Sidebar */}
          <aside className="space-y-6">
            {/* Personal Details Card */}
            <section className="bg-white rounded-2xl border border-[#e1e1e1] p-8 text-center relative">
              <button className="absolute top-4 right-4 text-[#0056D2] hover:bg-blue-50 p-1 rounded transition-colors bg-transparent border-none cursor-pointer">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <p className="text-[13px] font-medium text-[#5f6368] mb-1">
                Personal details
              </p>
              <div className="w-24 h-24 rounded-full bg-[#9b4dca] mx-auto flex items-center justify-center text-white text-[42px] font-bold mb-8">
                Z
              </div>
              <h2 className="text-[20px] font-bold text-[#1f1f1f] mb-10">
                Zainab Murtaza
              </h2>
              <button className="w-full py-2.5 px-4 rounded-lg border border-[#0056D2] text-[13px] font-bold text-[#0056D2] hover:bg-[#e6f0ff] transition-all mb-6 flex items-center justify-center gap-2 bg-transparent cursor-pointer">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                Share profile link
              </button>
              <button className="text-[12px] font-bold text-[#0056D2] hover:underline bg-transparent border-none cursor-pointer">
                Update profile visibility
              </button>
            </section>

            {/* Highlights Card */}
            <section className="bg-white rounded-2xl border border-[#e1e1e1] p-6">
              <h3 className="text-[14px] font-bold text-[#1f1f1f] mb-4">
                Highlights
              </h3>
              <div className="flex gap-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_'G'_logo.svg"
                  alt="Google"
                  className="w-8 h-8 shrink-0"
                />
                <div>
                  <p className="text-[13px] font-bold text-[#1f1f1f] leading-snug">
                    Google Prompting Essentials Specialization (Google)
                  </p>
                  <button className="text-[12px] font-bold text-[#0056D2] hover:underline mt-1 block w-max bg-transparent border-none cursor-pointer p-0">
                    View on Profile
                  </button>
                </div>
              </div>
            </section>

            {/* Work Preferences Card */}
            <section className="bg-white rounded-2xl border border-[#e1e1e1] p-6 space-y-4">
              <p className="text-[13px] text-[#5f6368] leading-normal">
                Let recruiters know what role you&apos;re looking for to make
                sure you find opportunities that are right for you.
              </p>
              <button className="w-full py-2.5 rounded-lg border border-[#e1e1e1] text-[13px] font-bold text-[#0056D2] hover:bg-gray-50 transition-all flex items-center justify-center gap-2 bg-transparent cursor-pointer">
                <span className="text-xl leading-none">+</span> Add work
                preferences
              </button>
            </section>

            {/* Additional Info Card */}
            <section className="bg-white rounded-2xl border border-[#e1e1e1] p-6 space-y-4">
              <p className="text-[13px] text-[#5f6368] leading-normal">
                Help recruiters get to know you better by describing what makes
                you a great candidate and sharing other links.
              </p>
              <button className="w-full py-2.5 rounded-lg border border-[#e1e1e1] text-[13px] font-bold text-[#0056D2] hover:bg-gray-50 transition-all flex items-center justify-center gap-2 bg-transparent cursor-pointer">
                <span className="text-xl leading-none">+</span> Add additional
                info
              </button>
            </section>
          </aside>

          {/* Right Main Content */}
          <div className="space-y-10">
            {/* Experience Section */}
            <section className="space-y-6">
              <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                Experience
              </h2>

              {/* Projects Card */}
              <div className="bg-white rounded-2xl border border-[#e1e1e1] p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold">Projects</h3>
                    <span className="text-[#5f6368] cursor-help">ⓘ</span>
                  </div>
                  <button className="text-[13px] font-bold text-[#0056D2] hover:underline bg-transparent border-none cursor-pointer p-0">
                    Browse Projects
                  </button>
                </div>
                <div className="bg-[#f0f4f9] rounded-xl p-6 border border-[#e1e1e1] border-dashed">
                  <p className="text-[13px] text-[#5f6368] max-w-[500px] leading-[1.8]">
                    Showcase your skills to recruiters with job-relevant
                    projects. Add projects here to demonstrate your technical
                    expertise and ability to solve real-world problems.
                  </p>
                </div>
              </div>

              {/* Work History Card */}
              <div className="bg-white rounded-2xl border border-[#e1e1e1] p-8">
                <h3 className="text-[16px] font-bold mb-4">Work history</h3>
                <div className="bg-[#f0f4f9] rounded-xl p-6 border border-[#e1e1e1] border-dashed">
                  <p className="text-[13px] text-[#5f6368] mb-6 leading-relaxed">
                    Add your past work experience here. If you&apos;re just
                    starting out, you can add internships or volunteer
                    experience instead.
                  </p>
                  <button className="py-2.5 px-6 rounded-lg border border-[#0056D2] text-[13px] font-bold text-[#0056D2] hover:bg-white transition-all flex items-center justify-center gap-2 bg-transparent cursor-pointer">
                    <span className="text-xl leading-none text-[#0056D2]">
                      +
                    </span>{" "}
                    Add work experience
                  </button>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="space-y-6">
              <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                Education
              </h2>

              {/* Credentials Card */}
              <div className="bg-white rounded-2xl border border-[#e1e1e1] p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold">Credentials</h3>
                    <span className="text-[#5f6368] cursor-help">ⓘ</span>
                  </div>
                  <button className="py-2 px-6 rounded-lg border border-[#0056D2] text-[13px] font-bold text-[#0056D2] hover:bg-blue-50 transition-all flex items-center justify-center gap-2 bg-transparent cursor-pointer">
                    <span className="text-xl leading-none">+</span> Add
                  </button>
                </div>

                {/* Education Item 1 */}
                <div className="flex gap-4 group relative">
                  <button className="absolute top-0 right-0 text-[#0056D2] p-2 hover:bg-blue-50 rounded bg-transparent border-none cursor-pointer">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center border border-[#e1e1e1] shrink-0 p-1 shadow-sm overflow-hidden">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 64 64"
                      fill="currentColor"
                    >
                      <path
                        d="M32 8L2 22v20c0 10 30 14 30 14s30-4 30-14V22L32 8z"
                        fill="#1f1f1f"
                      />
                      <path
                        d="M32 16l-20 8.7V38c0 4.3 10 7.3 20 8.7V16z"
                        fill="#4a4a4a"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold">
                      University of Agriculture, Faisalabad
                    </h4>
                    <p className="text-[13px] text-[#1f1f1f] mt-1 pr-10">
                      Bachelor&apos;s degree in Computer Science, graduated June
                      2025
                    </p>
                    <p className="text-[12px] text-[#5f6368] mt-1">
                      September 2021 - June 2025
                    </p>
                  </div>
                </div>

                {/* Education Item 2 */}
                <div className="flex gap-4 group relative">
                  <button className="absolute top-0 right-0 text-[#0056D2] p-2 hover:bg-blue-50 rounded bg-transparent border-none cursor-pointer">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_'G'_logo.svg"
                    alt="Google"
                    className="w-12 h-12 shrink-0"
                  />
                  <div>
                    <h4 className="text-[15px] font-bold leading-snug">
                      Google Prompting Essentials Specialization (Google)
                    </h4>
                    <button className="text-[13px] text-[#0056D2] font-bold hover:underline mt-1 block w-max bg-transparent border-none cursor-pointer p-0">
                      View certificate
                    </button>
                    <p className="text-[12px] text-[#5f6368] mt-1">
                      Completed August 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Courses List Card */}
              <div className="bg-white rounded-2xl border border-[#e1e1e1] p-8 space-y-8">
                <div className="flex items-center gap-2">
                  <h3 className="text-[16px] font-bold">Courses</h3>
                  <span className="text-[#5f6368] cursor-help">ⓘ</span>
                </div>

                {/* Course List */}
                <div className="space-y-10">
                  {[
                    {
                      title: "Speed Up Data Analysis and Presentation Building",
                      tags: [],
                    },
                    { title: "Start Writing Prompts like a Pro", tags: [] },
                    {
                      title: "Foundations of User Experience (UX) Design",
                      tags: [
                        "User Experience Design",
                        "User Research",
                        "UX Design",
                      ],
                    },
                  ].map((course, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 pb-8 border-b border-[#f0f0f0] last:border-0 last:pb-0"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_'G'_logo.svg"
                        alt="Google"
                        className="w-12 h-12 shrink-0"
                      />
                      <div className="flex-1 space-y-3">
                        <p className="text-[12px] font-bold text-[#5f6368]">
                          Google · Course
                        </p>
                        <h4 className="text-[16px] font-bold text-[#1f1f1f] hover:text-[#0056D2] hover:underline cursor-pointer">
                          {course.title}
                        </h4>
                        <button className="text-[13px] text-[#0056D2] font-bold hover:underline bg-transparent border-none cursor-pointer p-0">
                          View certificate
                        </button>

                        {course.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {course.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 bg-[#f0f4f9] rounded-full text-[12px] font-medium text-[#1f1f1f]"
                              >
                                {tag}
                              </span>
                            ))}
                            <button className="text-[12px] font-bold text-[#0056D2] hover:underline ml-1 bg-transparent border-none cursor-pointer p-0">
                              + 5 more
                            </button>
                          </div>
                        )}

                        <p className="text-[12px] text-[#5f6368] font-bold">
                          Completed August 2025
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full text-center text-[13px] font-bold text-[#1f1f1f] hover:bg-gray-50 py-4 transition-all bg-transparent border-t border-[#f0f0f0] cursor-pointer">
                  Show all 5 courses ▾
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

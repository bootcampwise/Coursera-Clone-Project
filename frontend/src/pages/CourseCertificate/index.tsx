import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";

const CourseCertificate: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f7f8] font-sans text-[#1f1f1f]">
      <Header />

      <main className="max-w-[1140px] mx-auto px-4 md:px-12 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[13px] text-[#5f6368] mb-8 font-medium">
          <span className="hover:underline cursor-pointer">
            Accomplishments
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span className="text-[#1f1f1f]">Course Certificate</span>
        </nav>

        <h1 className="text-[28px] font-bold mb-8 text-[#1f1f1f]">
          Foundations of User Experience (UX) Design
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-10 min-w-0">
            {/* Completion Banner */}
            <div className="bg-[#E8F0FE] rounded-sm p-10 flex items-start gap-10">
              <div className="relative">
                <div className="w-[88px] h-[88px] rounded-full bg-[#9e27b0] flex items-center justify-center text-white text-[42px] font-bold shrink-0">
                  Z
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-[26px] h-[26px] bg-white rounded-full flex items-center justify-center">
                  <div className="bg-black rounded-full w-full h-full flex items-center justify-center border-2 border-white">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-[24px] font-medium text-[#1f1f1f]">
                  Completed by <span className="font-bold">Zainab Murtaza</span>
                </h2>
                <div className="space-y-1.5 text-[15px] text-[#1f1f1f]">
                  <p>August 7, 2025</p>
                  <p>12 hours (approximately)</p>
                  <p>Grade Achieved: 93.23%</p>
                </div>
                <p className="text-[14px] leading-relaxed text-[#1f1f1f] mt-4 max-w-[500px]">
                  <span className="font-bold">Zainab Murtaza's</span> account is
                  verified. Coursera certifies their successful completion of{" "}
                  <span className="font-bold text-[#1f1f1f]">
                    Foundations of User Experience (UX) Design
                  </span>
                </p>
              </div>
            </div>

            {/* Course Summary */}
            <div className="flex items-start gap-4 pt-4">
              <div className="w-[64px] h-[64px] shrink-0">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_'G'_logo.svg"
                  alt="Google"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[20px] font-bold text-[#1f1f1f] leading-tight mb-1">
                  Foundations of User Experience (UX) Design
                </h3>
                <p className="text-[14px] text-[#5f6368] font-medium">Google</p>
                <div className="flex items-center gap-1.5 py-1">
                  <div className="flex text-[#f5c22b] gap-[3px]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[14px] font-bold text-[#1f1f1f] ml-0.5">
                    4.8
                  </span>
                  <span className="text-[14px] text-[#5f6368]">
                    (74,715 ratings)
                  </span>
                  <div className="ml-auto text-[12px] text-[#5f6368]">id</div>
                </div>
              </div>
            </div>

            {/* What you will learn */}
            <div className="bg-white rounded-sm border border-[#e1e1e1] p-10">
              <h3 className="text-[14px] font-bold tracking-widest uppercase text-[#5f6368] mb-8">
                WHAT YOU WILL LEARN
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                <div className="flex gap-5">
                  <div className="mt-1">
                    <svg
                      className="text-[#008332]"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#1f1f1f]">
                    Identify common job responsibilities of{" "}
                    <span className="font-bold">entry-level UX</span> designers
                    and other teams you might work with.
                  </p>
                </div>
                <div className="flex gap-5">
                  <div className="mt-1">
                    <svg
                      className="text-[#008332]"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#1f1f1f]">
                    Understand foundational concepts in UX design, such as{" "}
                    <span className="underline decoration-[#1f1f1f] font-bold">
                      user centered design
                    </span>
                    , the design process, accessibility, and equity-focused
                    design.
                  </p>
                </div>
                <div className="flex gap-5">
                  <div className="mt-1">
                    <svg
                      className="text-[#008332]"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#1f1f1f]">
                    Explain{" "}
                    <span className="font-bold underline decoration-[#1f1f1f]">
                      why
                    </span>{" "}
                    design sprints are an{" "}
                    <span className="font-bold">important and useful</span> part
                    of a UX designer's work.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills you will gain */}
            <div className="space-y-6">
              <h3 className="text-[14px] font-bold tracking-widest uppercase text-[#5f6368]">
                SKILLS YOU WILL GAIN
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "User Research",
                  "Usability",
                  "User Experience Design",
                  "Prototyping",
                  "Sprint Planning",
                  "User Interface (UI)",
                  "Sprint Retrospectives",
                  "Mockups",
                  "Wireframing",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#f1f3f4] rounded-full text-[14px] text-[#1f1f1f] font-medium border border-transparent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button className="text-[14px] font-bold text-[#0056D2] hover:underline uppercase tracking-widest mt-2">
                SHOW ALL
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:sticky md:top-24 mt-10 md:mt-0">
            <div className="bg-white rounded p-1.5 border border-[#ced4da] shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
              <img
                src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7.jpeg"
                alt="Certificate"
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-4 pt-2">
              <button className="w-full py-3.5 bg-[#0056D2] text-white rounded-[4px] font-bold text-[15px] hover:bg-[#00419e] transition-colors flex items-center justify-center gap-3">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share Certificate
              </button>
              <button className="w-full py-3.5 border border-[#0056D2] text-[#0056D2] rounded-[4px] font-bold text-[15px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 bg-transparent">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
};

export default CourseCertificate;

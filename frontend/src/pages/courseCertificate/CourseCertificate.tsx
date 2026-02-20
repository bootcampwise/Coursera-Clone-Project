import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import React from "react";
import { IMAGES } from "../../constants/images";
import { useCourseCertificate } from "./useCourseCertificate";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const CourseCertificate: React.FC = () => {
  const {
    id,
    certificate,
    loading,
    backendOrigin,
    formatCompletionDate,
    learningPoints,
    handleDownload,
    handleShare,
  } = useCourseCertificate();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-sans text-gray-dark-3">
        <Header />
        <LoadingSpinner message="Loading certificate..." />
        <Footer simple />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-dark-3">
      <Header />

      <main className="max-w-[1140px] mx-auto px-4 md:px-0 py-6 md:py-8">
        {}
        <nav className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-text-gray mb-6 md:mb-8 font-medium overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
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
          <span className="text-gray-dark-3">Course Certificate</span>
        </nav>

        <h1 className="text-[28px] md:text-[36px] font-normal mb-8 text-gray-dark-3 leading-tight">
          {certificate?.courseTitle || "Course Certificate"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {}
          <div className="space-y-10 min-w-0 flex-1 w-full max-w-[500px]">
            {}
            <div className="bg-blue-light-8 rounded-sm p-6 md:p-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-10">
              <div className="relative shrink-0">
                <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full bg-avatar-purple flex items-center justify-center text-white text-[32px] md:text-[42px] font-bold">
                  {(certificate?.learnerName || "L").charAt(0).toUpperCase()}
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-[22px] h-[22px] md:w-[26px] md:h-[26px] bg-white rounded-full flex items-center justify-center border border-gray-medium-4">
                  <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
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
                <h2 className="text-[20px] md:text-[24px] font-normal text-gray-dark-3">
                  Completed by{" "}
                  <span className="font-bold">
                    {certificate?.learnerName || "Learner"}
                  </span>
                </h2>
                <div className="space-y-1.5 text-[15px] text-gray-dark-3">
                  <p>{formatCompletionDate(certificate?.issuedAt)}</p>
                  <p>
                    {typeof certificate?.durationMinutes === "number" &&
                    certificate.durationMinutes > 0
                      ? certificate.durationMinutes < 60
                        ? `${certificate.durationMinutes} minutes (approximately)`
                        : `${certificate.durationHours} hours (approximately)`
                      : certificate?.durationHours
                        ? `${certificate.durationHours} hours (approximately)`
                        : "N/A"}
                  </p>
                  <p>
                    {typeof certificate?.grade === "number"
                      ? `Grade Achieved: ${certificate.grade.toFixed(2)}%`
                      : "Grade Achieved: N/A"}
                  </p>
                </div>
                <p className="text-[14px] leading-relaxed text-gray-dark-3 mt-4 max-w-[500px]">
                  <span className="font-bold">
                    {certificate?.learnerName || "This learner"}'s
                  </span>{" "}
                  account is verified. Coursera{" "}
                  <span className="font-bold text-primary">certifies</span>
                  their{" "}
                  <span className="font-bold text-primary">
                    successful completion of
                  </span>{" "}
                  <span className="font-bold text-gray-dark-3">
                    {certificate?.courseTitle || "this course"}
                  </span>
                </p>
              </div>
            </div>

            {/* Course Summary */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 pt-1">
              <div className="w-[64px] h-[68px] shrink-0">
                <img
                  src={IMAGES.LOGOS.GOOGLE_LOGO}
                  alt="Google"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[18px] md:text-[20px] font-normal text-gray-dark-3 leading-tight mb-1">
                  {certificate?.courseTitle || "Course"}
                </h3>
                <p className="text-[13px] md:text-[14px] text-text-gray font-medium">
                  {certificate?.partnerName || "Provider"}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 py-1">
                  <div className="flex text-yellow-accent gap-[3px]">
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
                  <span className="text-[13px] md:text-[14px] font-bold text-gray-dark-3 ml-0.5">
                    4.8
                  </span>
                  <span className="text-[13px] md:text-[14px] text-text-gray">
                    (74,715 ratings)
                  </span>
                </div>
              </div>
            </div>

            {/* Learning + Skills Container */}
            <div className="bg-white rounded-sm border border-gray-light-ultra-light p-6 md:p-10 space-y-8 md:space-y-10">
              {/* What you will learn */}
              <div>
                <h3 className="text-[16px] font-normal tracking-widest uppercase text-gray-dark-3 mb-8">
                  WHAT YOU WILL LEARN
                </h3>
                {learningPoints.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    {learningPoints.map((point: string, index: number) => (
                      <div key={`${index}-${point}`} className="flex gap-5">
                        <div className="mt-1">
                          <svg
                            className="text-success-dark-3"
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
                        <p className="text-[15px] leading-relaxed text-gray-dark-3">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[15px] leading-relaxed text-gray-dark-3">
                    Learning outcomes are not available for this course yet.
                  </p>
                )}
              </div>

              {/* Skills you will gain */}
              <div className="space-y-6 pt-8 border-t border-gray-light-ultra-light">
                <h3 className="text-[16px] font-normal tracking-widest uppercase text-gray-dark-3">
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
                      className="px-4 py-2 bg-gray-light-ultra-light rounded-full text-[14px] text-gray-dark-3 font-medium border border-transparent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="text-[14px] font-bold text-primary hover:underline uppercase tracking-widest mt-2">
                  SHOW ALL
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:sticky md:top-24 mt-10 md:mt-0 w-full max-w-[600px]">
            <div className="bg-white rounded border border-gray-medium-5 border-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden relative aspect-[4/3] sm:aspect-auto">
              <iframe
                src={`${backendOrigin}/api/v1/certificates/${id}/html?token=${localStorage.getItem("token") || localStorage.getItem("adminToken") || ""}`}
                title="Certificate Preview"
                className="w-full h-[300px] sm:h-[420px] border-none"
                style={{ overflow: "hidden" }}
                scrolling="no"
              />
            </div>
            <div className="space-y-4 pt-2">
              <button
                onClick={handleShare}
                disabled={!certificate}
                className="w-full py-3.5 bg-primary text-white rounded-[4px] font-bold text-[15px] hover:bg-primary-hover transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
              >
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
              <button
                onClick={handleDownload}
                disabled={!certificate}
                className="w-full py-3.5 border border-primary text-primary rounded-[4px] font-bold text-[15px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 bg-transparent disabled:opacity-60"
              >
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

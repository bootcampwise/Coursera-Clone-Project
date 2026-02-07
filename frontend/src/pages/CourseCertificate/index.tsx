import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { certificateApi } from "../../services/certificateApi";
import { IMAGES } from "../../constants/images";

const CourseCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await certificateApi.getCertificateById(id);
        setCertificate(data);
      } catch (err) {
        console.error("Failed to load certificate", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  const verifyUrl = certificate?.verificationCode
    ? `${window.location.origin}/verify/${certificate.verificationCode}`
    : "";
  const apiBase = import.meta.env.VITE_API_BASE_URL || "/api/v1";
  const backendOrigin = apiBase.replace(/\/api\/v1\/?$/, "");
  const certificateImageUrl =
    certificate?.imageUrl && certificate.imageUrl.startsWith("/")
      ? `${backendOrigin}${certificate.imageUrl}`
      : certificate?.imageUrl;

  const formatCompletionDate = (value?: string) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const normalizeOutcomes = (value?: string | string[]) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((point) => point.trim()).filter(Boolean);
    }
    return value
      .split(/\r?\n|;|â€¢|\u2022|- /g)
      .map((point) => point.trim())
      .filter(Boolean);
  };

  const learningPoints = (() => {
    const points = normalizeOutcomes(certificate?.course?.outcomes);
    if (points.length > 0) return points;
    return normalizeOutcomes(certificate?.course?.description?.substring(0, 100));
  })();

  const handleDownload = async () => {
    if (!id) return;
    try {
      const blob = await certificateApi.downloadCertificate(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificate?.courseTitle || "certificate"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download certificate", err);
    }
  };

  const handleShare = async () => {
    if (!verifyUrl) return;
    try {
      await navigator.clipboard.writeText(verifyUrl);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f8] font-sans text-[#1f1f1f]">
        <Header />
        <div className="max-w-[1140px] mx-auto px-4 md:px-12 py-8">
          Loading certificate...
        </div>
        <Footer simple />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      <Header />

      <main className="max-w-[1140px] mx-auto  py-8">
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

        <h1 className="text-[36px] font-normal mb-8 text-[#1f1f1f]">
          {certificate?.courseTitle || "Course Certificate"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-10 min-w-0 flex-1 w-full max-w-[500px]">
            {/* Completion Banner */}
            <div className="bg-[#E3EEFF] rounded-sm p-10 flex items-start gap-10">
              <div className="relative">
                <div className="w-[88px] h-[88px] rounded-full bg-[#9e27b0] flex items-center justify-center text-white text-[42px] font-bold shrink-0">
                  {(certificate?.learnerName || "L").charAt(0).toUpperCase()}
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-[26px] h-[26px] bg-white rounded-full flex items-center justify-center border border-[#dadce0]">
                  <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
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
                <h2 className="text-[24px] font-normal text-[#1f1f1f]">
                  Completed by{" "}
                  <span className="font-bold">
                    {certificate?.learnerName || "Learner"}
                  </span>
                </h2>
                <div className="space-y-1.5 text-[15px] text-[#1f1f1f]">
                  <p>
                    {formatCompletionDate(certificate?.issuedAt)}
                  </p>
                  <p>
                    {typeof certificate?.durationMinutes === "number" &&
                    certificate.durationMinutes > 0 ? (
                      certificate.durationMinutes < 60 ? (
                        `${certificate.durationMinutes} minutes (approximately)`
                      ) : (
                        `${certificate.durationHours} hours (approximately)`
                      )
                    ) : certificate?.durationHours ? (
                      `${certificate.durationHours} hours (approximately)`
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p>
                    {typeof certificate?.grade === "number"
                      ? `Grade Achieved: ${certificate.grade.toFixed(2)}%`
                      : "Grade Achieved: N/A"}
                  </p>
                </div>
                <p className="text-[14px] leading-relaxed text-[#1f1f1f] mt-4 max-w-[500px]">
                  <span className="font-bold">
                    {certificate?.learnerName || "This learner"}'s
                  </span>{" "}
                  account is verified.{" "} Coursera{" "}
                  <span className="font-bold text-[#0056D2]">
                    certifies  
                  </span>their{" "}<span className="font-bold text-[#0056D2]">successful completion of</span>{" "}
                  <span className="font-bold text-[#1f1f1f]">
                    {certificate?.courseTitle || "this course"}
                  </span>
                </p>
              </div>
            </div>

            {/* Course Summary */}
            <div className="flex items-start gap-2 pt-1">
              <div className="w-[64px] h-[68px] shrink-0">
                <img
                  src={IMAGES.LOGOS.GOOGLE_LOGO}
                  alt="Google"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[20px] font-normal text-[#1f1f1f] leading-tight mb-1">
                  {certificate?.courseTitle || "Course"}
                </h3>
                <p className="text-[14px] text-[#5f6368] font-medium">
                  {certificate?.partnerName || "Provider"}
                </p>
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
                </div>
              </div>
            </div>

            {/* Learning + Skills Container */}
            <div className="bg-white rounded-sm border border-[#e8eaed] p-10 space-y-10">
              {/* What you will learn */}
              <div>
                <h3 className="text-[16px] font-normal tracking-widest uppercase text-[#1f1f1f] mb-8">
                  WHAT YOU WILL LEARN
                </h3>
                {learningPoints.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    {learningPoints.map((point: string, index: number) => (
                      <div key={`${index}-${point}`} className="flex gap-5">
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
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[15px] leading-relaxed text-[#1f1f1f]">
                    Learning outcomes are not available for this course yet.
                  </p>
                )}
              </div>

              {/* Skills you will gain */}
              <div className="space-y-6 pt-8 border-t border-[#f1f3f4]">
                <h3 className="text-[16px] font-normal tracking-widest uppercase text-[#1f1f1f]">
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
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:sticky md:top-24 mt-10 md:mt-0 w-full max-w-[600px]">
            <div className="bg-white rounded  border border-[#B3B3B5] border-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
              <img
                src={
                  certificateImageUrl ||
                  "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7.jpeg"
                }
                alt="Certificate"
                className="w-full h-auto max-h-[340px] "
              />
            </div>
            <div className="space-y-4 pt-2">
              <button
                onClick={handleShare}
                disabled={!certificate}
                className="w-full py-3.5 bg-[#0056D2] text-white rounded-[4px] font-bold text-[15px] hover:bg-[#00419e] transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
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
                className="w-full py-3.5 border border-[#0056D2] text-[#0056D2] rounded-[4px] font-bold text-[15px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 bg-transparent disabled:opacity-60"
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

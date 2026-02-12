import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { IMAGES } from "../../constants/images";
import AccomplishmentItem from "../../components/accomplishments/AccomplishmentItem";
import CourseCard from "../Dashboard/components/CourseCard";
import UpNextCourseCard from "./components/UpNextCourseCard";
import EarnDegreeCard from "./components/EarnDegreeCard";
import MasterTrackCertificateCard from "./components/MasterTrackCertificateCard";
import { useSelector } from "react-redux";
import { type RootState } from "../../app/store";
import { googlePromoRecommendations, topPicks } from "./mockData";
import { certificateApi } from "../../services/certificateApi";
import { courseApi } from "../../services/courseApi";
import Footer from "../../components/home/Footer";

const Accomplishments: React.FC = () => {
  const [certificateItems, setCertificateItems] = useState<any[]>([]);
  const [topPickCourses, setTopPickCourses] = useState<any[]>([]);
  const [topPicksVisibleCount, setTopPicksVisibleCount] = useState(4);
  const [recentlyViewedCourses, setRecentlyViewedCourses] = useState<any[]>([]);
  const [recentlyViewedVisibleCount, setRecentlyViewedVisibleCount] =
    useState(4);
  const [degreesVisibleCount, setDegreesVisibleCount] = useState(4);
  const [upNextCourses, setUpNextCourses] = useState<any[]>([]);
  const [activeCertificateTab, setActiveCertificateTab] = useState<
    "mastertrack" | "university"
  >("mastertrack");
  const { user } = useSelector((state: RootState) => state.auth);
  const studentName = user?.name || "Learner";
  const contentContainer = "max-w-[1000px] mx-auto px-4 md:px-8";
  const completedCourseName =
    certificateItems[0]?.title || "Google Prompting Essentials Specialization";

  const topPicksRemaining = topPickCourses.length - topPicksVisibleCount;
  const degreeItems = [
    {
      university: "University of Illinois Tech",
      degree: "Master of Science in Management (IMSM)",
      image: IMAGES.DEGREE.DEGREE_1,
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      university: "University of Hunders",
      degree: "MSc Management",
      image: IMAGES.DEGREE.HUNDERS,
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      university: "Illinois Tech",
      degree: "Master of Bussiness Administration",
      image: IMAGES.DEGREE.ILLINOIS_TECH,
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
    {
      university: "Illinois Tech",
      degree: "Master of Data Science",
      image: IMAGES.DEGREE.DEGREE_2,
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];
  const degreesRemaining = degreeItems.length - degreesVisibleCount;
  const showMoreDegrees = degreesRemaining > 0;

  const masterTrackCertificates = [
    {
      title: "Diplomado en Analítica de los Negocios",
      image: IMAGES.MASTERTRACK.MT1,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Administración de Empresas: Certificado MasterTrack",
      image: IMAGES.MASTERTRACK.MT2,
      university: "Universidad de P",
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      title: "Certificado en Finanzas Corporativas MasterTrack",
      image: IMAGES.MASTERTRACK.MT3,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Instructional Design MasterTrack Certificate",
      image: IMAGES.MASTERTRACK.MT4,
      university: "University of Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];

  const universityCertificates = [
    {
      title: "Data Visualization and Communication Certificate",
      image: IMAGES.MASTERTRACK.MT1,
      university: "University of Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
    {
      title: "Strategic Management Certificate",
      image: IMAGES.MASTERTRACK.MT2,
      university: "University of Hunders",
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      title: "Applied Business Analytics Certificate",
      image: IMAGES.MASTERTRACK.MT3,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Digital Leadership Certificate",
      image: IMAGES.MASTERTRACK.MT4,
      university: "Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];

  const certificateDisplayItems =
    activeCertificateTab === "mastertrack"
      ? masterTrackCertificates
      : universityCertificates;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certs = await certificateApi.getMyCertificates();
        const items = (certs || []).map((c: any) => ({
          id: c.id,
          title: c.courseTitle,
          type: c.partnerName || c.course?.instructor?.name || "Course",
          image:
            c.imageUrl ||
            c.course?.thumbnail ||
            "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7.jpeg",
          grade:
            typeof c.grade === "number" ? `${c.grade.toFixed(2)}%` : undefined,
        }));
        setCertificateItems(items);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      }
    };
    fetchCertificates();
  }, []);

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const result = await courseApi.getCourses({ limit: 100 });
        const courses = result?.courses || [];
        const formatted = courses.map((course: any) => ({
          title: course.title,
          provider: course.partner || course.instructor?.name || "Google",
          image: course.thumbnail,
          logo: course.partnerLogo || IMAGES.LOGOS.GOOGLE_LOGO,
          type: course.type || "Course",
        }));
        setTopPickCourses(formatted);
      } catch (err) {
        console.error("Failed to fetch top picks", err);
      }
    };
    fetchTopPicks();
  }, []);

  useEffect(() => {
    const fetchUpNextCourses = async () => {
      try {
        const result = await courseApi.getCourses({ limit: 100 });
        const courses = result?.courses || [];
        const filtered = courses.filter(
          (course: any) => course.title !== completedCourseName,
        );
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3).map((course: any) => ({
          title: course.title,
          image: course.thumbnail,
        }));
        setUpNextCourses(selected);
      } catch (err) {
        console.error("Failed to fetch up next courses", err);
      }
    };
    fetchUpNextCourses();
  }, [completedCourseName]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const recentlyViewedData = await courseApi.getRecentlyViewed();
        const formatted = recentlyViewedData.map((course: any) => ({
          title: course.title,
          provider: course.instructor?.name || "Google",
          image: course.thumbnail,
          logo: IMAGES.LOGOS.GOOGLE_LOGO,
          type: "Course",
        }));
        setRecentlyViewedCourses(formatted);
      } catch (err) {
        console.error("Failed to fetch recently viewed courses", err);
      }
    };
    fetchRecentlyViewed();
  }, []);

  const recentlyViewedRemaining =
    recentlyViewedCourses.length - recentlyViewedVisibleCount;

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      {/* 1. Navigation */}
      <Header />

      {/* 4. Main Content */}
      <main className={`${contentContainer} py-12`}>
        {/* Verify My ID */}
        <div className="border border-[#e5e7eb] rounded-[4px] p-6 mb-10">
          <h2 className="text-[20px] font-normal text-[#1f1f1f] mb-2">
            Verify My ID
          </h2>
          <p className="text-[14px] text-[#1f1f1f] leading-6">
            Your name, {studentName}, is verified. This is the name that will
            appear on your certificates. If you have questions or need help with
            your ID Verification, visit our{" "}
            <a href="#" className="text-[#0056D2] hover:underline">
              ID Verification support
            </a>{" "}
            page.
          </p>
        </div>

        {/* My Specializations */}
        <div className="mb-10">
          <h2 className="text-[16px] font-normal text-[#4c5a8a] mb-3">
            My Specializations
          </h2>
          <div className="border border-[#e5e7eb] rounded-[4px] bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
              <div className="w-[76px] h-[76px] border border-[#f0f0f0] bg-[#fafafa] rounded-[4px] flex items-center justify-center shrink-0">
                <img
                  src={IMAGES.UI.SPECIALIZATION_ICON}
                  alt="Specialization"
                  className="w-[44px] h-[44px] object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] text-[#0056D2] font-medium mb-1">
                  Google Prompting Essentials
                </div>
                <div className="text-[14px] text-[#1f1f1f]">Google</div>
              </div>
              <button className="ml-auto px-5 py-2 bg-[#0A5BD3] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#0a52c2] transition-colors">
                Add to LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-16">
          <h2 className="text-[16px] font-normal text-[#4c5a8a] mb-3">
            My Courses
          </h2>
          <div className="space-y-6">
            <div className="border border-[#e5e7eb] rounded-[4px] bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
                <div className="w-[76px] h-[76px] border border-[#e6f0ff] bg-[#f7fbff] rounded-[4px] flex items-center justify-center shrink-0">
                  <img
                    src={IMAGES.UI.SPECIALIZATION_ICON}
                    alt="Course"
                    className="w-[44px] h-[44px] object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] text-[#0056D2] font-medium mb-1">
                    Design Prompts for Everyday Work Tasks
                  </div>
                  <div className="text-[14px] text-[#1f1f1f] mb-1">Google</div>
                  <div className="text-[14px] text-[#1f1f1f]">
                    Grade Achieved: 100%
                  </div>
                </div>
                <button className="ml-auto px-5 py-2 bg-[#0A5BD3] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#0a52c2] transition-colors">
                  Add to LinkedIn
                </button>
              </div>
            </div>

            <div className="border border-[#e5e7eb] rounded-[4px] bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
                <div className="w-[76px] h-[76px] border border-[#e6f0ff] bg-[#f7fbff] rounded-[4px] flex items-center justify-center shrink-0">
                  <img
                    src={IMAGES.UI.SPECIALIZATION_ICON}
                    alt="Course"
                    className="w-[44px] h-[44px] object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] text-[#0056D2] font-medium mb-1">
                    Start Writing Prompts like a Pro
                  </div>
                  <div className="text-[14px] text-[#1f1f1f] mb-1">Google</div>
                  <div className="text-[14px] text-[#1f1f1f]">
                    Grade Achieved: 100%
                  </div>
                </div>
                <button className="ml-auto px-5 py-2 bg-[#0A5BD3] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#0a52c2] transition-colors">
                  Add to LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Up Next in Series */}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-[#1f1f1f] mb-6">
            Up Next in {completedCourseName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upNextCourses.map((course, index) => (
              <UpNextCourseCard
                key={`${course.title}-${index}`}
                title={course.title}
                image={course.image}
                className="w-full"
              />
            ))}
          </div>
        </div>

        {/* Top Picks for You */}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-[#1f1f1f] mb-6">
            Top Picks for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPickCourses
              .slice(0, topPicksVisibleCount)
              .map((course, index) => (
                <UpNextCourseCard
                  key={`${course.title}-${index}`}
                  title={course.title}
                  image={course.image}
                  className="w-full"
                />
              ))}
          </div>
          {topPicksRemaining > 0 ? (
            <button
              className="mt-6 px-6 py-[7px] border border-[#0056D2] text-[#0056D2] font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors"
              onClick={() => setTopPicksVisibleCount(topPickCourses.length)}
            >
              Show {topPicksRemaining} more
            </button>
          ) : null}
        </div>

        {/* Recently Viewed Products */}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-[#1f1f1f] mb-6">
            Recently Viewed Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyViewedCourses
              .slice(0, recentlyViewedVisibleCount)
              .map((course, index) => (
                <UpNextCourseCard
                  key={`${course.title}-${index}`}
                  title={course.title}
                  image={course.image}
                  className="w-full"
                />
              ))}
          </div>
          {recentlyViewedRemaining > 0 ? (
            <button
              className="mt-6 px-6 py-[7px] border border-[#0056D2] text-[#0056D2] font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors"
              onClick={() =>
                setRecentlyViewedVisibleCount(recentlyViewedCourses.length)
              }
            >
              Show {recentlyViewedRemaining} more
            </button>
          ) : null}
        </div>

        {/* Earn Your Degree */}
        <div className="mb-16">
          <h2 className="text-[24px] font-semibold text-[#1f1f1f] mb-6">
            Earn Your Degree
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {degreeItems.slice(0, degreesVisibleCount).map((degree, index) => (
              <EarnDegreeCard
                key={`${degree.degree}-${index}`}
                {...degree}
                className="w-full"
              />
            ))}
          </div>
          {showMoreDegrees ? (
            <button
              className="mt-6 px-6 py-[7px] border border-[#0056D2] text-[#0056D2] font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors"
              onClick={() => setDegreesVisibleCount(degreeItems.length)}
            >
              Show {degreesRemaining} more
            </button>
          ) : null}
        </div>

        {/* MasterTrack and University Certificates */}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-[#1f1f1f] mb-2">
            MasterTrack ® and University Certificates
          </h2>
          <p className="text-[14px] text-[#5f6368] mb-4">
            Earn an university-issued credential and credit towards a degree
          </p>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <button
              className={`px-4 py-2 rounded-[20px] text-[12px] font-medium border transition-colors ${activeCertificateTab === "mastertrack" ? "bg-[#2f3a4a] text-white border-[#2f3a4a]" : "bg-white text-[#2f3a4a] border-[#e5e7eb] hover:bg-[#f5f7f8]"}`}
              onClick={() => setActiveCertificateTab("mastertrack")}
            >
              MasterTrack ® Certificates
            </button>
            <button
              className={`px-4 py-2 rounded-[20px] text-[12px] font-medium border transition-colors ${activeCertificateTab === "university" ? "bg-[#2f3a4a] text-white border-[#2f3a4a]" : "bg-white text-[#2f3a4a] border-[#e5e7eb] hover:bg-[#f5f7f8]"}`}
              onClick={() => setActiveCertificateTab("university")}
            >
              University Certificates
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificateDisplayItems.map((item, index) => (
              <MasterTrackCertificateCard
                key={`${item.title}-${index}`}
                title={item.title}
                image={item.image}
                university={item.university}
                universityIcon={item.universityIcon}
                typeLabel={
                  activeCertificateTab === "mastertrack"
                    ? "Mastertrack"
                    : "University Certificate"
                }
              />
            ))}
          </div>
        </div>

        {/* Coursera Plus */}
        <div className="bg-[#e9f1ff] rounded-[8px] px-8 py-10 mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#0056D2] text-[16px] font-medium tracking-wide">
                  coursera <span className="font-bold">PLUS</span>
                </span>
                <span className="w-[2px] h-[18px] bg-[#1f1f1f] inline-block"></span>
              </div>

              <h3 className="text-[20px] text-[#1f1f1f] font-normal leading-relaxed mb-4">
                Try out different courses to see which one fits your needs
              </h3>

              <p className="text-[14px] text-[#1f1f1f] leading-6 mb-6 max-w-[420px]">
                Get a 7-day free trial that includes courses, Specializations,
                Projects, and Professional
              </p>

              <button className="bg-[#0056D2] text-white text-[14px] font-medium px-6 py-3 rounded-[6px] flex items-center gap-2 hover:bg-[#0a4fb3] transition-colors">
                Learn More
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center md:justify-end relative">
              <img
                src={IMAGES.COURSERA_PLUS.IMAGE}
                alt="Coursera Plus"
                className="w-[220px] h-[220px] rounded-full object-cover"
              />
              <img
                src={IMAGES.COURSERA_PLUS.DOT}
                alt="Dots"
                className="absolute -bottom-2 right-4 w-[68px]"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Custom Footer */}
      <Footer />
    </div>
  );
};

export default Accomplishments;

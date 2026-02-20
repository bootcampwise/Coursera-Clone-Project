import React from "react";
import Header from "../../components/common/Header";
import { IMAGES } from "../../constants/images";
import UpNextCourseCard from "../../components/accomplishments/UpNextCourseCard";
import EarnDegreeCard from "../../components/accomplishments/EarnDegreeCard";
import MasterTrackCertificateCard from "../../components/accomplishments/MasterTrackCertificateCard";
import Footer from "../../components/home/Footer";
import { useAccomplishments } from "./useAccomplishments";

const Accomplishments: React.FC = () => {
  const {
    topPickCourses,
    topPicksVisibleCount,
    setTopPicksVisibleCount,
    recentlyViewedCourses,
    recentlyViewedVisibleCount,
    setRecentlyViewedVisibleCount,
    degreesVisibleCount,
    setDegreesVisibleCount,
    upNextCourses,
    activeCertificateTab,
    setActiveCertificateTab,
    studentName,
    completedCourseName,
    degreeItems,
    certificateDisplayItems,
    topPicksRemaining,
    degreesRemaining,
    showMoreDegrees,
    recentlyViewedRemaining,
  } = useAccomplishments();

  const contentContainer = "max-w-[1000px] mx-auto px-4 md:px-8";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-dark-3">
      {}
      <Header />

      {}
      <main className={`${contentContainer} py-12`}>
        {}
        <div className="border border-gray-light-1 rounded-[4px] p-6 mb-10">
          <h2 className="text-[20px] font-normal text-gray-dark-3 mb-2">
            Verify My ID
          </h2>
          <p className="text-[14px] text-gray-dark-3 leading-6">
            Your name, {studentName}, is verified. This is the name that will
            appear on your certificates. If you have questions or need help with
            your ID Verification, visit our{" "}
            <a href="#" className="text-primary hover:underline">
              ID Verification support
            </a>{" "}
            page.
          </p>
        </div>

        {}
        <div className="mb-10">
          <h2 className="text-[16px] font-normal text-shade-1 mb-3">
            My Specializations
          </h2>
          <div className="border border-gray-light-1 rounded-[4px] bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
              <div className="w-[76px] h-[76px] border border-border-light bg-gray-very-light rounded-[4px] flex items-center justify-center shrink-0">
                <img
                  src={IMAGES.UI.SPECIALIZATION_ICON}
                  alt="Specialization"
                  className="w-[44px] h-[44px] object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] text-primary font-medium mb-1">
                  Google Prompting Essentials
                </div>
                <div className="text-[14px] text-gray-dark-3">Google</div>
              </div>
              <button className="ml-auto px-5 py-2 bg-primary text-white text-[14px] font-medium rounded-[10px] hover:bg-primary-hover transition-colors">
                Add to LinkedIn
              </button>
            </div>
          </div>
        </div>

        {}
        <div className="mb-16">
          <h2 className="text-[16px] font-normal text-shade-1 mb-3">
            My Courses
          </h2>
          <div className="space-y-6">
            <div className="border border-gray-light-1 rounded-[4px] bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
                <div className="w-[76px] h-[76px] border border-primary-light bg-primary-light-bg rounded-[4px] flex items-center justify-center shrink-0">
                  <img
                    src={IMAGES.UI.SPECIALIZATION_ICON}
                    alt="Course"
                    className="w-[44px] h-[44px] object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] text-primary font-medium mb-1">
                    Design Prompts for Everyday Work Tasks
                  </div>
                  <div className="text-[14px] text-gray-dark-3 mb-1">
                    Google
                  </div>
                  <div className="text-[14px] text-gray-dark-3">
                    Grade Achieved: 100%
                  </div>
                </div>
                <button className="ml-auto px-5 py-2 bg-primary text-white text-[14px] font-medium rounded-[10px] hover:bg-primary-hover transition-colors">
                  Add to LinkedIn
                </button>
              </div>
            </div>

            <div className="border border-gray-light-1 rounded-[4px] bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
                <div className="w-[76px] h-[76px] border border-primary-light bg-primary-light-bg rounded-[4px] flex items-center justify-center shrink-0">
                  <img
                    src={IMAGES.UI.SPECIALIZATION_ICON}
                    alt="Course"
                    className="w-[44px] h-[44px] object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] text-primary font-medium mb-1">
                    Start Writing Prompts like a Pro
                  </div>
                  <div className="text-[14px] text-gray-dark-3 mb-1">
                    Google
                  </div>
                  <div className="text-[14px] text-gray-dark-3">
                    Grade Achieved: 100%
                  </div>
                </div>
                <button className="ml-auto px-5 py-2 bg-primary text-white text-[14px] font-medium rounded-[10px] hover:bg-primary-hover transition-colors">
                  Add to LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-gray-dark-3 mb-6">
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

        {}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-gray-dark-3 mb-6">
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
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-surface transition-colors"
              onClick={() => setTopPicksVisibleCount(topPickCourses.length)}
            >
              Show {topPicksRemaining} more
            </button>
          ) : null}
        </div>

        {}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-gray-dark-3 mb-6">
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
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-surface transition-colors"
              onClick={() =>
                setRecentlyViewedVisibleCount(recentlyViewedCourses.length)
              }
            >
              Show {recentlyViewedRemaining} more
            </button>
          ) : null}
        </div>

        {}
        <div className="mb-16">
          <h2 className="text-[24px] font-semibold text-gray-dark-3 mb-6">
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
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-surface transition-colors"
              onClick={() => setDegreesVisibleCount(degreeItems.length)}
            >
              Show {degreesRemaining} more
            </button>
          ) : null}
        </div>

        {}
        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-gray-dark-3 mb-2">
            MasterTrack ® and University Certificates
          </h2>
          <p className="text-[14px] text-text-gray mb-4">
            Earn an university-issued credential and credit towards a degree
          </p>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <button
              className={`px-4 py-2 rounded-[20px] text-[12px] font-medium border transition-colors ${activeCertificateTab === "mastertrack" ? "bg-shade-3 text-white border-shade-3" : "bg-white text-shade-3 border-gray-light-1 hover:bg-surface"}`}
              onClick={() => setActiveCertificateTab("mastertrack")}
            >
              MasterTrack ® Certificates
            </button>
            <button
              className={`px-4 py-2 rounded-[20px] text-[12px] font-medium border transition-colors ${activeCertificateTab === "university" ? "bg-shade-3 text-white border-shade-3" : "bg-white text-shade-3 border-gray-light-1 hover:bg-surface"}`}
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

        {}
        <div className="bg-blue-light-1 rounded-[8px] px-8 py-10 mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-primary text-[16px] font-medium tracking-wide">
                  coursera <span className="font-bold">PLUS</span>
                </span>
                <span className="w-[2px] h-[18px] bg-gray-dark-3 inline-block"></span>
              </div>

              <h3 className="text-[20px] text-gray-dark-3 font-normal leading-relaxed mb-4">
                Try out different courses to see which one fits your needs
              </h3>

              <p className="text-[14px] text-gray-dark-3 leading-6 mb-6 max-w-[420px]">
                Get a 7-day free trial that includes courses, Specializations,
                Projects, and Professional
              </p>

              <button className="bg-primary text-white text-[14px] font-medium px-6 py-3 rounded-[6px] flex items-center gap-2 hover:bg-primary-hover transition-colors">
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

      {}
      <Footer />
    </div>
  );
};

export default Accomplishments;

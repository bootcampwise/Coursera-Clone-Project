import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import CourseHero from "./components/CourseHero";
import CourseInfoBar from "./components/CourseInfoBar";
import CourseTabs from "./components/CourseTabs";
import WhatYouWillLearn from "./components/WhatYouWillLearn";
import SkillsGain from "./components/SkillsGain";
import AdvanceExpertise from "./components/AdvanceExpertise";
import CourseSeries from "./components/CourseSeries";
import CareerTestimonials from "./components/CareerTestimonials";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { courseApi } from "../../services/courseApi";

import Sidebar from "./components/Sidebar";

import CourseDetailsSkeleton from "./components/CourseDetailsSkeleton";

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await courseApi.getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <CourseDetailsSkeleton />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="text-xl">Course not found.</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-[#f2f4f6]/30">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-4 flex items-center gap-3 text-[14px] text-gray-700">
          <Link
            to="/"
            className="hover:text-[#0056D2] transition-colors flex items-center"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>
          <span className="text-gray-400 font-light text-[18px]">›</span>
          <Link to="/search" className="hover:text-[#0056D2] transition-colors">
            Explore
          </Link>
          <span className="text-gray-400 font-light text-[18px]">›</span>
          <Link to="/search" className="hover:text-[#0056D2] transition-colors">
            Professional Certificates
          </Link>
          <span className="text-gray-400 font-light text-[18px]">›</span>
          <span className="text-[#1f1f1f] line-clamp-1">{course.title}</span>
        </div>
      </div>

      <main>
        <CourseHero course={course} />

        <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative -mt-10 z-10">
          <CourseInfoBar course={course} />
        </div>

        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-12">
          <CourseTabs />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-16">
              <WhatYouWillLearn
                outcomes={course.outcomes}
                description={course.description}
              />
              <SkillsGain />
              <AdvanceExpertise />
              <CourseSeries />
              <CareerTestimonials />
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-4">
              <Sidebar course={course} />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;

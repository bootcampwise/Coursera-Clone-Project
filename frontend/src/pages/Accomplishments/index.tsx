import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import AccomplishmentItem from "../../components/accomplishments/AccomplishmentItem";
import CourseCarousel from "../../components/accomplishments/CourseCarousel";
import DegreeCard from "../../components/accomplishments/DegreeCard";
import {
  googlePromoRecommendations,
  topPicks,
  recentlyViewed,
  degrees,
} from "./mockData";
import { certificateApi } from "../../services/certificateApi";

const Accomplishments: React.FC = () => {
  const [certificateItems, setCertificateItems] = useState<any[]>([]);

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

  return (
    <div className="min-h-screen bg-white font-sans text-[#1f1f1f]">
      {/* 1. Navigation */}
      <Header />

      {/* 2. Profile Header Section */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-[#663189] rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
              ZM
            </div>

            <div className="flex-1 text-center md:text-left pt-2">
              <h1 className="text-[24px] font-bold text-[#1f1f1f] mb-1 font-display tracking-tight leading-none">
                Welcome back, Zainab Murtaza!
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-3 text-[14px]">
                <button className="text-[#0056D2] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0">
                  Add your experience...
                </button>
                <span className="hidden md:block text-[#e1e1e1]">|</span>
                <a
                  href="#"
                  className="text-[#0056D2] font-semibold hover:underline no-underline"
                >
                  View LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Verification Banner */}
      <div className="bg-[#0056D2] py-4">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="font-semibold text-[16px]">
              Verify your identity to get your certificate
            </span>
          </div>
          <button className="text-white hover:bg-white/10 px-6 py-1.5 rounded transition-colors font-bold text-[14px] bg-transparent border border-white">
            Verify Now
          </button>
        </div>
      </div>

      {/* 4. Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {/* Accomplishments List */}
        <div className="mb-20">
          <h2 className="text-[12px] font-bold text-[#5f6368] mb-2 uppercase tracking-wider">
            Accomplishments
          </h2>
          <div className="h-px bg-border w-full mb-2"></div>

          <div className="flex flex-col">
            {certificateItems.map((item) => (
              <AccomplishmentItem key={item.id} accomplishment={item} />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-16">
          <CourseCarousel
            title="Up Next in Google Promoting Essentials Specialization"
            recommendations={googlePromoRecommendations}
          />

          <CourseCarousel
            title="Up Next in Google Promoting Leadership Specialization"
            recommendations={[...googlePromoRecommendations].reverse()}
          />

          <CourseCarousel
            title="Up Next in Google Promoting Seven-Day Specialization"
            recommendations={googlePromoRecommendations}
          />

          <CourseCarousel
            title="Up Next in Google Promoting Essentials Specialization"
            recommendations={[...googlePromoRecommendations].reverse()}
          />

          <CourseCarousel
            title="Top Picks for You"
            recommendations={topPicks}
          />

          <CourseCarousel
            title="Recently Viewed Products"
            recommendations={recentlyViewed}
          />
        </div>

        {/* Earn Your Degree */}
        <div className="mt-16">
          <h2 className="text-[24px] font-semibold text-[#1f1f1f] mb-6">
            Earn Your Degree
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {degrees.map((degree) => (
              <DegreeCard key={degree.id} degree={degree} />
            ))}
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="bg-[#F5F7F8] py-16 mt-12">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1f1f1f] mb-4 font-display tracking-tight leading-tight">
              Take your career to the next level
            </h2>
            <p className="text-[16px] text-[#1f1f1f] mb-8 leading-relaxed max-w-[500px]">
              Discover new opportunities, gain in-demand skills, and earn
              credentials from top universities and companies.
            </p>
            <button className="px-8 py-3 bg-[#0056D2] text-white font-bold text-[16px] rounded-[4px] hover:bg-primary-hover transition-colors shadow-sm">
              Get Started
            </button>
          </div>
          <div className="flex-1 md:max-w-[400px]">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/growth/home/achievements-grid.png?auto=format%2Ccompress&dpr=1&w=500"
              alt="Career growth"
              className="w-full h-auto object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      {/* Custom Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-[#1f1f1f] mb-4 text-[14px]">
                Coursera
              </h3>
              <ul className="space-y-2 text-[12px] text-[#1f1f1f]">
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    What We Offer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Leadership
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Catalog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Coursera Plus
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Professional Certificates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#1f1f1f] mb-4 text-[14px]">
                Community
              </h3>
              <ul className="space-y-2 text-[12px] text-[#1f1f1f]">
                <li>
                  <a href="#" className="hover:underline">
                    Learners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Beta Testers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Translators
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tech Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#1f1f1f] mb-4 text-[14px]">
                More
              </h3>
              <ul className="space-y-2 text-[12px] text-[#1f1f1f]">
                <li>
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Investors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Help
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Directory
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#1f1f1f] mb-4 text-[14px]">
                Mobile App
              </h3>
              <div className="flex flex-col gap-3">
                <a href="#">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/apple_store.svg?auto=format%2Ccompress&dpr=1&h=35"
                    alt="Download on the App Store"
                    className="h-[35px]"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/google_play.svg?auto=format%2Ccompress&dpr=1&h=35"
                    alt="Get it on Google Play"
                    className="h-[35px]"
                  />
                </a>
                <div className="mt-4">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/b-corp-logo.png?auto=format%2Ccompress&dpr=1&h=35"
                    alt="B Corp"
                    className="h-[50px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-border">
            <span className="text-[12px] text-[#5f6368]">
              © 2023 Coursera Inc. All rights reserved.
            </span>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Accomplishments;

import React from "react";

interface FooterProps {
  simple?: boolean;
}
import { IMAGES } from "../../constants/images";


const Footer: React.FC<FooterProps> = ({ simple }) => {
  return (
    <footer className="bg-surface pt-12 md:pt-16 pb-8 border-t border-border-muted font-sans text-sm">
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
        {}
        {!simple && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            {}
            <div>
              <h3 className="font-bold text-text-primary mb-4 text-[16px]">
                Skills
              </h3>
              <ul className="space-y-2 text-text-secondary text-[13px]">
                <li>
                  <a href="#" className="hover:underline">
                    Artificial Intelligence (AI)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cybersecurity
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Data Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    English Speaking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Generative AI (GenAI)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Microsoft Excel
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Microsoft Power BI
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Project Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Python
                  </a>
                </li>
              </ul>
            </div>

            {}
            <div>
              <h3 className="font-bold text-text-primary mb-4 text-[16px]">
                Certificates & Programs
              </h3>
              <ul className="space-y-2 text-text-secondary text-[13px]">
                <li>
                  <a href="#" className="hover:underline">
                    Google Cybersecurity Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Google Data Analytics Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Google IT Support Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Google Project Management Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Google UX Design Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    IBM Data Analyst Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    IBM Data Science Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Machine Learning Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Microsoft Power BI Data Analyst Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    UI / UX Design Certificate
                  </a>
                </li>
              </ul>
            </div>

            {}
            <div>
              <h3 className="font-bold text-text-primary mb-4 text-[16px]">
                Industries & Careers
              </h3>
              <ul className="space-y-2 text-text-secondary text-[13px]">
                <li>
                  <a href="#" className="hover:underline">
                    Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Computer Science
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Data Science
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Education & Teaching
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Engineering
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Finance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Healthcare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Human Resources (HR)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Information Technology (IT)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Marketing
                  </a>
                </li>
              </ul>
            </div>

            {}
            <div>
              <h3 className="font-bold text-text-primary mb-4 text-[16px]">
                Career Resources
              </h3>
              <ul className="space-y-2 text-text-secondary text-[13px]">
                <li>
                  <a href="#" className="hover:underline">
                    Career Aptitude Test
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Examples of Strengths and Weaknesses for Job Interviews
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    High-Income Skills to Learn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    How Does Cryptocurrency Work?
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    How to Highlight Duplicates in Google Sheets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    How to Learn Artificial Intelligence
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Popular Cybersecurity Certifications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Preparing for the PMP Certification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Signs You Will Get the Job After an Interview
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    What Is Artificial Intelligence?
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {}
          <div>
            <h3 className="font-bold text-text-primary mb-4 text-[16px]">
              Coursera
            </h3>
            <ul className="space-y-2 text-text-secondary text-[13px]">
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
              <li>
                <a href="#" className="hover:underline">
                  MasterTrack ® Certificates
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Degrees
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  For Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  For Government
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  For Campus
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become a Partner
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Social Impact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Free Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Share your Coursera learning story
                </a>
              </li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="font-bold text-text-primary mb-4 text-[16px]">
              Community
            </h3>
            <ul className="space-y-2 text-text-secondary text-[13px]">
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
                  Beta Testers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  The Coursera Podcast
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tech Blog
                </a>
              </li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="font-bold text-text-primary mb-4 text-[16px]">
              More
            </h3>
            <ul className="space-y-2 text-text-secondary text-[13px]">
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
              <li>
                <a href="#" className="hover:underline">
                  Affiliates
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Modern Slavery Statement
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Manage Cookie Preferences
                </a>
              </li>
            </ul>
          </div>

          {}
          <div className="flex flex-col items-start gap-6">
            <img
              src={IMAGES.LOGOS.APP_STORE_ICON}
              alt="Download on the App Store"
              className="h-[40px] w-auto cursor-pointer"
            />
            <img
              src={IMAGES.LOGOS.GOOGLE_PLAY_ICON}
              alt="Get it on Google Play"
              className="h-[40px] w-auto cursor-pointer"
            />
            <img
              src={IMAGES.LOGOS.FOOTER_LOGO}
              alt="Certified B Corporation"
              className="h-[100px] w-auto opacity-70 mt-4"
            />
          </div>
        </div>

        {}
        <div className="border-t border-border-muted pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-text-secondary text-[14px]">
            © 2025 Coursera Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {}
            <a href="#" className="text-text-primary hover:text-primary">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-text-primary hover:text-primary">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="text-text-primary hover:text-primary">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-text-primary hover:text-primary">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href="#" className="text-text-primary hover:text-primary">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-text-primary hover:text-primary">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

















































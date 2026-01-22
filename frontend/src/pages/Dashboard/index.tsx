import React from "react";
import LoggedHeader from "../../components/layout/LoggedHeader";
import Footer from "../../components/home/Footer";
import WelcomeHeader from "./components/WelcomeHeader";
import ContinueLearning from "./components/ContinueLearning";
import CourseSection from "./components/CourseSection";

const RECENTLY_VIEWED = [
  {
    title: "Intermediate to Advanced: Professional Figma UI/UX Design",
    provider: "Coursera",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a4/09695033c511e69b552b7b515f4e0c/Figma-1.jpg?auto=format%2Ccompress&dpr=1",
    logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/a4/09695033c511e69b552b7b515f4e0c/Figma-1.jpg?auto=format%2Ccompress&dpr=1",
    badge: "Free Trial",
  },
  {
    title: "Google Prompting Essentials",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/0a/6a98335342417482559ce9754d955c/Google-Prompting-Essentials-Square.png?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "Microsoft UX Design",
    provider: "Microsoft",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7f/04368178654c5f877c8657685d0382/Microsoft-UX-Design.jpg?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "Google Data Analytics",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/69/365d83643741b69784382583845b4c/GDA_Square.png?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
];

const MOST_POPULAR = [
  {
    title: "Google Data Analytics",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/69/365d83643741b69784382583845b4c/GDA_Square.png?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "Google Advanced Data Analytics",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/0a/6a98335342417482559ce9754d955c/Google-Prompting-Essentials-Square.png?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "Google Cybersecurity",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a4/09695033c511e69b552b7b515f4e0c/Figma-1.jpg?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "IBM Data Analyst",
    provider: "IBM",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7f/04368178654c5f877c8657685d0382/Microsoft-UX-Design.jpg?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    badge: "Free Trial",
  },
];

const PERSONALIZED = [
  {
    title: "Google AI Essentials",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/69/365d83643741b69784382583845b4c/GDA_Square.png?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "Google IT Support",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/0a/6a98335342417482559ce9754d955c/Google-Prompting-Essentials-Square.png?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "Google Business Intelligence",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a4/09695033c511e69b552b7b515f4e0c/Figma-1.jpg?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
  {
    title: "Google Data Analytics",
    provider: "Google",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7f/04368178654c5f877c8657685d0382/Microsoft-UX-Design.jpg?auto=format%2Ccompress&dpr=1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    badge: "Free Trial",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LoggedHeader />

      <main className="container mx-auto px-4 md:px-8 py-10 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: User Info & Activity */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <WelcomeHeader />
          </aside>

          {/* Right Column: Main Feed */}
          <div className="flex-1">
            <ContinueLearning />

            <div className="mt-12">
              <CourseSection
                title="Recently Viewed Products"
                showMoreLabel="Show 4 more"
                courses={RECENTLY_VIEWED}
              />
              <CourseSection
                title="Most Popular Certificates"
                showMoreLabel="Show 8 more"
                courses={MOST_POPULAR}
              />
              <CourseSection
                title="Personalized Specializations for You"
                showMoreLabel="Show 6 more"
                courses={PERSONALIZED}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
};

export default Dashboard;

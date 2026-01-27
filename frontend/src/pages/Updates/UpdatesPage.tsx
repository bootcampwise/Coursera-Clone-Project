import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";

interface UpdateItem {
  id: number;
  type: "certificate" | "welcome" | "general" | "announcement";
  title: string;
  message: string;
  actionText: string; // e.g., "View Certificate", "Go to Course"
  link: string;
  image?: string;
  isRead: boolean;
}

const mockUpdates: UpdateItem[] = [
  {
    id: 1,
    type: "certificate",
    title: "Congratulations, Your Course Certificate is Ready!",
    message:
      "Google Data Analytics Professional Certificate. You can now download your certificate, add it to LinkedIn, and share it with your network.",
    actionText: "View Certificate",
    link: "#",
    isRead: false,
  },
  {
    id: 2,
    type: "welcome",
    title: "Welcome to Foundations: Data, Data, Everywhere",
    message:
      "We're thrilled to have you in the program! We've hand-picked some readings for you to get started.",
    actionText: "Go to Course",
    link: "#",
    isRead: false,
  },
  {
    id: 3,
    type: "certificate",
    title: "Congratulations, Your Course Certificate is Ready!",
    message:
      "Python for Everybody Specialization. Great job! Don't forget to share your achievement.",
    actionText: "View Certificate",
    link: "#",
    isRead: true,
  },
  {
    id: 4,
    type: "welcome",
    title: "Welcome to Build Window Layouts",
    message: "Start learning today by watching 'Introduction to Layouts'.",
    actionText: "Go to Course",
    link: "#",
    isRead: true,
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a4/09695033c511e69b552b7b515f4e0c/Figma-1.jpg?auto=format%2Ccompress&dpr=1",
  },
  {
    id: 5,
    type: "certificate",
    title: "Congratulations, Your Course Certificate is Ready!",
    message: "Machine Learning Specialization. You did it! Share your success.",
    actionText: "View Certificate",
    link: "#",
    isRead: true,
  },
  {
    id: 6,
    type: "general",
    title: "Updates on your subscription",
    message:
      "We've made some changes to our terms of service. Please review them.",
    actionText: "Read More",
    link: "#",
    isRead: true,
  },
];

const UpdatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 max-w-[1000px]">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#1f1f1f] mb-8 font-sans">
          Updates
        </h1>

        <div className="space-y-4">
          {mockUpdates.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row gap-4 p-6 rounded-lg border border-[#e1e1e1] ${
                item.isRead
                  ? "bg-[#F5F7F8]"
                  : "bg-white border-l-4 border-l-[#0056D2]"
              }`}
            >
              <div className="shrink-0">
                {/* Icon Logic */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : item.type === "certificate" ? (
                  <div className="w-12 h-12 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-xl font-bold">
                    C
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center p-2">
                    <svg
                      className="w-full h-full text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[16px] font-bold text-[#1f1f1f] leading-tight m-0">
                    {item.title}
                  </h3>
                  <span className="text-[12px] text-[#5f6368] whitespace-nowrap ml-4">
                    Jan 24
                  </span>
                </div>

                <p className="text-[14px] text-[#373a3c] leading-relaxed mb-3 max-w-[90%]">
                  {item.message}
                </p>

                <div className="flex items-center">
                  <Link
                    to={item.link}
                    className="text-[14px] font-bold text-[#0056D2] hover:underline no-underline"
                  >
                    {item.actionText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer simple />
    </div>
  );
};

export default UpdatesPage;

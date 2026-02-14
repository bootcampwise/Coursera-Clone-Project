import React from "react";
import { Link } from "react-router-dom";

interface UpdateItem {
  id: number;
  type: "course_update" | "assignment" | "announcement" | "general";
  title: string;
  message: string;
  time: string;
  image?: string; 
  isRead: boolean;
  link: string;
}

const mockUpdates: UpdateItem[] = [
  {
    id: 1,
    type: "course_update",
    title: "Google Data Analytics Professional Certificate",
    message:
      "Congratulations! You earned a new badge: Data Visualization Expert.",
    time: "2 hours ago",
    isRead: false,
    link: "#",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/4a/510a70823611e69b0f3938563c635d/Google-Data-Analytics-Certificate-Logo.png?auto=format%2Ccompress&dpr=1",
  },
  {
    id: 2,
    type: "assignment",
    title: "Python for Everybody",
    message:
      "Your assignment 'Using Python to Access Web Data' is due tomorrow.",
    time: "5 hours ago",
    isRead: false,
    link: "#",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/08/33f720502a11e59e72391a13123867/pythonlearn_logo_square.png?auto=format%2Ccompress&dpr=1",
  },
  {
    id: 3,
    type: "announcement",
    title: "Machine Learning Specialization",
    message: "New course content has been added to Week 3.",
    time: "1 day ago",
    isRead: true,
    link: "#",
    image:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/b5/12e8b0b53311e7926e850c95015b6b/Machine-Learning-Specialization-Logo.png?auto=format%2Ccompress&dpr=1",
  },
  {
    id: 4,
    type: "general",
    title: "Coursera",
    message:
      "Check out the new courses recommended for you based on your recent activity.",
    time: "2 days ago",
    isRead: true,
    link: "#",
  },
];

const UpdatesPopover: React.FC = () => {
  return (
    <div className="absolute right-[-80px] md:right-0 top-10 mt-3 w-[360px] bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 overflow-hidden font-sans">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <h3 className="text-[16px] font-bold text-gray-dark-3 m-0">Updates</h3>
        <Link
          to="/updates"
          className="text-[12px] font-semibold text-primary hover:underline no-underline"
        >
          Go to updates
        </Link>
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {mockUpdates.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No new updates
          </div>
        ) : (
          mockUpdates.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="block px-4 py-3 hover:bg-surface transition-colors border-b border-gray-50 last:border-0 no-underline group"
            >
              <div className="flex gap-3">
                {}
                <div className="shrink-0 mt-1">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 rounded-sm object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                      </svg>
                    </div>
                  )}
                </div>

                {}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[14px] leading-tight font-semibold text-gray-dark-3 group-hover:text-primary mb-1 line-clamp-1">
                      {item.title}
                    </span>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0 ml-2"></span>
                    )}
                  </div>
                  <p className="text-[13px] text-text-secondary leading-snug mb-1 line-clamp-2">
                    {item.message}
                  </p>
                  <span className="text-[11px] text-shade-12">
                    {item.time}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default UpdatesPopover;

















































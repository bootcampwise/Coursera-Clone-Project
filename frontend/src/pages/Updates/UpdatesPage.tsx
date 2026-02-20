import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import { useUpdates } from "./useUpdates";

const UpdatesPage: React.FC = () => {
  const {
    updates,
    loading,
    error,
    fetchNotifications,
    handleNotificationClick,
    formatDate,
  } = useUpdates();

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 max-w-[1000px]">
        <h1 className="text-[24px] md:text-[28px] font-bold text-text-primary mb-8 font-sans">
          Updates
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-text-gray">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchNotifications}
              className="mt-4 text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        ) : updates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-gray text-lg">No notifications yet</p>
            <p className="text-text-gray text-sm mt-2">
              You'll see updates here when you complete courses or earn
              certificates
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {updates.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row gap-4 p-6 rounded-lg border border-border ${
                  item.isRead
                    ? "bg-surface"
                    : "bg-white border-l-4 border-l-primary"
                }`}
              >
                <div className="shrink-0">
                  {/* Icon Logic */}
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : item.type === "certificate" ||
                    item.type === "course_completion" ? (
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
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
                    <h3 className="text-[16px] font-bold text-text-primary leading-tight m-0">
                      {item.title}
                    </h3>
                    <span className="text-[12px] text-text-gray whitespace-nowrap ml-4">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <p className="text-[14px] text-text-secondary-dark leading-relaxed mb-3 max-w-[90%]">
                    {item.message}
                  </p>

                  {item.actionText && item.link && (
                    <div className="flex items-center">
                      <Link
                        to={item.link}
                        onClick={() => handleNotificationClick(item)}
                        className="text-[14px] font-bold text-primary hover:underline no-underline"
                      >
                        {item.actionText}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer simple />
    </div>
  );
};

export default UpdatesPage;

import React from "react";
import LoggedHeader from "../../components/layout/LoggedHeader";
import Footer from "../../components/home/Footer";
import { Link } from "react-router-dom";
import { useMyLearning } from "./useMyLearning";

const MyLearning: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    tabs,
    filteredEnrollments,
    isLoading,
    isReviewOpen,
    openReviewModal,
    closeReviewModal,
    reviewTarget,
    reviewRating,
    setReviewRating,
    reviewComment,
    setReviewComment,
    isSubmittingReview,
    reviewError,
    handleReviewSubmit,
    certificatesByCourseId,
    navigate,
  } = useMyLearning();

  const renderEmptyState = () => (
    <div className="py-20 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      </div>
      <h3 className="text-[20px] font-bold text-gray-dark-3 mb-2">
        Nothing here yet
      </h3>
      <p className="text-gray-600 mb-8">
        Start a new course and build your skills.
      </p>
      <Link
        to="/search"
        className="px-8 py-3 bg-primary text-white font-bold rounded-[4px] hover:bg-primary-hover transition-colors"
      >
        Explore Courses
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <LoggedHeader />

      <main className="container mx-auto px-4 py-8 max-w-[1100px]">
        {}
        <h1 className="text-[32px] font-bold text-gray-dark-3 mb-6">
          My Learning
        </h1>

        {}
        <div className="flex gap-3 mb-6 md:mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-[14px] font-bold transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-gray-dark-3 text-white"
                  : "bg-white text-gray-dark-3 border border-gray-dark-3 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="space-y-6">
            {filteredEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="border border-border rounded-[8px] overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6"
              >
                {}
                <div className="w-full md:w-[180px] h-[120px] shrink-0 rounded-[4px] overflow-hidden border border-gray-100">
                  {enrollment.course?.thumbnail ? (
                    <img
                      src={enrollment.course.thumbnail}
                      alt={enrollment.course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-primary font-bold text-2xl">
                      {enrollment.course?.title.charAt(0)}
                    </div>
                  )}
                </div>

                {}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2
                      onClick={() =>
                        navigate(`/learn/${enrollment.course?.id}`)
                      }
                      className="text-[18px] md:text-[20px] font-bold text-gray-dark-3 mb-1 hover:text-primary cursor-pointer transition-colors line-clamp-2"
                    >
                      {enrollment.course?.title}
                    </h2>
                    <p className="text-[13px] md:text-[14px] text-gray-600 mb-4">
                      By{" "}
                      {enrollment.course?.instructor?.name ||
                        "Coursera Instructor"}
                    </p>

                    {}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[300px] bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-500"
                          style={{
                            width: `${typeof enrollment.progress === "number" ? enrollment.progress : 0}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-[12px] font-bold text-gray-dark-3 shrink-0">
                        {typeof enrollment.progress === "number"
                          ? enrollment.progress
                          : 0}
                        % complete
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4">
                    <div className="flex items-center gap-2">
                      {enrollment.completed ? (
                        <div className="flex items-center gap-2 text-success-dark font-bold text-[14px]">
                          <div className="w-5 h-5 rounded-full bg-success-dark flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          Completed
                        </div>
                      ) : (
                        <span className="text-[14px] text-gray-500">
                          {enrollment.progress === 0
                            ? "Not started"
                            : "Last accessed recently"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {enrollment.completed &&
                        enrollment.course?.id &&
                        certificatesByCourseId[enrollment.course.id] && (
                          <button
                            onClick={() =>
                              navigate(
                                `/accomplishments/certificate/${certificatesByCourseId[enrollment.course?.id || ""].id}`
                              )
                            }
                            className="px-6 py-[10px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-blue-50 transition-colors shadow-sm bg-transparent w-full sm:w-auto"
                          >
                            View Certificate
                          </button>
                        )}
                      <button
                        onClick={() => {
                          if (enrollment.completed && !enrollment.hasReviewed) {
                            openReviewModal(enrollment);
                          } else {
                            navigate(`/learn/${enrollment.course?.id}`);
                          }
                        }}
                        className="px-8 py-[10px] bg-primary text-white font-bold rounded-[4px] text-[14px] hover:bg-primary-hover transition-colors shadow-sm w-full sm:w-auto"
                      >
                        {enrollment.completed
                          ? enrollment.hasReviewed
                            ? "Go to Course"
                            : "Review"
                          : enrollment.progress === 0
                            ? "Start"
                            : "Continue"}
                      </button>
                    </div>
                  </div>
                  {enrollment.completed && (
                    <div className="mt-3 text-[12px] text-text-gray">
                      Completed on{" "}
                      {new Date(
                        enrollment.completedAt ||
                          enrollment.updatedAt ||
                          new Date().toISOString()
                      ).toLocaleDateString()}
                    </div>
                  )}
                  {enrollment.completed && enrollment.hasReviewed && (
                    <div className="mt-2 flex items-center gap-2 text-[12px] text-gray-dark-3 font-bold">
                      <span>Your rating:</span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <svg
                            key={value}
                            className={`w-4 h-4 ${
                              (enrollment.myRating || 0) >= value
                                ? "text-yellow-accent"
                                : "text-border-light"
                            }`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {isReviewOpen && reviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[520px] bg-white rounded-[8px] shadow-xl border border-border">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border">
              <h3 className="text-[16px] md:text-[18px] font-bold text-gray-dark-3">
                Leave a review
              </h3>
              <button
                onClick={closeReviewModal}
                className="text-text-gray hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-[20px]"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="px-4 md:px-6 py-5">
              <p className="text-[13px] md:text-[14px] text-gray-dark-3 mb-4 font-medium">
                {reviewTarget.course?.title}
              </p>

              <div className="mb-4">
                <p className="text-[13px] font-bold text-gray-dark-3 mb-2">
                  Rating
                </p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setReviewRating(value)}
                      className="p-1 rounded-full hover:bg-gray-50"
                      aria-label={`Rate ${value}`}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          reviewRating >= value
                            ? "text-yellow-accent"
                            : "text-border-light"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[13px] font-bold text-gray-dark-3 mb-2">
                  Review
                </p>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-medium-4 rounded-[6px] p-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Share your experience with this course..."
                />
              </div>

              {reviewError && (
                <div className="text-[12px] text-red-600 mb-3">
                  {reviewError}
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              <button
                onClick={closeReviewModal}
                className="px-6 py-2 border border-gray-medium-4 rounded-[4px] text-[14px] font-bold text-gray-dark-3 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                disabled={isSubmittingReview}
                className="px-6 py-2 bg-primary text-white rounded-[4px] text-[14px] font-bold hover:bg-primary-hover disabled:opacity-60"
              >
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <button className="fixed bottom-6 right-6 w-[48px] h-[48px] bg-white border border-border rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-gray-50 transition-all z-50">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
    </div>
  );
};

export default MyLearning;

import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import WelcomeHeader from "../../components/dashboard/WelcomeHeader";
import ContinueLearning from "../../components/dashboard/ContinueLearning";
import CourseSection from "../../components/dashboard/CourseSection";
import { useDashboard } from "./useDashboard";

const Dashboard: React.FC = () => {
  const {
    recentlyViewed,
    mostPopular,
    personalized,
    isLoading,
    activeEnrollment,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-10 max-w-[1440px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row gap-12">
              <aside className="w-full lg:w-[320px] shrink-0">
                <WelcomeHeader />
              </aside>

              <div className="flex-1">
                {activeEnrollment && (
                  <ContinueLearning enrollment={activeEnrollment} />
                )}

                {recentlyViewed.length > 0 && (
                  <div className="mt-12">
                    <CourseSection
                      title="Recently Viewed Products"
                      showMoreLabel="Show 4 more"
                      courses={recentlyViewed.map((c) => ({
                        id: c.id,
                        title: c.title,
                        provider: c.instructor?.name || "Coursera Partner",
                        image: c.thumbnail,
                        logo:
                          c.instructor?.avatarUrl ||
                          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                        badge: "Free Trial",
                        buildDegree: false,
                      }))}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <CourseSection
                title="Most Popular Certificates"
                showMoreLabel="Show 8 more"
                courses={mostPopular.map((c) => ({
                  id: c.id,
                  title: c.title,
                  provider: c.instructor?.name || "Coursera Partner",
                  image: c.thumbnail,
                  logo:
                    c.instructor?.avatarUrl ||
                    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                  badge: "Free Trial",
                }))}
              />
              <CourseSection
                title="Personalized Specializations for You"
                showMoreLabel="Show 6 more"
                courses={personalized.map((c) => ({
                  id: c.id,
                  title: c.title,
                  provider: c.instructor?.name || "Coursera Partner",
                  image: c.thumbnail,
                  logo:
                    c.instructor?.avatarUrl ||
                    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                  badge: "Free Trial",
                }))}
              />
            </div>
          </div>
        )}
      </main>

      <Footer simple />
    </div>
  );
};

export default Dashboard;

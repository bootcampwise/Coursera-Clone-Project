import React from "react";

const CourseDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans animate-pulse">
      {}
      <div className="bg-gray-light-4/30">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-4 flex items-center gap-3">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      {}
      <section className="bg-gradient-to-r from-white via-white to-blue-50 pt-12 pb-20 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-4 md:px-8">
          <div>
            <div className="h-8 w-40 bg-gray-200 rounded mb-6"></div>
            <div className="h-14 md:h-20 w-full bg-gray-200 rounded mb-6"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-8"></div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="h-12 w-40 bg-gray-200 rounded"></div>
              <div className="h-12 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>

          <div className="hidden lg:flex justify-end pr-8">
            <div className="w-[450px] h-[350px] bg-gray-100 rounded-[24px]"></div>
          </div>
        </div>
      </section>

      {}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative -mt-10 z-10">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-12">
        <div className="flex gap-8 border-b border-gray-100 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <section className="space-y-6">
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 w-full bg-gray-100 rounded"
                  ></div>
                ))}
              </div>
            </section>
            <section className="space-y-6">
              <div className="h-8 w-40 bg-gray-200 rounded"></div>
              <div className="h-32 w-full bg-gray-50 rounded"></div>
            </section>
          </div>

          <aside className="hidden lg:block lg:col-span-4">
            <div className="h-[400px] w-full bg-gray-100 rounded-lg shadow-sm"></div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;



















































import React, { useMemo, useState } from "react";

interface VideoRow {
  id: string;
  course: string;
  lesson: string;
  duration: string;
  status: "Processing" | "Ready";
  uploadedAt: string;
}

const Videos: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState("React Fundamentals");

  const rows: VideoRow[] = useMemo(
    () => [
      {
        id: "v-1",
        course: "React Fundamentals",
        lesson: "Lesson 1 • Intro",
        duration: "06:14",
        status: "Ready",
        uploadedAt: "Today",
      },
      {
        id: "v-2",
        course: "React Fundamentals",
        lesson: "Lesson 2 • Routing",
        duration: "12:38",
        status: "Processing",
        uploadedAt: "Today",
      },
      {
        id: "v-3",
        course: "TypeScript for Beginners",
        lesson: "Lesson 1 • Types",
        duration: "10:04",
        status: "Ready",
        uploadedAt: "2 days ago",
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Videos</h1>
          <p className="text-sm text-gray-500">
            Upload and manage lesson videos for your courses.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
            Bulk Actions
          </button>
          <button className="px-4 py-2 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all shadow-sm">
            + Upload Video
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Upload</h2>
              <p className="text-sm text-gray-500 mt-1">
                Attach videos to lessons and track processing.
              </p>
            </div>
            <div className="min-w-[220px]">
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>React Fundamentals</option>
                <option>TypeScript for Beginners</option>
                <option>AI for Beginners</option>
              </select>
            </div>
          </div>

          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-blue-50 to-gray-50 p-10 text-center">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              Drag & drop to upload
            </p>
            <p className="text-xs text-gray-500 mt-2">
              MP4 recommended. Keep file sizes reasonable.
            </p>
            <button className="mt-5 px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-all shadow-sm">
              Choose File
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Guidelines
          </h2>
          <p className="text-sm text-gray-500">
            Keep a consistent learner experience.
          </p>
          <div className="mt-4 space-y-3">
            {[
              { title: "Video Quality", desc: "1080p preferred, clear audio." },
              {
                title: "Naming",
                desc: "Module/Lesson naming should match curriculum.",
              },
              { title: "Length", desc: "Aim for 5–12 minute lessons." },
              { title: "Captions", desc: "Add captions for accessibility." },
            ].map((g) => (
              <div
                key={g.title}
                className="p-3 rounded-lg bg-gray-50 border border-gray-200"
              >
                <div className="text-sm font-semibold text-gray-900">
                  {g.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{g.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-900">
            Recent Uploads
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Lesson
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {r.lesson}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      ID: {r.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {r.course}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {r.duration}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${
                        r.status === "Ready"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : "bg-blue-50 text-blue-700 border-blue-100"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {r.uploadedAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Attach
                      </button>
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Videos;

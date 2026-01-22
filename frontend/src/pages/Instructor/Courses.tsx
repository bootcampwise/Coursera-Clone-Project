import React from "react";
import { Link } from "react-router-dom";

interface CourseRow {
  id: string;
  title: string;
  status: "Draft" | "Published";
  students: number;
  rating: number;
  updatedAt: string;
}

const Courses: React.FC = () => {
  const courses: CourseRow[] = [
    { id: "1", title: "React Fundamentals", status: "Published", students: 8420, rating: 4.8, updatedAt: "2 days ago" },
    { id: "2", title: "TypeScript for Beginners", status: "Published", students: 3920, rating: 4.7, updatedAt: "5 days ago" },
    { id: "3", title: "AI for Beginners", status: "Draft", students: 0, rating: 0, updatedAt: "Today" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Courses</h1>
          <p className="text-sm text-gray-500">Create, update, and publish your course catalog.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
            Filter
          </button>
          <Link to="/instructor/courses/new" className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-all shadow-sm">
            + Create Course
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{c.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">ID: {c.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${
                      c.status === "Published"
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-yellow-50 text-yellow-700 border-yellow-100"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{c.students.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{c.rating ? c.rating.toFixed(1) : "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{c.updatedAt}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <Link to="/instructor/videos" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Manage Videos
                      </Link>
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Edit
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

export default Courses;


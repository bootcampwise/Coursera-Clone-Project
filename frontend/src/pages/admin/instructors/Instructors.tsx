import React from "react";
import { useAdminInstructors } from "./useAdminInstructors";

const Instructors: React.FC = () => {
  const { instructors, loading, error, handleRemoveInstructor } =
    useAdminInstructors();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Instructor Network
          </h1>
          <p className="text-sm text-gray-500">
            Manage faculty and content creators
          </p>
        </div>
        <button className="px-4 py-2 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all shadow-sm cursor-pointer">
          + Add Instructor
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            <p className="text-gray-500 text-sm mt-4">
              Syncing instructor data...
            </p>
          </div>
        ) : instructors.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No instructors found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {instructors.map((instructor) => (
                  <tr
                    key={instructor.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white font-semibold text-sm shadow-sm group-hover:scale-105 transition-transform">
                          {instructor.avatarUrl ? (
                            <img
                              src={instructor.avatarUrl}
                              alt=""
                              className="w-full h-full rounded-xl object-cover"
                            />
                          ) : (
                            instructor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {instructor.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {instructor.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {instructor._count.courses}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600">
                        {instructor._count.enrollments.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleRemoveInstructor(instructor.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;

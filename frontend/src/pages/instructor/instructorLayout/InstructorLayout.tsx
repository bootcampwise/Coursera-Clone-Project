import React from "react";
import { Link, Outlet } from "react-router-dom";
import { IMAGES } from "../../../constants/images.ts";
import { useInstructorLayout } from "./useInstructorLayout.tsx";

const InstructorLayout: React.FC = () => {
  const {
    location,
    isSidebarOpen,
    setIsSidebarOpen,
    navItems,
    currentPageTitle,
  } = useInstructorLayout();

  const Sidebar: React.FC = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <Link
          to="/"
          className="block group w-max transition-opacity hover:opacity-80"
        >
          <img
            src={IMAGES.LOGO}
            alt="Coursera"
            className="h-7 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-2 block">
            Instructor Studio
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span
                className={`transition-colors ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900"}`}
              >
                {item.icon}
              </span>
              <span
                className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-600 group-hover:text-gray-900"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-semibold text-sm shadow-md">
              IN
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">
                Instructor
              </p>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">
                Course Creator
              </p>
            </div>
          </div>
          <button className="w-full py-2.5 px-4 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
            View Public Profile
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans antialiased">
      <aside className="hidden lg:flex w-72 flex-col fixed h-full z-20">
        <Sidebar />
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-72 z-50 lg:hidden bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </aside>

      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider leading-none mb-1">
                  Instructor Console
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentPageTitle}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 group focus-within:bg-white focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <svg
                  className="w-4 h-4 text-gray-400 group-focus-within:text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search courses, lessons..."
                  className="bg-transparent border-none text-sm px-0 focus:outline-none text-gray-700 placeholder:text-gray-400 w-56 font-medium"
                />
              </div>

              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex-1">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorLayout;

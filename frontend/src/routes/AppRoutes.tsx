import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import CourseDetails from "../pages/CourseDetails";
import Dashboard from "../pages/Dashboard";
import InstructorLayout from "../pages/Instructor/InstructorLayout";
import InstructorOverview from "../pages/Instructor/Overview";
import InstructorCourses from "../pages/Instructor/Courses";
import InstructorCreateCourse from "../pages/Instructor/CreateCourse";
import InstructorVideos from "../pages/Instructor/Videos";
import InstructorAnalytics from "../pages/Instructor/Analytics";
import InstructorSettings from "../pages/Instructor/Settings";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Checkout from "../pages/Checkout";
import MyLearning from "../pages/MyLearning";
import AdminLayout from "../pages/Admin/AdminLayout";
import Overview from "../pages/Admin/Overview";
import Users from "../pages/Admin/Users";
import Courses from "../pages/Admin/Courses";
import Instructors from "../pages/Admin/Instructors";
import Settings from "../pages/Admin/Settings";
import Profile from "../pages/Profile";
import CourseLearning from "../pages/CourseLearning";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/learn/:courseId" element={<CourseLearning />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-learning" element={<MyLearning />} />
      <Route path="/instructor" element={<InstructorLayout />}>
        <Route index element={<InstructorOverview />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="courses/new" element={<InstructorCreateCourse />} />
        <Route path="videos" element={<InstructorVideos />} />
        <Route path="analytics" element={<InstructorAnalytics />} />
        <Route path="settings" element={<InstructorSettings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="users" element={<Users />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="courses" element={<Courses />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

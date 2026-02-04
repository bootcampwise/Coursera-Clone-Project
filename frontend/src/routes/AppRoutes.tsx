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
import InstructorReviews from "../pages/Instructor/Reviews";
import InstructorSettings from "../pages/Instructor/Settings";
import CurriculumBuilder from "../pages/Instructor/CurriculumBuilder";
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
import AdminReviews from "../pages/Admin/Reviews";
import Profile from "../pages/Profile/index";
import CourseLearning from "../pages/CourseLearning/index";
import CourseContent from "../pages/CourseContent/index";
import CourseAssessment from "../pages/CourseAssessment/index";
import CourseAssessmentResult from "../pages/CourseAssessmentResult/index";
import AccountSettings from "../pages/AccountSettings/index";
import CourseCertificate from "../pages/CourseCertificate/index";
import UpdatesPage from "../pages/Updates/UpdatesPage";
import Accomplishments from "../pages/Accomplishments/index";

import AdminInstructorLogin from "../pages/Auth/AdminInstructorLogin";
import AdminProtectedRoute from "../components/auth/AdminProtectedRoute";
import InstructorProtectedRoute from "../components/auth/InstructorProtectedRoute";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/learn/:courseId" element={<CourseLearning />} />
      <Route
        path="/learn/:courseId/lecture/:lessonId"
        element={<CourseContent />}
      />
      <Route
        path="/learn/:courseId/assessment/:assessmentId"
        element={<CourseAssessment />}
      />
      <Route
        path="/learn/:courseId/assessment/:assessmentId/result"
        element={<CourseAssessmentResult />}
      />
      <Route path="/accomplishments" element={<Accomplishments />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/account/settings" element={<AccountSettings />} />
      <Route
        path="/accomplishments/certificate/:id"
        element={<CourseCertificate />}
      />
      <Route path="/updates" element={<UpdatesPage />} />
      <Route path="/my-learning" element={<MyLearning />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/portal-login" element={<AdminInstructorLogin />} />
      <Route
        path="/admin-login"
        element={<AdminInstructorLogin expectedRole="admin" />}
      />
      <Route
        path="/instructor-login"
        element={<AdminInstructorLogin expectedRole="instructor" />}
      />
      <Route path="/checkout/:courseId" element={<Checkout />} />

      {/* Protected Instructor Routes */}
      <Route
        element={<InstructorProtectedRoute loginPath="/instructor-login" />}
      >
        <Route path="/instructor" element={<InstructorLayout />}>
          <Route index element={<InstructorOverview />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="courses/new" element={<InstructorCreateCourse />} />
          <Route path="courses/edit/:id" element={<InstructorCreateCourse />} />
          <Route
            path="courses/:id/curriculum"
            element={<CurriculumBuilder />}
          />
          <Route path="videos" element={<InstructorVideos />} />
          <Route path="analytics" element={<InstructorAnalytics />} />
          <Route path="reviews" element={<InstructorReviews />} />
          <Route path="settings" element={<InstructorSettings />} />
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<AdminProtectedRoute loginPath="/admin-login" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="instructors" element={<Instructors />} />
          <Route path="courses" element={<Courses />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="courses/new" element={<InstructorCreateCourse />} />
          <Route path="courses/edit/:id" element={<InstructorCreateCourse />} />
          <Route
            path="courses/:id/curriculum"
            element={<CurriculumBuilder />}
          />
          <Route path="videos" element={<InstructorVideos />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

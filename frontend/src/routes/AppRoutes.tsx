import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import SearchResults from "../pages/searchResults/SearchResults";
import CourseDetails from "../pages/courseDetails/CourseDetails";
import Dashboard from "../pages/myCourses/MyCourses";
import InstructorLayout from "../pages/instructor/instructorLayout/InstructorLayout";
import InstructorOverview from "../pages/instructor/overview/Overview";
import InstructorCourses from "../pages/instructor/courses/Courses";
import InstructorCreateCourse from "../pages/instructor/createCourse/CreateCourse";
import InstructorVideos from "../pages/instructor/videos/Videos";
import InstructorAssessments from "../pages/instructor/assessments/Assessments";
import InstructorReadings from "../pages/instructor/readings/Readings";
import InstructorAnalytics from "../pages/instructor/analytics/Analytics";
import InstructorReviews from "../pages/instructor/reviews/Reviews";
import InstructorSettings from "../pages/instructor/settings/Settings";
import CurriculumBuilder from "../pages/instructor/curriculamBuilder/CurriculumBuilder";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Checkout from "../pages/checkout/CheckoutPage";
import MyLearning from "../pages/myLearning/MyLearning";
import AdminLayout from "../pages/admin/adminLayout/AdminLayout";
import Overview from "../pages/admin/overview/Overview";
import Users from "../pages/admin/users/Users";
import Courses from "../pages/admin/courses/Courses";
import Instructors from "../pages/admin/instructors/Instructors";
import Settings from "../pages/admin/settings/Settings";
import AdminReviews from "../pages/admin/reviews/Reviews";
import Profile from "../pages/profile/Profile";
import CourseLearning from "../pages/courseLearning/CourseLearning";
import CourseContent from "../pages/courseContent/CourseContent";
import CourseAssessment from "../pages/courseAssessment/CourseAssessment";
import CourseAssessmentResult from "../pages/courseAssessmentResult/CourseAssessmentResult";
import AccountSettings from "../pages/accountSettings/AccountSettings";
import CourseCertificate from "../pages/courseCertificate/CourseCertificate";
import UpdatesPage from "../pages/updates/UpdatesPage";
import Accomplishments from "../pages/accomplishments/Accomplishments";
import CertificateVerify from "../pages/certificateVerify/CertificateVerify";

import AdminInstructorLogin from "../pages/auth/adminInstructorLogin/AdminInstructorLogin";
import ProtectedRoute from "../components/auth/ProtectedRoute";
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
      <Route path="/verify/:code" element={<CertificateVerify />} />
      <Route path="/my-courses" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        element={
          <ProtectedRoute allowedRoles={["student"]} loginPath="/login" />
        }
      >
        <Route path="/account/settings" element={<AccountSettings />} />
      </Route>
      <Route
        path="/accomplishments/certificate/:id"
        element={<CourseCertificate />}
      />
      <Route path="/updates" element={<UpdatesPage />} />
      <Route path="/my-learning" element={<MyLearning />} />

      {}
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

      {}
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
          <Route path="assessments" element={<InstructorAssessments />} />
          <Route path="readings" element={<InstructorReadings />} />
          <Route path="analytics" element={<InstructorAnalytics />} />
          <Route path="reviews" element={<InstructorReviews />} />
          <Route path="settings" element={<InstructorSettings />} />
        </Route>
      </Route>

      {}
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
          <Route path="assessments" element={<InstructorAssessments />} />
          <Route path="readings" element={<InstructorReadings />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

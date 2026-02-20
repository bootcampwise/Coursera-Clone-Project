import React from "react";
import { IMAGES } from "../../../constants/images";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { useAdminInstructorLogin } from "./useAdminInstructorLogin";

interface Props {
  expectedRole?: "admin" | "instructor";
}

const AdminInstructorLogin: React.FC<Props> = ({ expectedRole }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  } = useAdminInstructorLogin({ expectedRole });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={IMAGES.LOGO} alt="Coursera" className="h-8 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-dark-3 mb-2">
            {expectedRole
              ? `${expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1)} Login`
              : "Portal Access"}
          </h1>
          <p className="text-text-gray text-sm">
            For Admins and Instructors only
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-text-gray">
            Not an admin or instructor?{" "}
            <a href="/" className="text-primary hover:underline font-medium">
              Go to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminInstructorLogin;

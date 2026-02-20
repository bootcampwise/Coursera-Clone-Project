import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  loginUser,
  registerUser,
  clearError,
} from "../../redux/slices/auth/authSlice";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import Button from "./Button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
  onSwitchToRegister?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
  onSwitchToRegister,
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [step, setStep] = useState<"email" | "password" | "signup-form">(
    "email"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const { signInWithGoogle } = useGoogleAuth();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep(initialMode === "signup" ? "signup-form" : "email");
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleLoginNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email" && email) {
      setStep("password");
    } else if (step === "password") {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        toast.success(`Welcome back, ${result.payload.user.name || "User"}!`);
        resetAndClose();
      } else if (loginUser.rejected.match(result)) {
        toast.error((result.payload as string) || "Login failed");
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    const result = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created successfully! Please log in.");

      setMode("login");
      setStep("email");
      setName("");
      setPassword("");
    } else if (registerUser.rejected.match(result)) {
      toast.error((result.payload as string) || "Registration failed");
    }
  };

  const resetAndClose = () => {
    setStep("email");
    setMode("login");
    setName("");
    setEmail("");
    setPassword("");
    dispatch(clearError());
    onClose();
  };

  const switchToSignup = () => {
    setMode("signup");
    setStep("signup-form");
    setPassword("");
    if (typeof onSwitchToRegister === "function") onSwitchToRegister();
  };

  const switchToLogin = () => {
    setMode("login");
    setStep("email");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto bg-black/50 backdrop-blur-[2px] flex items-start justify-center p-4 sm:p-6 md:items-center">
      {}
      <div className="fixed inset-0" onClick={resetAndClose} />

      {}
      <div className="relative bg-white w-full max-w-[480px] rounded-[8px] shadow-2xl px-8 py-6 md:px-12 md:py-8 animate-in fade-in zoom-in duration-200 my-auto">
        {}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {}
        <div className="mb-6">
          <h2 className="text-[28px] font-semibold text-text-primary mb-2 font-sans tracking-tight">
            {mode === "signup"
              ? "Create your account"
              : step === "email"
                ? "Log in or create account"
                : "Enter your password"}
          </h2>
          <p className="text-[16px] text-text-secondary font-normal leading-relaxed">
            {mode === "signup"
              ? "Join millions of learners from around the world."
              : step === "email"
                ? "Learn on your own time from top universities and businesses."
                : `Welcome back, ${email}`}
          </p>
        </div>

        {}
        {mode === "login" && (
          <form onSubmit={handleLoginNext} className="space-y-4">
            {step === "email" ? (
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-text-primary"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[44px] px-4 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 text-text-primary"
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-text-primary"
                >
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[44px] px-4 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 text-text-primary"
                  required
                />
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="text-primary text-[14px] font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            )}

            <Button
              className="w-full h-[44px] bg-primary! text-white! font-bold! rounded-[4px] hover:bg-primary-hover! shadow-sm"
              type="submit"
              disabled={(step === "email" ? !email : !password) || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {step === "email" ? "Continuing..." : "Logging in..."}
                </span>
              ) : step === "email" ? (
                "Continue"
              ) : (
                "Login"
              )}
            </Button>

            {step === "password" && (
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-primary font-medium text-[14px] hover:underline"
              >
                Back to email
              </button>
            )}
          </form>
        )}

        {}
        {mode === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-text-primary"
              >
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[44px] px-4 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 text-text-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="block text-sm font-bold text-text-primary"
              >
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="signup-email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[44px] px-4 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 text-text-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="block text-sm font-bold text-text-primary"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="signup-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[44px] px-4 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 text-text-primary"
                required
              />
            </div>

            <Button
              className="w-full h-[44px] bg-primary! text-white! font-bold! rounded-[4px] hover:bg-primary-hover! shadow-sm"
              type="submit"
              disabled={!name || !email || !password || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center">
              <span className="text-text-secondary text-sm">
                Already have an account?{" "}
              </span>
              <button
                type="button"
                onClick={switchToLogin}
                className="text-primary font-medium text-sm hover:underline"
              >
                Log in
              </button>
            </div>
          </form>
        )}

        {}
        {mode === "login" && step === "email" && (
          <>
            {}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative px-4 bg-white text-xs text-text-secondary uppercase">
                or
              </span>
            </div>

            {}
            <div className="space-y-3">
              <button
                onClick={signInWithGoogle}
                className="w-full h-[44px] flex items-center justify-center gap-3 border border-gray-300 rounded-[4px] bg-white hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-text-primary">
                  Continue with Google
                </span>
              </button>

              <button className="w-full h-[44px] flex items-center justify-center gap-3 border border-gray-300 rounded-[4px] bg-white hover:bg-gray-50 transition-colors">
                <svg
                  className="w-5 h-5 text-facebook-blue"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  Continue with Facebook
                </span>
              </button>

              <button className="w-full h-[44px] flex items-center justify-center gap-3 border border-gray-300 rounded-[4px] bg-white hover:bg-gray-50 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.05 20.28c-.96.95-2.06 1.43-3.29 1.43-1.2 0-2.22-.44-3.07-1.31-.85-.88-1.28-1.92-1.28-3.13 0-1.2.45-2.25 1.34-3.13.89-.88 1.96-1.32 3.23-1.32 1.25 0 2.33.47 3.24 1.4 1.01 1.03 1.51 2.22 1.51 3.56 0 1.2-.42 2.19-1.25 2.97-.83.78-1.78 1.17-2.85 1.17-1.07 0-2-.39-2.81-1.17-.81-.79-1.21-1.77-1.21-2.97 0-1.34.5-2.52 1.51-3.56.91-.93 1.99-1.4 3.24-1.4 1.27 0 2.34.44 3.23 1.32.89.88 1.34 1.93 1.34 3.13 0 1.21-.43 2.25-1.28 3.13-.85.87-1.87 1.31-3.07 1.31-1.23 0-2.33-.48-3.29-1.43zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  Continue with Apple
                </span>
              </button>
            </div>

            {}
            <div className="mt-6 text-left">
              <button
                onClick={switchToSignup}
                className="text-primary font-medium text-[14px] hover:underline"
              >
                Sign up with your organization
              </button>
            </div>
          </>
        )}

        {}
        <div className="mt-6 space-y-4 text-[12px] text-gray-500 leading-relaxed">
          <p>
            I accept Coursera's{" "}
            <button className="text-primary hover:underline">
              Terms of Use
            </button>{" "}
            and{" "}
            <button className="text-primary hover:underline">
              Privacy Notice
            </button>
            . Having trouble logging in?{" "}
            <button className="text-primary hover:underline">
              Learner help center
            </button>
          </p>
          <p>
            This site is protected by reCAPTCHA Enterprise and the Google{" "}
            <button className="text-primary hover:underline">
              Privacy Policy
            </button>{" "}
            and{" "}
            <button className="text-primary hover:underline">
              Terms of Service
            </button>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

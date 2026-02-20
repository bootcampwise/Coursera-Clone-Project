import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../redux/store";
import { registerUser, clearError } from "../../redux/slices/auth/authSlice";
import Button from "./Button";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created successfully!");

      onSwitchToLogin();
    } else if (registerUser.rejected.match(result)) {
      toast.error((result.payload as string) || "Registration failed");
    }
  };

  const resetAndClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    dispatch(clearError());
    onClose();
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
            Create your account
          </h2>
          <p className="text-[16px] text-text-secondary font-normal leading-relaxed">
            Join Coursera and start learning today.
          </p>
        </div>

        {}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="reg-name"
              className="block text-sm font-bold text-text-primary"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="reg-name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[44px] px-4 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 text-text-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="reg-email"
              className="block text-sm font-bold text-text-primary"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="reg-email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[44px] px-4 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 text-text-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="reg-password"
              className="block text-sm font-bold text-text-primary"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="reg-password"
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
        </form>

        <div className="mt-6 text-left text-sm text-text-secondary">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-primary font-bold hover:underline"
          >
            Log in
          </button>
        </div>

        {}
        <div className="mt-6 space-y-4 text-[12px] text-gray-500 leading-relaxed">
          <p>
            By clicking Create Account, you agree to our{" "}
            <button className="text-primary hover:underline">
              Terms of Use
            </button>{" "}
            and{" "}
            <button className="text-primary hover:underline">
              Privacy Notice
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

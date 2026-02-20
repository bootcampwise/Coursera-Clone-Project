import React from "react";

interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullPage = true,
  message = "Loading...",
  className = "",
}) => {
  const spinner = (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      {message && (
        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;

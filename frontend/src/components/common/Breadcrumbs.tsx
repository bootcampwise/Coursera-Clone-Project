import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  return (
    <nav className="flex items-center gap-2 text-[12px] font-medium text-primary py-4 font-sans">
      <Link
        to="/"
        className="text-text-secondary hover:text-primary transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      <span className="text-text-secondary">/</span>
      <Link to="/certificates" className="hover:underline">
        Google Career Certificates - DAT
      </Link>

      <span className="text-text-secondary">/</span>
      <Link to="/female" className="hover:underline">
        Female
      </Link>

      <span className="text-text-secondary">/</span>
      <span className="text-text-primary capitalize">Search</span>
    </nav>
  );
};

export default Breadcrumbs;


















































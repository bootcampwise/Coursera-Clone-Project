import React from "react";
import { Link } from "react-router-dom";

export interface UpdateCardProps {
  id: number;
  type: "certificate" | "welcome" | "general" | "announcement";
  title: string;
  message: string;
  time: string;
  image?: string;
  isRead: boolean;
  link: string;
  actionText?: string;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
  type,
  title,
  message,
  time,
  image,
  isRead,
  link,
  actionText,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row gap-6 p-8 rounded-sm ${
        isRead ? "bg-surface" : "bg-surface"
      }`}
    >
      <div className="shrink-0">
        {}
        {image ? (
          <img
            src={image}
            alt=""
            className="w-[80px] h-[80px] rounded object-cover"
          />
        ) : type === "certificate" ? (
          <div className="w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center">
            <span className="text-3xl font-bold font-serif">C</span>
          </div>
        ) : (
          <div className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 flex items-center justify-center p-3">
            <svg
              className="w-full h-full text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 font-sans">
        <div className="mb-1">
          <span className="text-[12px] text-text-gray font-normal">{time}</span>
        </div>

        <h3 className="text-[20px] font-normal text-gray-dark-3 leading-snug mb-3">
          {title}
        </h3>

        <div className="text-[14px] text-gray-medium-dark-2 leading-relaxed mb-6 max-w-[95%]">
          {message}
        </div>

        {actionText && (
          <div>
            <Link
              to={link}
              className="text-[14px] font-semibold text-primary hover:underline no-underline"
            >
              {actionText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCard;


















































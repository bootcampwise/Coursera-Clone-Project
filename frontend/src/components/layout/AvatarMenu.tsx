import React from "react";
import { useNavigate } from "react-router-dom";

interface AvatarMenuProps {
  onLogout: () => void;
  onClose: () => void;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({ onLogout, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "My Courses", path: "/my-courses" },
    { label: "Profile", path: "/profile" },
    { label: "Setting", path: "/account/settings" },
    { label: "Updates", path: "/updates" },
    { label: "Accomplishments", path: "/accomplishments" },
    { label: "Log Out", action: onLogout },
  ];

  return (
    <div className="absolute right-0 mt-3 w-[250px] bg-white rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-border-light py-6 z-50">
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            onClose();
            if (item.action) {
              item.action();
            } else if (item.path) {
              navigate(item.path);
            }
          }}
          className="w-full text-left px-9 py-3.5 text-[16px] text-gray-dark-3 hover:bg-surface transition-colors border-none bg-transparent cursor-pointer font-medium"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default AvatarMenu;

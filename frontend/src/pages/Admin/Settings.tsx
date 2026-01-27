import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../features/auth/adminAuthSlice";
import type { AppDispatch } from "../../app/store";

const Settings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      await dispatch(logoutAdmin());
      navigate("/admin-login");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-6">
            Profile Information
          </h3>

          <div className="flex items-center gap-6 pb-6 mb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center text-white font-semibold text-lg shadow-md">
              AD
            </div>
            <div>
              <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
                Change Avatar
              </button>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="Administrator"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@coursera.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-6">
            Security Settings
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Password Rotation
                </p>
                <p className="text-xs text-gray-500">
                  Last changed: 14 days ago
                </p>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
                Change Password
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-500">
                  Receive email updates about account activity
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  emailNotifications ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    emailNotifications ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-6">
            System Preferences
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-6">
            Account Actions
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Sign Out
              </p>
              <p className="text-xs text-gray-500">
                Sign out of your account on this device
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 border border-red-200 text-sm font-medium text-red-700 rounded-lg hover:bg-red-100 transition-all"
            >
              Log Out
            </button>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4">
          <button className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

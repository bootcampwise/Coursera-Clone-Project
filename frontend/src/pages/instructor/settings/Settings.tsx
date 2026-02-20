import React from "react";
import { useInstructorSettings } from "./useInstructorSettings";

const Settings: React.FC = () => {
  const {
    name,
    setName,
    email,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    twoFactorEnabled,
    setTwoFactorEnabled,
    emailNotifications,
    setEmailNotifications,
    showPasswordModal,
    setShowPasswordModal,
    handleUpdateProfile,
    handleChangePassword,
    handleLogout,
  } = useInstructorSettings();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Instructor Settings
        </h1>
        <p className="text-sm text-gray-500">
          Manage studio preferences and security.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-6">
            Profile
          </h3>

          <div className="flex items-center gap-6 pb-6 mb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center text-white font-semibold text-lg shadow-md">
              IN
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-6">
            Security
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Change Password
                </p>
                <p className="text-xs text-gray-500">
                  Update your account password
                </p>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Change Password
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500">
                  Protect your studio account
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled((v) => !v)}
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
                  Email Notifications
                </p>
                <p className="text-xs text-gray-500">
                  Get alerts about reviews and enrollments
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications((v) => !v)}
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

        <div className="flex justify-end gap-3 pt-2">
          <button className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
            Cancel
          </button>
          <button
            onClick={handleUpdateProfile}
            disabled={isLoading}
            className="px-6 py-2.5 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {isLoading ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

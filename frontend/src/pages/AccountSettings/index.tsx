import { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { updateUserProfile } from "../../features/auth/authSlice";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";

const AccountSettings: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFullName(user?.name || "");
  }, [user?.name]);

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      toast.error("Full name is required");
      return;
    }

    try {
      setIsSaving(true);
      await dispatch(updateUserProfile({ name: trimmedName })).unwrap();
      toast.success("Profile updated");
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F5FA] font-sans text-[#1f1f1f]">
      <Header />

      <main className="max-w-[1140px]  mx-auto px-4 md:px-12 py-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Left Sidebar */}
          <aside className="w-full md:w-[220px] shrink-0 md:sticky md:top-24 pt-1 h-fit">
            <nav className="flex flex-col">
              <button className="flex items-center gap-3 text-left w-full px-1.5 py-2.5 text-[14px] font-bold text-[#5f33e1] border-l-[3px] border-[#5f33e1] bg-transparent transition-colors cursor-pointer border-none">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Account
              </button>
              <button className="flex items-center gap-3 text-left w-full px-3 py-2.5 text-[14px] text-[#1f1f1f] hover:text-[#5f33e1] transition-all bg-transparent border-none cursor-pointer">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Communications
              </button>
              <button className="flex items-center gap-3 text-left w-full px-3 py-2.5 text-[14px] text-[#1f1f1f] hover:text-[#5f33e1] transition-all bg-transparent border-none cursor-pointer">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                Notes & Highlights
              </button>
              <button className="flex items-center gap-3 text-left w-full px-3 py-2.5 text-[14px] text-[#1f1f1f] hover:text-[#5f33e1] transition-all bg-transparent border-none cursor-pointer">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Calendar Sync
              </button>
            </nav>
          </aside>

          {/* Right Content */}
          <div className="flex-1 w-full bg-white rounded-[4px] border border-[#e1e1e1] p-12 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h1 className="text-[30px] font-normal mb-10 text-[#1f1f1f]">
              Account
            </h1>

            <form className="space-y-2" onSubmit={handleSaveProfile}>
              {/* Name Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                <div className="space-y-2">
                  <label className="text-[14px] font-normal text-[#1f1f1f]">
                    Full name <span className="text-[#C02626]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="w-full h-[44px] px-4 rounded-[4px] border border-[#ced4da] text-[15px] focus:outline-none focus:border-[#0056D2] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-normal text-[#1f1f1f]">
                    Email address <span className="text-[#C02626]">*</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full h-[44px] px-4 rounded-[4px] border border-[#ced4da] text-[15px] bg-[#F0F4F9] text-[#5f6368] cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-normal text-[#1f1f1f]">
                    Timezone
                  </label>
                  <div className="relative">
                    <select className="w-full h-[44px] px-4 rounded-[4px] border border-[#ced4da] text-[15px] bg-white focus:outline-none focus:border-[#0056D2] appearance-none cursor-pointer">
                      <option>Asia/Karachi</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5f6368]">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-normal text-[#1f1f1f]">
                    Language
                  </label>
                  <div className="relative">
                    <select className="w-full h-[44px] px-4 rounded-[4px] border border-[#ced4da] text-[15px] bg-white focus:outline-none focus:border-[#0056D2] appearance-none cursor-pointer">
                      <option>English</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5f6368]">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-[4px] border border-[#0056D2] text-[#0056D2] text-[14px] font-bold hover:bg-[#F0F4F9] transition-all bg-transparent cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>

              <hr className="border-[#e1e1e1] my-12" />

              {/* Personal Account Section */}
              <div className="space-y-1">
                <h2 className="text-[18px] font-normal text-[#1f1f1f] mb-4">
                  Personal Account
                </h2>
                <p className="text-[15px] text-[#1A1317] leading-relaxed max-w-[520px]">
                  Add your personal account here, so you'll still have access to
                  Coursera courses after you leave your current company.
                </p>
                <p className="text-[15px] text-[#1A1317] font-normal">
                  Add Alternative Email
                </p>
                <div className="space-y-2 max-w-[520px]">
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full h-[38px] px-3 bg-[#F0F4F9] rounded-[4px] border border-[#ced4da] text-[13px] text-[#5f6368] cursor-not-allowed"
                  />
                </div>
                <div className="pt-2 mb-12">
                  <button
                    type="button"
                    disabled
                    className="px-4 py-1.5 rounded-[4px] border border-[#c9d4ea] text-[#9aa8c2] text-[12px] font-bold bg-[#eef2f8] cursor-not-allowed"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-2">
                <h2 className="text-[18px] font-normal text-[#1f1f1f]">
                  Password
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[15px] font-normal text-[#1A1317]">
                      Current password <span className="text-[#C02626]">*</span>
                    </label>
                    <input
                      type="password"
                      className="w-full h-[36px] px-3 border border-[#ced4da] rounded-[4px] text-[14px] focus:border-[#0056D2] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[15px] font-normal text-[#1A1317]">
                      New password <span className="text-[#C02626]">*</span>
                    </label>
                    <input
                      type="password"
                      className="w-full h-[36px] px-3 border border-[#ced4da] rounded-[4px] text-[14px] focus:border-[#0056D2] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[15px] font-normal text-[#1A1317]">
                      Retype password <span className="text-[#C02626]">*</span>
                    </label>
                    <input
                      type="password"
                      className="w-full h-[36px] px-3 border border-[#ced4da] rounded-[4px] text-[14px] focus:border-[#0056D2] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-[4px] border border-[#0056D2] text-[#0056D2] text-[14px] font-medium hover:bg-[#F0F4F9] transition-all bg-white"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              <hr className="border-[#e1e1e1] my-8" />

              {/* Verify My ID Section */}
              <div className="mt-10 space-y-2">
                <h3 className="text-[18px] font-normal text-[#1f1f1f]">
                  Verify My ID
                </h3>

                <p className="text-[15px] text-[#1A1317] leading-[20px]">
                  Your name,{" "}
                  <span className="font-semibold text-[#1A1317]">
                    Zainab Murtaza
                  </span>
                  , is{" "}
                  <span className="font-semibold text-[#1A1317]">verified</span>
                  . This is the name that will appear on your certificates.
                </p>

                <p className="text-[15px] text-[#1A1317]">
                  If you have questions or need help with your ID Verification,{" "}
                  <a
                    href="#"
                    className="text-[#0056D2] font-medium hover:underline"
                  >
                    visit our ID Verification support page
                  </a>
                  .
                </p>
              </div>

              <hr className="border-[#e1e1e1] my-10" />

              {/* Two Factor Authentication Section */}
              <div className="mt-10 space-y-4">
                <h3 className="text-[18px] font-normal text-[#1f1f1f]">
                  Two Factor Authentication{" "}
                  <span className="text-[#6c757d]">(BETA)</span>
                </h3>

                {/* Constrained text width like Figma */}
                <p className="max-w-[500px] text-[15px] text-[#1A1317] leading-[20px]">
                  Two-Factor Authentication adds an additional layer of security
                  to your Coursera account. Each time you log in to Coursera,
                  you will be asked to enter a unique code that is only
                  available on your mobile phone. This extra protection ensures
                  that you are the only one who will have access to your
                  Coursera account and courses.
                </p>

                <div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-[4px] border border-[#0056D2] text-[#0056D2] text-[14px] font-medium hover:bg-[#F0F4F9] transition-all bg-white"
                  >
                    Enable Two-Factor Authentication?
                  </button>
                </div>
              </div>

              <hr className="border-[#e1e1e1] my-10" />

              {/* Connected Devices Section */}
              <div className="mt-10 space-y-4">
                <h3 className="text-[18px] font-normal text-[#1f1f1f]">
                  Connected devices
                </h3>

                {/* Constrained text width like Figma */}
                <p className="text-[15px] text-[#1A1317] leading-[20px]">
                  If your account has been logged into on multiple devices, you
                  can log out from here.
                </p>

                <div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-[4px] border border-[#0056D2] text-[#0056D2] text-[14px] font-medium hover:bg-[#F0F4F9] transition-all bg-white"
                  >
                    Log out from all devices
                  </button>
                </div>
              </div>

              <hr className="border-[#e1e1e1] my-10" />

              {/* Linked Accounts */}
              <div className="space-y-10">
                <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                  Linked Accounts
                </h2>
                <p className="text-[14px] text-[#5f6368] leading-relaxed max-w-[700px]">
                  You can use your Linked Accounts to{" "}
                  <span className="text-[#C02626] font-bold italic">
                    Log In
                  </span>{" "}
                  into your account with ease. If you wish to unlink your
                  previously linked account, kindly follow the instructions
                  below:{" "}
                  <span className="text-[#0056D2] cursor-pointer hover:underline">
                    Link or unlink an app in Gmail
                  </span>
                </p>

                {/* Facebook Section */}
                <div className="space-y-4">
                  <h3 className="text-[16px] font-bold text-[#1f1f1f]">
                    Facebook Account
                  </h3>
                  <div className="flex items-center gap-3 text-[14px] text-[#1f1f1f] bg-[#F0F4F9] px-4 py-3 rounded-[4px] border border-[#ced4da] font-medium">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#1877F2"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Linked to Facebook
                    <button
                      type="button"
                      className="ml-auto text-[13px] font-bold text-[#0056D2] hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Unlink from Facebook Account
                    </button>
                  </div>
                  <p className="text-[12px] italic text-[#5f6368]">
                    Create a profile, so we can use your account data
                    efficiently and recommendations.
                  </p>
                </div>

                {/* Apple Section */}
                <div className="space-y-4">
                  <h3 className="text-[16px] font-bold flex items-center gap-2 text-[#1f1f1f]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.021-.013-3.182-1.221-3.22-4.857-.026-3.039 2.48-4.507 2.597-4.585-1.429-2.091-3.61-2.325-4.39-2.376-2.015-.163-3.415.939-4.303.939zM15.82 2.1c.844-1.013 1.4-2.427 1.246-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                    </svg>
                    Apple
                  </h3>
                  <div className="space-y-4">
                    <button
                      type="button"
                      className="px-5 py-2 rounded-[4px] border border-[#0056D2] text-[#0056D2] text-[14px] font-bold hover:bg-[#F0F4F9] transition-all bg-transparent cursor-pointer"
                    >
                      Link my Apple account
                    </button>
                    <p className="text-[12px] italic text-[#5f6368]">
                      Link your Apple account so we can personalized
                      recommendation.
                    </p>
                  </div>
                </div>

                {/* Google Section */}
                <div className="space-y-4">
                  <h3 className="text-[16px] font-bold flex items-center gap-2 text-[#1f1f1f]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_'G'_logo.svg"
                      alt="Google"
                      className="w-4 h-4"
                    />
                    Google
                  </h3>
                  <p className="text-[14px] text-[#5f6368]">
                    This User account is Linked to follow this Google account:
                  </p>
                  <div className="flex items-center gap-3 text-[14px] text-[#1f1f1f] bg-[#F0F4F9] px-4 py-3 rounded-[4px] border border-[#ced4da] font-medium">
                    {user?.email}
                    <button
                      type="button"
                      className="ml-auto text-[13px] font-bold text-[#0056D2] hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Unlink my Google Account
                    </button>
                  </div>
                </div>
              </div>

              <hr className="border-[#e1e1e1]" />

              {/* Delete account Section */}
              <div className="space-y-6">
                <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                  Delete account
                </h2>
                <div className="text-[14px] text-[#5f6368] leading-relaxed max-w-[700px] space-y-4">
                  <p>
                    Kindly note that deleting account is{" "}
                    <span className="text-[#C02626] font-bold italic">
                      permanent and cannot be undone
                    </span>
                    . All your data, including your certificates, will be{" "}
                    <span className="text-[#C02626] font-bold italic">
                      irretrievably lost
                    </span>
                    .
                  </p>
                  <p>
                    This action cannot be undone.{" "}
                    <span className="text-[#C02626] font-bold underline cursor-pointer">
                      Learn more about what happens when you delete your account
                    </span>
                    .
                  </p>
                </div>
                <button
                  type="button"
                  className="px-5 py-2 rounded-[4px] border border-[#0056D2] text-[#0056D2] text-[14px] font-bold hover:bg-[#F0F4F9] transition-all bg-transparent cursor-pointer"
                >
                  Delete Account
                </button>
              </div>

              <hr className="border-[#e1e1e1]" />

              {/* Communication email Section */}
              <div className="space-y-6 pb-4">
                <h2 className="text-[20px] font-bold text-[#1f1f1f]">
                  Communication email
                </h2>
                <p className="text-[14px] text-[#5f6368] leading-relaxed max-w-[700px]">
                  This email is used so Coursera can{" "}
                  <span className="text-[#0056D2] cursor-pointer hover:underline">
                    send test email
                  </span>{" "}
                  directly to you. It will not change your Account email used
                  for log in.
                </p>
                <div className="flex items-center gap-4 max-w-[500px]">
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    className="flex-1 h-[44px] px-4 bg-[#F0F4F9] rounded-[4px] border border-[#ced4da] text-[15px] focus:outline-none focus:border-[#0056D2]"
                  />
                  <button
                    type="button"
                    className="shrink-0 px-5 py-2.5 rounded-[4px] border border-[#0056D2] text-[#0056D2] text-[14px] font-bold hover:bg-[#F0F4F9] transition-all bg-transparent cursor-pointer"
                  >
                    Send test email
                  </button>
                </div>
                <p className="text-[12px] italic text-[#5f6368]">
                  Visit manage subscription to decide what types of email you
                  get from Coursera.{" "}
                  <span className="text-[#0056D2] cursor-pointer hover:underline">
                    Visit page.
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
};

export default AccountSettings;

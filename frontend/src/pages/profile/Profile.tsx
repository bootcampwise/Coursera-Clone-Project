import React from "react";
import Button from "../../components/common/Button";
import ProfileHeader from "../../components/layout/ProfileHeader";
import Footer from "../../components/home/Footer";
import { IMAGES } from "../../constants/images";
import { useProfile } from "./useProfile";
import type {
  EducationInput,
  ProfileCertificateInput,
} from "../../services/userApi";

const EditIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const PaperclipIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.2a2 2 0 0 1-2.82-2.83l8.48-8.48" />
  </svg>
);

const PlusIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10 12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UserProfile: React.FC = () => {
  const {
    user,
    displayName,
    displayInitials,
    avatarBg,
    workExperiences,
    isWorkModalOpen,
    setIsWorkModalOpen,
    editingWorkId,
    isLoadingWork,
    isSavingWork,
    isDeletingWorkId,
    educations,
    profileCertificates,
    completedCourses,
    isCredentialModalOpen,
    credentialModalType,
    setCredentialModalType,
    editingEducationId,
    editingProfileCertificateId,
    isLoadingCredentials,
    isLoadingCompletedCourses,
    isSavingCredential,
    isDeletingCredentialId,
    educationForm,
    setEducationForm,
    certificateForm,
    setCertificateForm,
    workForm,
    setWorkForm,
    isWorkFormValid,
    isEducationFormValid,
    isCertificateFormValid,
    resetWorkForm,
    openAddWorkModal,
    openEditWorkModal,
    handleSaveWorkExperience,
    handleDeleteWorkExperience,
    openCredentialSelectionModal,
    closeCredentialModal,
    openAddEducationModal,
    openEditEducationModal,
    openAddCertificateModal,
    openEditCertificateModal,
    handleSaveEducation,
    handleSaveCertificate,
    handleDeleteEducation,
    handleDeleteCertificate,
    formatMonthYear,
    formatCompletionDate,
  } = useProfile();

  return (
    <div className="min-h-screen bg-profile">
      <ProfileHeader />

      <main className="max-w-7xl mx-auto p-6 md:p-10 lg:p-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[5fr_13fr]">
          <aside className="col-span-1">
            <div className="rounded-[12px] bg-white px-6 py-8 flex flex-col items-center text-center mb-5">
              <div className="relative w-full mb-6">
                <p className="font-normal text-[22px] leading-[19px] text-bg-light">
                  Personal details
                </p>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:text-primary-hover bg-transparent border-none cursor-pointer p-0">
                  <EditIcon />
                </button>
              </div>

              <div
                className="mb-6 flex items-center justify-center rounded-full text-white font-normal text-[64px] w-[160px] h-[160px] overflow-hidden"
                style={{ backgroundColor: avatarBg }}
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  displayInitials
                )}
              </div>

              <p className="mb-6 font-normal text-[28px] leading-[22px] text-blue-dark">
                {displayName}
              </p>

              <Button
                variant="outline"
                className="w-full max-w-[260px] h-[62px] text-[18px] font-normal mb-4 flex items-center justify-center gap-2 border-blue-medium-2 text-blue-medium-2 hover:bg-transparent px-4"
              >
                <PaperclipIcon />
                <span>Share profile link</span>
              </Button>

              <button className="font-normal text-[18px] leading-[16px] text-blue-medium-4 bg-transparent border-none cursor-pointer">
                Update profile visibility
              </button>
            </div>

            <div className="rounded-[12px] bg-white px-6 py-6 mb-5">
              <p className="mb-4 font-semibold text-[22px] leading-[20px] text-text-primary text-left">
                Highlights
              </p>

              <div className="flex items-start gap-4">
                <img
                  src={IMAGES.LOGOS.GOOGLE_LOGO}
                  alt="Google"
                  className="w-[40px] h-[40px] shrink-0 object-contain"
                />

                <div className="flex flex-col gap-1">
                  <p className="font-normal text-[14px] leading-[15px] text-text-darkest">
                    Google Prompting Essentials
                  </p>
                  <p className="font-normal text-[14px] leading-[15px] text-text-darkest">
                    Specialization (Google)
                  </p>
                  <button className="mt-1 font-normal text-[14px] leading-[13px] text-blue-medium-5 text-left bg-transparent border-none cursor-pointer p-0">
                    View certificate
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] bg-white px-6 py-6 flex flex-col items-center text-center mb-5">
              <p className="font-normal text-[16px] leading-[17px] text-text-secondary-dark mb-5">
                Let recruiters know what role you&apos;re looking for to make
                sure you find opportunities that are right for you.
              </p>

              <Button
                variant="outline"
                className="w-full max-w-[260px] h-[48px] text-[16px] font-normal flex items-center justify-center gap-2 border-primary text-primary hover:bg-transparent px-4"
              >
                <PlusIcon />
                <span>Add work preferences</span>
              </Button>
            </div>

            <div className="rounded-[12px] bg-white px-6 py-6 flex flex-col items-center text-center mb-5">
              <p className="mb-4 font-normal text-[22px] leading-[18px] text-text-dark">
                Additional info
              </p>

              <p className="mb-6 font-normal text-[16px] leading-[17px] text-text-secondary-dark">
                Help recruiters get to know you better by describing what makes
                you a great candidate and sharing other links.
              </p>

              <Button
                variant="outline"
                className="w-full max-w-[260px] h-[48px] text-[16px] font-normal flex items-center justify-center gap-2 border-blue-medium-4 text-blue-medium-4 hover:bg-transparent px-4"
              >
                <PlusIcon />
                <span>Add additional info</span>
              </Button>
            </div>
          </aside>

          <div className="col-span-1">
            <section>
              <p className="mb-6 font-normal text-[28px] leading-[24px] text-text-darker">
                Experience
              </p>

              <div className="rounded-[12px] bg-white px-6 py-10 mb-5">
                <div className="mb-4 flex items-center gap-2">
                  <p className="font-normal text-[22px] leading-[20px] text-text-darkest">
                    Projects
                  </p>
                  <img
                    src={IMAGES.UI.EXCLAMATORY_ICON}
                    alt="Info"
                    className="w-[16px] h-[16px] object-contain"
                  />
                </div>

                <div className="rounded-[8px] bg-light-blue px-5 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-12">
                  <p className="font-normal text-[17px] leading-[22px] text-text-muted-dark max-w-[600px]">
                    Showcase your skills to recruiters with job-relevant
                    projects.
                    <br />
                    Add projects here to demonstrate your technical expertise
                    and ability to solve real-world problems.
                  </p>

                  <button className="font-normal text-[15px] leading-[15px] text-blue-medium-5 whitespace-nowrap bg-transparent border-none cursor-pointer p-0">
                    Browse Projects
                  </button>
                </div>
              </div>
            </section>

            <div className="rounded-[12px] bg-white px-6 py-6">
              <div className="mb-4 flex items-center gap-2">
                <p className="font-normal text-[22px] leading-[20px] text-text-darkest">
                  Work history
                </p>
              </div>

              <div className="rounded-[8px] bg-light-blue px-5 py-6 flex flex-col gap-4 mt-12">
                {isLoadingWork ? (
                  <p className="font-normal text-[15px] leading-[24px] text-text-muted-dark">
                    Loading work experience...
                  </p>
                ) : workExperiences.length > 0 ? (
                  <div className="space-y-4">
                    {workExperiences.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-border-custom rounded-[8px] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[17px] leading-[22px] text-text-darkest font-medium">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => openEditWorkModal(item)}
                              className="text-[12px] font-medium text-primary hover:underline bg-transparent border-none cursor-pointer p-0"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteWorkExperience(item.id)
                              }
                              disabled={isDeletingWorkId === item.id}
                              className="text-[12px] font-medium text-error-custom hover:underline disabled:opacity-60 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer p-0"
                            >
                              {isDeletingWorkId === item.id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </div>
                        <p className="text-[15px] leading-[20px] text-text-muted-2 mt-1">
                          {item.company}
                          {item.location ? `, ${item.location}` : ""}
                        </p>
                        <p className="text-[13px] leading-[18px] text-text-muted-3 mt-1">
                          {item.startDate}
                          {" - "}
                          {item.isCurrent
                            ? "Present"
                            : item.endDate || "Present"}
                          {item.employmentType
                            ? ` | ${item.employmentType}`
                            : ""}
                        </p>
                        {item.description ? (
                          <p className="text-[14px] leading-[22px] text-text-muted-dark mt-2">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-normal text-[17px] leading-[28px] text-text-muted-dark max-w-[650px]">
                    Add your past work experience here. If you&apos;re just
                    starting out, you can add internships or volunteer
                    experience instead.
                  </p>
                )}

                <Button
                  variant="outline"
                  onClick={openAddWorkModal}
                  className="w-full max-w-[260px] h-[48px] text-[16px] font-normal flex items-center justify-center gap-2 border-blue-medium-3 text-blue-medium-3 hover:bg-transparent px-4"
                >
                  <PlusIcon />
                  <span>Add work experience</span>
                </Button>
              </div>
            </div>

            <section>
              <p className="mb-6 font-normal text-[28px] leading-[24px] text-text-darker mt-12">
                Education
              </p>

              <div className="rounded-[12px] bg-white px-6 py-10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-normal text-[22px] leading-[20px] text-text-darkest">
                      Credentials
                    </p>
                    <img
                      src={IMAGES.UI.EXCLAMATORY_ICON}
                      alt="Info"
                      className="w-[16px] h-[16px] object-contain"
                    />
                  </div>

                  <Button
                    variant="outline"
                    onClick={openCredentialSelectionModal}
                    className="h-[32px] px-4 text-[14px] font-normal flex items-center gap-2 border-primary text-primary hover:bg-transparent"
                  >
                    <PlusIcon size={12} />
                    <span>Add</span>
                  </Button>
                </div>
                {isLoadingCredentials ? (
                  <p className="font-normal text-[15px] text-shade-5">
                    Loading credentials...
                  </p>
                ) : educations.length === 0 &&
                  profileCertificates.length === 0 ? (
                  <p className="font-normal text-[15px] text-shade-5">
                    Add your education or certification details to show your
                    credentials.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {educations.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded bg-bg-light-blue text-gray-dark-3">
                          <GraduationCapIcon />
                        </div>

                        <div className="flex-1">
                          <p className="font-normal text-[15px] text-gray-dark-2">
                            {item.instituteName}
                          </p>

                          <p className="font-normal text-[14px] text-shade-5">
                            {item.degreeDetails}
                          </p>

                          <p className="font-normal text-[13px] text-shade-6">
                            {formatMonthYear(item.startDate)} -{" "}
                            {formatMonthYear(item.endDate)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => openEditEducationModal(item)}
                            className="text-[12px] font-medium text-primary hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEducation(item.id)}
                            disabled={isDeletingCredentialId === item.id}
                            className="text-[12px] font-medium text-error-custom hover:underline disabled:opacity-60 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer p-0"
                          >
                            {isDeletingCredentialId === item.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    ))}

                    {profileCertificates.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <img
                          src={IMAGES.LOGOS.GOOGLE_LOGO}
                          alt="Google"
                          className="w-[40px] h-[40px] object-contain"
                        />

                        <div className="flex-1">
                          <p className="font-normal text-[15px] text-gray-dark-2">
                            {item.certificateName}
                          </p>

                          <button
                            type="button"
                            className="mt-1 font-normal text-[14px] text-primary bg-transparent border-none cursor-pointer p-0"
                          >
                            View certificate
                          </button>

                          <p className="mt-1 font-normal text-[13px] text-shade-6">
                            Completed {formatMonthYear(item.completionDate)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => openEditCertificateModal(item)}
                            className="text-[12px] font-medium text-primary hover:underline bg-transparent border-none cursor-pointer p-0"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCertificate(item.id)}
                            disabled={isDeletingCredentialId === item.id}
                            className="text-[12px] font-medium text-error-custom hover:underline disabled:opacity-60 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer p-0"
                          >
                            {isDeletingCredentialId === item.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <p className="mb-6 font-normal text-[28px] leading-[24px] text-gray-dark-1 mt-12">
                Courses
              </p>

              <div className="rounded-[12px] bg-white px-6 py-10">
                <div className="mb-4 flex items-center gap-2">
                  <p className="font-normal text-[22px] leading-[20px] text-gray-dark-2">
                    Courses
                  </p>
                  <img
                    src={IMAGES.UI.EXCLAMATORY_ICON}
                    alt="Info"
                    className="w-[16px] h-[16px] object-contain"
                  />
                </div>

                {isLoadingCompletedCourses ? (
                  <p className="font-normal text-[15px] text-shade-5">
                    Loading completed courses...
                  </p>
                ) : completedCourses.length === 0 ? (
                  <p className="font-normal text-[15px] text-shade-5">
                    Complete a course on Coursera to see it here.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {completedCourses.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <img
                          src={IMAGES.LOGOS.GOOGLE_LOGO}
                          alt="Google"
                          className="w-[40px] h-[40px] object-contain"
                        />

                        <div className="flex-1">
                          <p className="font-normal text-[15px] text-gray-dark-2">
                            {item.courseTitle || "Course"}
                          </p>
                          <p className="font-normal text-[14px] text-shade-5">
                            Google Course
                          </p>
                          <button
                            type="button"
                            className="mt-1 font-normal text-[14px] text-primary bg-transparent border-none cursor-pointer p-0"
                          >
                            View certificate
                          </button>
                          <p className="mt-1 font-normal text-[13px] text-shade-6">
                            Completed {formatCompletionDate(item.issuedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {isWorkModalOpen && (
        <div className="fixed inset-0 z-100 flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <button
            type="button"
            aria-label="Close modal backdrop"
            className="absolute inset-0 bg-black/35 border-none cursor-default"
            onClick={() => {
              setIsWorkModalOpen(false);
              resetWorkForm();
            }}
          />

          <div className="relative w-full max-w-[640px] max-h-[calc(100vh-2rem)] bg-white rounded-[10px] border border-border-custom shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-ultra-light">
              <h3 className="text-[20px] font-medium text-gray-dark-2">
                {editingWorkId ? "Edit work experience" : "Add work experience"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsWorkModalOpen(false);
                  resetWorkForm();
                }}
                className="w-9 h-9 rounded-[6px] border border-border-custom text-shade-4 hover:bg-blue-light-3 bg-transparent cursor-pointer flex items-center justify-center"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                  Job title
                </label>
                <input
                  type="text"
                  value={workForm.title}
                  onChange={(e) =>
                    setWorkForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Frontend Developer"
                  className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  value={workForm.company}
                  onChange={(e) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  placeholder="e.g. Google"
                  className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                  Employment type
                </label>
                <input
                  type="text"
                  value={workForm.employmentType}
                  onChange={(e) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      employmentType: e.target.value,
                    }))
                  }
                  placeholder="e.g. Full-time"
                  className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={workForm.location}
                  onChange={(e) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="e.g. Lahore"
                  className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                  Start date
                </label>
                <input
                  type="month"
                  value={workForm.startDate}
                  onChange={(e) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                  End date
                </label>
                <input
                  type="month"
                  value={workForm.endDate}
                  onChange={(e) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  disabled={Boolean(workForm.isCurrent)}
                  className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary disabled:bg-blue-light-4 disabled:text-shade-9"
                />
              </div>

              <div className="md:col-span-2">
                <label className="inline-flex items-center gap-2 text-[13px] text-shade-8 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(workForm.isCurrent)}
                    onChange={(e) =>
                      setWorkForm((prev) => ({
                        ...prev,
                        isCurrent: e.target.checked,
                        endDate: e.target.checked ? "" : prev.endDate,
                      }))
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  I currently work here
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                  Description
                </label>
                <textarea
                  value={workForm.description}
                  onChange={(e) =>
                    setWorkForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Describe your responsibilities and achievements"
                  className="w-full px-3 py-2.5 rounded-[6px] border border-border-light text-[14px] resize-y focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border-ultra-light flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsWorkModalOpen(false);
                  resetWorkForm();
                }}
                className="h-[40px] px-4 rounded-[6px] border border-border-light text-[14px] text-shade-10 hover:bg-blue-light-5 bg-transparent cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!isWorkFormValid || isSavingWork}
                onClick={handleSaveWorkExperience}
                className="h-[40px] px-5 rounded-[6px] bg-primary text-white text-[14px] font-medium hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed border-none cursor-pointer"
              >
                {isSavingWork ? "Saving..." : editingWorkId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCredentialModalOpen && (
        <div className="fixed inset-0 z-101 flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <button
            type="button"
            aria-label="Close modal backdrop"
            className="absolute inset-0 bg-black/35 border-none cursor-default"
            onClick={closeCredentialModal}
          />

          <div className="relative w-full max-w-[560px] max-h-[calc(100vh-2rem)] bg-white rounded-[10px] border border-border-custom shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-ultra-light">
              <h3 className="text-[20px] font-medium text-gray-dark-2">
                {credentialModalType === "selector"
                  ? "Add credential"
                  : credentialModalType === "education"
                    ? editingEducationId
                      ? "Edit education"
                      : "Add education"
                    : editingProfileCertificateId
                      ? "Edit certificate"
                      : "Add certificate"}
              </h3>
              <button
                type="button"
                onClick={closeCredentialModal}
                className="w-9 h-9 rounded-[6px] border border-border-custom text-shade-4 hover:bg-blue-light-3 bg-transparent cursor-pointer flex items-center justify-center"
              >
                <CloseIcon />
              </button>
            </div>

            {credentialModalType === "selector" ? (
              <div className="px-6 py-6 space-y-3">
                <button
                  type="button"
                  onClick={openAddEducationModal}
                  className="w-full rounded-[8px] border border-border-light hover:border-primary text-left px-4 py-3 bg-white cursor-pointer"
                >
                  <p className="text-[15px] font-medium text-gray-dark-2">
                    Add education
                  </p>
                  <p className="text-[13px] text-shade-7-alt mt-1">
                    Institute name, degree details, and timeline
                  </p>
                </button>
                <button
                  type="button"
                  onClick={openAddCertificateModal}
                  className="w-full rounded-[8px] border border-border-light hover:border-primary text-left px-4 py-3 bg-white cursor-pointer"
                >
                  <p className="text-[15px] font-medium text-gray-dark-2">
                    Add certificate
                  </p>
                  <p className="text-[13px] text-shade-7-alt mt-1">
                    Certificate name and completion date
                  </p>
                </button>
              </div>
            ) : credentialModalType === "education" ? (
              <>
                <div className="px-6 py-5 grid grid-cols-1 gap-4 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                      Institute name
                    </label>
                    <input
                      type="text"
                      value={educationForm.instituteName}
                      onChange={(e) =>
                        setEducationForm((prev: EducationInput) => ({
                          ...prev,
                          instituteName: e.target.value,
                        }))
                      }
                      placeholder="e.g. University of Agriculture, Faisalabad"
                      className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                      Degree details
                    </label>
                    <input
                      type="text"
                      value={educationForm.degreeDetails}
                      onChange={(e) =>
                        setEducationForm((prev: EducationInput) => ({
                          ...prev,
                          degreeDetails: e.target.value,
                        }))
                      }
                      placeholder="e.g. Bachelor's degree in Computer Science"
                      className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                        Start date
                      </label>
                      <input
                        type="month"
                        value={educationForm.startDate}
                        onChange={(e) =>
                          setEducationForm((prev: EducationInput) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                        className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                        End date
                      </label>
                      <input
                        type="month"
                        value={educationForm.endDate}
                        onChange={(e) =>
                          setEducationForm((prev: EducationInput) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                        className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-border-ultra-light flex items-center justify-between gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCredentialModalType("selector")}
                    className="h-[40px] px-4 rounded-[6px] border border-border-light text-[14px] text-shade-10 hover:bg-blue-light-5 bg-transparent cursor-pointer"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={closeCredentialModal}
                      className="h-[40px] px-4 rounded-[6px] border border-border-light text-[14px] text-shade-10 hover:bg-blue-light-5 bg-transparent cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!isEducationFormValid || isSavingCredential}
                      onClick={handleSaveEducation}
                      className="h-[40px] px-5 rounded-[6px] bg-primary text-white text-[14px] font-medium hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed border-none cursor-pointer"
                    >
                      {isSavingCredential
                        ? "Saving..."
                        : editingEducationId
                          ? "Update"
                          : "Add"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="px-6 py-5 grid grid-cols-1 gap-4 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                      Certificate name
                    </label>
                    <input
                      type="text"
                      value={certificateForm.certificateName}
                      onChange={(e) =>
                        setCertificateForm((prev: ProfileCertificateInput) => ({
                          ...prev,
                          certificateName: e.target.value,
                        }))
                      }
                      placeholder="e.g. Google Prompting Essentials"
                      className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-shade-8 mb-1.5">
                      Completion date
                    </label>
                    <input
                      type="month"
                      value={certificateForm.completionDate}
                      onChange={(e) =>
                        setCertificateForm((prev: ProfileCertificateInput) => ({
                          ...prev,
                          completionDate: e.target.value,
                        }))
                      }
                      className="w-full h-[44px] px-3 rounded-[6px] border border-border-light text-[14px] focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-border-ultra-light flex items-center justify-between gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCredentialModalType("selector")}
                    className="h-[40px] px-4 rounded-[6px] border border-border-light text-[14px] text-shade-10 hover:bg-blue-light-5 bg-transparent cursor-pointer"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={closeCredentialModal}
                      className="h-[40px] px-4 rounded-[6px] border border-border-light text-[14px] text-shade-10 hover:bg-blue-light-5 bg-transparent cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!isCertificateFormValid || isSavingCredential}
                      onClick={handleSaveCertificate}
                      className="h-[40px] px-5 rounded-[6px] bg-primary text-white text-[14px] font-medium hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed border-none cursor-pointer"
                    >
                      {isSavingCredential
                        ? "Saving..."
                        : editingProfileCertificateId
                          ? "Update"
                          : "Add"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserProfile;

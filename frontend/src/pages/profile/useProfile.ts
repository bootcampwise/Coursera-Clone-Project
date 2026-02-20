import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { RootState } from "../../redux/store";
import {
  userApi,
  type WorkExperienceInput,
  type WorkExperience,
  type Education,
  type EducationInput,
  type ProfileCertificate,
  type ProfileCertificateInput,
} from "../../services/userApi";
import { certificateApi } from "../../services/certificateApi";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";

interface CompletedCourseCertificate {
  id: string;
  courseTitle?: string;
  issuedAt?: string;
}

export const useProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const displayName = user?.name || "Learner";
  const displayInitials = user?.name ? getInitials(user.name) : "L";
  const avatarBg = user?.name ? getAvatarColor(user.name) : "rgb(166, 74, 201)";

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [isLoadingWork, setIsLoadingWork] = useState(false);
  const [isSavingWork, setIsSavingWork] = useState(false);
  const [isDeletingWorkId, setIsDeletingWorkId] = useState<string | null>(null);

  const [educations, setEducations] = useState<Education[]>([]);
  const [profileCertificates, setProfileCertificates] = useState<
    ProfileCertificate[]
  >([]);
  const [completedCourses, setCompletedCourses] = useState<
    CompletedCourseCertificate[]
  >([]);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [credentialModalType, setCredentialModalType] = useState<
    "selector" | "education" | "certificate"
  >("selector");
  const [editingEducationId, setEditingEducationId] = useState<string | null>(
    null
  );
  const [editingProfileCertificateId, setEditingProfileCertificateId] =
    useState<string | null>(null);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);
  const [isLoadingCompletedCourses, setIsLoadingCompletedCourses] =
    useState(false);
  const [isSavingCredential, setIsSavingCredential] = useState(false);
  const [isDeletingCredentialId, setIsDeletingCredentialId] = useState<
    string | null
  >(null);

  const [educationForm, setEducationForm] = useState<EducationInput>({
    instituteName: "",
    degreeDetails: "",
    startDate: "",
    endDate: "",
  });
  const [certificateForm, setCertificateForm] =
    useState<ProfileCertificateInput>({
      certificateName: "",
      completionDate: "",
    });
  const [workForm, setWorkForm] = useState<WorkExperienceInput>({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const isWorkFormValid = useMemo(
    () =>
      Boolean(
        workForm.title.trim() &&
        workForm.company.trim() &&
        workForm.startDate.trim()
      ),
    [workForm.company, workForm.startDate, workForm.title]
  );

  const isEducationFormValid = useMemo(
    () =>
      Boolean(
        educationForm.instituteName.trim() &&
        educationForm.degreeDetails.trim() &&
        educationForm.startDate.trim() &&
        educationForm.endDate.trim()
      ),
    [
      educationForm.degreeDetails,
      educationForm.endDate,
      educationForm.instituteName,
      educationForm.startDate,
    ]
  );

  const isCertificateFormValid = useMemo(
    () =>
      Boolean(
        certificateForm.certificateName.trim() &&
        certificateForm.completionDate.trim()
      ),
    [certificateForm.certificateName, certificateForm.completionDate]
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoadingWork(true);
        setIsLoadingCredentials(true);
        setIsLoadingCompletedCourses(true);
        const [workItems, educationItems, certificateItems, completedItems] =
          await Promise.all([
            userApi.getMyWorkExperiences(),
            userApi.getMyEducations(),
            userApi.getMyProfileCertificates(),
            certificateApi.getMyCertificates(),
          ]);
        setWorkExperiences(Array.isArray(workItems) ? workItems : []);
        setEducations(Array.isArray(educationItems) ? educationItems : []);
        setProfileCertificates(
          Array.isArray(certificateItems) ? certificateItems : []
        );
        setCompletedCourses(
          Array.isArray(completedItems) ? completedItems : []
        );
      } catch (error) {
        // Fetch profile data failed
      } finally {
        setIsLoadingWork(false);
        setIsLoadingCredentials(false);
        setIsLoadingCompletedCourses(false);
      }
    };

    fetchProfileData();
  }, []);

  const resetWorkForm = () => {
    setEditingWorkId(null);
    setWorkForm({
      title: "",
      company: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  const openAddWorkModal = () => {
    resetWorkForm();
    setIsWorkModalOpen(true);
  };

  const openEditWorkModal = (item: WorkExperience) => {
    setEditingWorkId(item.id);
    setWorkForm({
      title: item.title || "",
      company: item.company || "",
      location: item.location || "",
      employmentType: item.employmentType || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      isCurrent: Boolean(item.isCurrent),
      description: item.description || "",
    });
    setIsWorkModalOpen(true);
  };

  const handleSaveWorkExperience = async () => {
    if (!isWorkFormValid) return;
    try {
      setIsSavingWork(true);
      const payload: WorkExperienceInput = {
        title: workForm.title.trim(),
        company: workForm.company.trim(),
        location: workForm.location?.trim() || "",
        employmentType: workForm.employmentType?.trim() || "",
        startDate: workForm.startDate,
        endDate: workForm.isCurrent ? "" : workForm.endDate || "",
        isCurrent: Boolean(workForm.isCurrent),
        description: workForm.description?.trim() || "",
      };
      if (editingWorkId) {
        const updated = await userApi.updateMyWorkExperience(
          editingWorkId,
          payload
        );
        setWorkExperiences((prev) =>
          prev.map((item) => (item.id === editingWorkId ? updated : item))
        );
        toast.success("Work experience updated");
      } else {
        const created = await userApi.addMyWorkExperience(payload);
        setWorkExperiences((prev) => [created, ...prev]);
        toast.success("Work experience added");
      }
      setIsWorkModalOpen(false);
      resetWorkForm();
    } catch (error) {
      toast.error("Failed to save work experience");
    } finally {
      setIsSavingWork(false);
    }
  };

  const handleDeleteWorkExperience = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this work experience?"
    );
    if (!ok) return;
    try {
      setIsDeletingWorkId(id);
      await userApi.deleteMyWorkExperience(id);
      setWorkExperiences((prev) => prev.filter((item) => item.id !== id));
      toast.success("Work experience deleted");
    } catch (error) {
      toast.error("Failed to delete work experience");
    } finally {
      setIsDeletingWorkId(null);
    }
  };

  const formatMonthYear = (value?: string) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    const monthNumber = Number(month);
    if (!year || !month || Number.isNaN(monthNumber)) return value;
    const date = new Date(Number(year), monthNumber - 1, 1);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatCompletionDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const resetEducationForm = () => {
    setEditingEducationId(null);
    setEducationForm({
      instituteName: "",
      degreeDetails: "",
      startDate: "",
      endDate: "",
    });
  };

  const resetCertificateForm = () => {
    setEditingProfileCertificateId(null);
    setCertificateForm({
      certificateName: "",
      completionDate: "",
    });
  };

  const closeCredentialModal = () => {
    setIsCredentialModalOpen(false);
    setCredentialModalType("selector");
    resetEducationForm();
    resetCertificateForm();
  };

  const openCredentialSelectionModal = () => {
    setCredentialModalType("selector");
    resetEducationForm();
    resetCertificateForm();
    setIsCredentialModalOpen(true);
  };

  const openAddEducationModal = () => {
    resetEducationForm();
    setCredentialModalType("education");
    setIsCredentialModalOpen(true);
  };

  const openEditEducationModal = (item: Education) => {
    setEditingEducationId(item.id);
    setEducationForm({
      instituteName: item.instituteName || "",
      degreeDetails: item.degreeDetails || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
    });
    setCredentialModalType("education");
    setIsCredentialModalOpen(true);
  };

  const openAddCertificateModal = () => {
    resetCertificateForm();
    setCredentialModalType("certificate");
    setIsCredentialModalOpen(true);
  };

  const openEditCertificateModal = (item: ProfileCertificate) => {
    setEditingProfileCertificateId(item.id);
    setCertificateForm({
      certificateName: item.certificateName || "",
      completionDate: item.completionDate || "",
    });
    setCredentialModalType("certificate");
    setIsCredentialModalOpen(true);
  };

  const handleSaveEducation = async () => {
    if (!isEducationFormValid) return;

    try {
      setIsSavingCredential(true);
      const payload: EducationInput = {
        instituteName: educationForm.instituteName.trim(),
        degreeDetails: educationForm.degreeDetails.trim(),
        startDate: educationForm.startDate,
        endDate: educationForm.endDate,
      };

      if (editingEducationId) {
        const updated = await userApi.updateMyEducation(
          editingEducationId,
          payload
        );
        setEducations((prev) =>
          prev.map((item) => (item.id === editingEducationId ? updated : item))
        );
        toast.success("Education updated");
      } else {
        const created = await userApi.addMyEducation(payload);
        setEducations((prev) => [created, ...prev]);
        toast.success("Education added");
      }
      closeCredentialModal();
    } catch (error) {
      toast.error("Failed to save education");
    } finally {
      setIsSavingCredential(false);
    }
  };

  const handleSaveCertificate = async () => {
    if (!isCertificateFormValid) return;

    try {
      setIsSavingCredential(true);
      const payload: ProfileCertificateInput = {
        certificateName: certificateForm.certificateName.trim(),
        completionDate: certificateForm.completionDate,
      };

      if (editingProfileCertificateId) {
        const updated = await userApi.updateMyProfileCertificate(
          editingProfileCertificateId,
          payload
        );
        setProfileCertificates((prev) =>
          prev.map((item) =>
            item.id === editingProfileCertificateId ? updated : item
          )
        );
        toast.success("Certificate updated");
      } else {
        const created = await userApi.addMyProfileCertificate(payload);
        setProfileCertificates((prev) => [created, ...prev]);
        toast.success("Certificate added");
      }
      closeCredentialModal();
    } catch (error) {
      toast.error("Failed to save certificate");
    } finally {
      setIsSavingCredential(false);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this education?"
    );
    if (!ok) return;

    try {
      setIsDeletingCredentialId(id);
      await userApi.deleteMyEducation(id);
      setEducations((prev) => prev.filter((item) => item.id !== id));
      toast.success("Education deleted");
    } catch (error) {
      toast.error("Failed to delete education");
    } finally {
      setIsDeletingCredentialId(null);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this certificate?"
    );
    if (!ok) return;

    try {
      setIsDeletingCredentialId(id);
      await userApi.deleteMyProfileCertificate(id);
      setProfileCertificates((prev) => prev.filter((item) => item.id !== id));
      toast.success("Certificate deleted");
    } catch (error) {
      toast.error("Failed to delete certificate");
    } finally {
      setIsDeletingCredentialId(null);
    }
  };

  return {
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
    setIsCredentialModalOpen,
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
    resetEducationForm,
    resetCertificateForm,
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
  };
};

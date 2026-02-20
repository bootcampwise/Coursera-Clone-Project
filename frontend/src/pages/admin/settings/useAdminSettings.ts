import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../../redux/slices/auth/adminAuthSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import axios from "axios";
import toast from "react-hot-toast";

export const useAdminSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.adminAuth.token);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setName(response.data.name || "");
      setEmail(response.data.email || "");
    } catch (error) {
      toast.error("Failed to load user data");
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordModal(false);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err.response?.data?.message ||
        (error instanceof Error ? error.message : "") ||
        "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      await dispatch(logoutAdmin());
      navigate("/admin-login");
    }
  };

  const toggleTwoFactor = () => setTwoFactorEnabled(!twoFactorEnabled);
  const toggleNotifications = () => setEmailNotifications(!emailNotifications);

  return {
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
    emailNotifications,
    showPasswordModal,
    setShowPasswordModal,
    handleUpdateProfile,
    handleChangePassword,
    handleLogout,
    toggleTwoFactor,
    toggleNotifications,
  };
};

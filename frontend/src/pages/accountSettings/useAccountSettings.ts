import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import {
  updateUserProfile,
  changePassword,
} from "../../redux/slices/auth/authSlice";

export const useAccountSettings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    setFullName(user?.name || "");
  }, [user?.name]);

  const handleSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
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
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, retypePassword } = passwordState;

    if (!currentPassword || !newPassword || !retypePassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== retypePassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      setIsUpdatingPassword(true);
      await dispatch(changePassword({ currentPassword, newPassword })).unwrap();
      toast.success("Password updated successfully");
      setPasswordState({
        currentPassword: "",
        newPassword: "",
        retypePassword: "",
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return {
    user,
    fullName,
    setFullName,
    isSaving,
    passwordState,
    setPasswordState,
    isUpdatingPassword,
    handleSaveProfile,
    handleChangePassword,
  };
};

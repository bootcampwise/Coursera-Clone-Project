import { useState, useEffect } from "react";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import { toast } from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
  _count: {
    courses: number;
    enrollments: number;
  };
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: string;
}

export const useAdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.get(ENDPOINTS.USERS_LIST, {
        params: { limit: 50 },
      });
      setUsers(response.data.users);
      setError(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", password: "", role: "student" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.post(ENDPOINTS.USERS_LIST, formData);
      toast.success("User created successfully");
      handleCloseModal();
      fetchUsers();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await adminApi.patch(ENDPOINTS.USERS_UPDATE_ROLE(userId), {
        role: newRole,
      });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsDeleting(userId);
      await adminApi.delete(ENDPOINTS.USERS_BY_ID(userId));
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setIsDeleting(null);
    }
  };

  return {
    users,
    loading,
    error,
    isModalOpen,
    isDeleting,
    formData,
    fetchUsers,
    handleOpenModal,
    handleCloseModal,
    handleInputChange,
    handleSubmit,
    handleRoleChange,
    handleDeleteUser,
  };
};

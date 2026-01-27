import axios from "axios";

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default adminApi;

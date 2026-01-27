import axios from "axios";

const instructorApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: { "Content-Type": "application/json" },
});

instructorApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("instructorToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instructorApi;

import axios from "axios";

const portalApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: { "Content-Type": "application/json" },
});

portalApi.interceptors.request.use((config) => {
  
  const token =
    localStorage.getItem("portalToken") ||
    localStorage.getItem("adminToken") ||
    localStorage.getItem("instructorToken") ||
    localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default portalApi;


















































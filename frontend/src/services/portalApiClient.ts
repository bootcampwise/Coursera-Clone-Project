import axios from "axios";

const portalApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: { "Content-Type": "application/json" },
});

portalApi.interceptors.request.use((config) => {
  // attach portal token if available
  const token = localStorage.getItem("portalToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default portalApi;

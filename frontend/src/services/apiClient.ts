import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const role = localStorage.getItem("role");

    let token: string | null = null;

    if (role === "admin") {
      token = localStorage.getItem("adminToken");
    } else if (role === "instructor") {
      token = localStorage.getItem("instructorToken");
    } else if (role === "portal") {
      token = localStorage.getItem("portalToken");
    } else {
      token = localStorage.getItem("token");
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

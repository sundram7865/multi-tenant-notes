// client/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4444"

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add JWT token to request headers
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

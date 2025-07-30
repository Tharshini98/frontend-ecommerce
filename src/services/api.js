// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backend-mrf6.onrender.com/api",
  withCredentials: true,
});

export default api;

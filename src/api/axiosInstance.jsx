// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // backend URL
});

// Attach token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { token } = JSON.parse(storedAuth);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;


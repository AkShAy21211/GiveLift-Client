import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.3:5000/api"; // Express API URL

// lib/fetcher.ts
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Axios request interceptor
api.interceptors.request.use((config) => {
  // If `data` is FormData, set `Content-Type: multipart/form-data`
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

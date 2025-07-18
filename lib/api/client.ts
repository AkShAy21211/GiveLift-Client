import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const clientApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

clientApi.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Client API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

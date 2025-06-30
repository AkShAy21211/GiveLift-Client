"use server"
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createSSRApi = async (headers:Headers) => {
  const cookie = headers.get("cookie") || "";

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Cookie: cookie,
    },
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      console.error("SSR API Error:", err.response?.data || err.message);
      return Promise.reject(err);
    }
  );

  return instance;
};

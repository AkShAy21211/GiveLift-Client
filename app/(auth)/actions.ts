import { clientApi } from "@/lib/api/client";

export const registerHandler = async (data: {
  name: string;
  email: string;
  country: any;
  state: any;
  district: any;
  password: string;
}) => {
  const response = await clientApi.post("/auth/register", data);
  return response.data;
};

export const loginHandler = async (data: {
  email: string;
  password: string;
}) => {
  const response = await clientApi.post("/auth/login", data);
  return response.data;
};

export const forgortPasswordHandler = async (data: { email: string }) => {
  const response = await clientApi.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPasswordHandler = async (data: {
  password: string;
  token: string;
}) => {
  const response = await clientApi.post("/auth/reset-password", data);
  return response.data;
};

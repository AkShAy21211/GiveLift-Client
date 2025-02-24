// lib/api/auth.ts
import { api } from "../axios";
import { AUTH_ROUTES } from "../constants/constants";

export type LoginType = {
  email: string;
  password: string;
};
export const loginHandler = async ({ email, password }: LoginType) => {
  const response = await api.post(AUTH_ROUTES.login, { email, password });
  return response;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  role?: string;
};

export const registerHandler = async (userData: RegisterType) => {
  const response = await api.post(AUTH_ROUTES.register, userData);
  return response;
};

export const forgetPassword = async (phone: string) => {
  const response = await api.post(AUTH_ROUTES.forgotPassword, { phone });
  return response;
};

export const verifyForgetPasswordOtp = async (otp: string) => {
  const response = await api.post(AUTH_ROUTES.verifyForgetPasswordOtp, { otp });
  return response;
};

export const resetPasswordOtp = async (password: string) => {
  const response = await api.post(AUTH_ROUTES.resetPassword, {
    password,
  });
  return response;
};

export const logout = async () => {
  const response = await api.get(AUTH_ROUTES.logout);
  return response;
};

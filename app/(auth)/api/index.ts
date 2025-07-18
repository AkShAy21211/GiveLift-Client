import { clientApi } from "@/lib/api/client";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResetPasswordPayload,
} from "../types";
import { ApiResponse } from "@/lib/types";
import { apiActionWrapper } from "@/lib/utils";

const base = "/auth";
export const registerHandler = (data: RegisterPayload) => {
  return apiActionWrapper(
    () => clientApi.post(`${base}/register`, data),
    "Registration successful"
  );
};

export const loginHandler = (data: LoginPayload) => {
 return  apiActionWrapper(
    () => clientApi.post<LoginResponse>(`${base}/login`, data),
    "Login successful"
  );
};

export const forgotPasswordHandler = (data: { email: string }) => {
 return apiActionWrapper(
    () => clientApi.post(`${base}/forgot-password`, data),
    "Reset password link sent to your email"
  );
};

export const resetPasswordHandler = (data: ResetPasswordPayload) => {
  return apiActionWrapper(
    () => clientApi.post(`${base}/reset-password`, data),
    "Password reset successful"
  );
};

export const logoutHandler = () => {
 return apiActionWrapper(() => clientApi.post(`${base}/logout`), "Logout successful");
};

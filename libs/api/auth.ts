// lib/api/auth.ts
import { api } from "../axios";
import { AUTH_ROUTES } from "../constants/constants";


export type LoginType={
  email:string;
  password:string;
}
export const login = async (
 {email,password}:LoginType
) => {
  const response = await api.post(AUTH_ROUTES.login, { email, password });
  return response;
};

export type RegisterType={
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  address: { district: string; city: string; pincode: number };
  phone: string;
  role?: string; 

}

export const register = async (userData: RegisterType) => {
  const response = await api.post(AUTH_ROUTES.register, userData);
  return response;
};


export const logout = async () => {
  const response = await api.get(AUTH_ROUTES.logout);
  return response;
};
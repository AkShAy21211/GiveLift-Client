import { api } from "../axios";

export const registerHandler = async (data:{name:string,email:string,password:string}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginHandler = async (data:{email:string,password:string}) => {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export const forgortPasswordHandler = async (data:{email:string}) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
}

export const resetPasswordHandler = async (data:{password:string,token:string}) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
}
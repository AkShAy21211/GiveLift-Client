export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  district: any;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ResetPasswordPayload = {
  password: string;
  token: string;
};

export interface LoginResponse {
  message: string;
  role: string;
  
}

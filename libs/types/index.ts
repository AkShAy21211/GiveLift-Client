

export type ApiError = {
  success: false;
  message: string;
};

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
  COORDINATOR = "coordinator",
}



export interface AuthState {
    user:{
      isAuthenticated: boolean;
      role:string
    }|null
}

export interface Address {
  coordinates: number[];
  district: string;
  city: string;
  pinCode: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  role: string;
  isVolunteer: boolean;
  address: Address;
}


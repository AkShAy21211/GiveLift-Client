

export type ApiError = {
  success: false;
  message: string;
};

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
  COORDINATOR = "coordinator",
}

export 
type Donation = {
  title: string;
  amount: number;
  date: string;
};


export type ViewType = 'profile' | 'donations' | 'reports';


export interface AuthState {
    user:{
      isAuthenticated: boolean;
      role:string
    }|null
}

export interface Address {
  district: string;
  city: string;
  pincode: number;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  role?: string;
  isVolunteer?: boolean;
  address: Address;
}


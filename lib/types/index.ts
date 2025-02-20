export type ApiError = {
  success: false;
  message: string;
};

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
  COORDINATOR = "coordinator",
}

export type ViewType = "profile" | "donations" | "reports";

export enum SERVIRITY {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface AuthState {
  user: {
    isAuthenticated: boolean;
    role: string;
  } | null;
}

export interface Address {
  district: string;
  city: string;
  pincode: string;
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

export interface Disaster {
  _id: string;
  title: string;
  description: string;
  type: string;
  location: {
    coordinates: number[];
    district: string;
    city: string;
    pinCode: number;
  };
  reportedBy?: string;
  byAdmin?: boolean;
  severity: string;
  status: boolean;
  media: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Coordinator {
  name: string;
  email: string;
  avatar?: File;
  password: string;
  phone: string;
  role?: string;
  isVolunteer?: boolean;
  address: Address;
}

export interface DisasterReport {
  title: string;
  description: string;
  location: {
    coordinates: [number, number];
    district: string;
    city: string;
    pincode: string;
  };
  type:string,
  severity: string;
  image: FileList[];
}

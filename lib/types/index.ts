export type ApiError = {
  success: false;
  message: string;
};

export enum ROLES {
  STATE_COORDINATOR = "state_coordinator",
  DISTRICT_COORDINATOR = "district_coordinator",
  GENERAL_USER = "general_user", 
}


export interface AuthState{
  isAuthenticated: boolean;
  role: string| null;
}

export interface SEVERITY {
  value: string
  label: string
  color: string
}

export interface DisasterReport {
  _id: string;
  place: string;
  disasterType?: string;
  status: string;
  severityLevel?: string;
  peopleAffected: number;
  situationDescription: string;
  resourcesNeeded: string[];
  createdAt: string; // or `Date` if you parse it
  updatedAt: string; // or `Date` if you parse it
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: "general_user" | "district_coordinator" | "state_coordinator" | string; // extend as needed
  isVolunteer: boolean;
  address: string;
  phone: string;
  isDeleted: boolean;
  createdAt: string; // or Date if you're parsing
  updatedAt: string; // or Date if you're parsing
  __v: number;
}

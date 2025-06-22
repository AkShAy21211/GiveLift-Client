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
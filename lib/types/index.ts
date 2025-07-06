export type ApiError = {
  success: false;
  message: string;
};

export enum ROLES {
  STATE_COORDINATOR = "state_coordinator",
  DISTRICT_COORDINATOR = "district_coordinator",
  GENERAL_USER = "general_user", 
}

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
    _googleMapsLoaded: boolean;
  }
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
// Static disaster types
export const DISASTER_TYPES = [
  "Earthquake",
  "Flood",
  "Hurricane/Cyclone",
  "Wildfire",
  "Tornado",
  "Landslide",
  "Tsunami",
  "Volcanic Eruption",
  "Drought",
  "Blizzard",
  "Heatwave",
  "Industrial Accident",
  "Building Collapse",
  "Other",
] as const;

// Static severity levels
export const SEVERITY_LEVELS: SEVERITY[] = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  {
    value: "moderate",
    label: "Moderate",
    color: "bg-yellow-100 text-yellow-800",
  },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" },
  {
    value: "catastrophic",
    label: "Catastrophic",
    color: "bg-purple-100 text-purple-800",
  },
] as const;

// Static resource types
export const RESOURCE_TYPES = [
  "Medical Supplies",
  "Food and Water",
  "Shelter Materials",
  "Rescue Equipment",
  "Transportation",
  "Communication Equipment",
  "Power Generators",
  "Clothing and Blankets",
  "Heavy Machinery",
  "Emergency Personnel",
  "Fuel",
  "Blood Donations",
  "Temporary Housing",
  "Psychological Support",
  "Other",
] as const;
export type DisasterReport = {
  _id?: string;
  address: string;
  districtId: string;
  disasterType: (typeof DISASTER_TYPES)[number];
  severity: "low" | "moderate" | "high" | "critical" | "catastrophic";
  description: string;
  resourcesNeeded: string[];
  status?: "pending" | "verified" | "responding" | "resolved";
  reportedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface Address {
  district?: string;
  state?: string;
  country?: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: Address;
  role: string;
  isVolunteer: boolean;
  reputationScore?: number;
  badges: string[];
  resetToken: string | null;
  resetTokenExpires?: Date | null;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
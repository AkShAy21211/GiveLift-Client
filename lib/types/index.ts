// types.ts

// ---------------------
// ✅ API Response
// ---------------------
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: {
    [key: string]: T;
    
  };
}

// ---------------------
// ✅ Role Enum
// ---------------------
export enum ROLES {
  STATE_COORDINATOR = "state_coordinator",
  DISTRICT_COORDINATOR = "district_coordinator",
  GENERAL_USER = "general_user",
}


// ---------------------
// ✅ Auth State
// ---------------------
export interface AuthState {
  isAuthenticated: boolean;
  role: ROLES | null;
}

// ---------------------
// ✅ Disaster Severity
// ---------------------
export interface Severity {
  value: string;
  label: string;
  color: string;
}

export const SEVERITY_LEVELS = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "moderate", label: "Moderate", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" },
  { value: "catastrophic", label: "Catastrophic", color: "bg-purple-100 text-purple-800" },
] as const;

export type DisasterSeverity = typeof SEVERITY_LEVELS[number]["value"];

// ---------------------
// ✅ Disaster Types
// ---------------------
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

export type DisasterType = typeof DISASTER_TYPES[number];

// ---------------------
// ✅ Resource Types
// ---------------------
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
export type ResourceType = typeof RESOURCE_TYPES[number];

// ---------------------
// ✅ GeoPoint
// ---------------------
export interface GeoPoint {
  type: "Point";
  coordinates: [number, number];
  label: string;
}

// ---------------------
// ✅ Disaster Report
// ---------------------
export interface DisasterReport {
  _id: string;
  disasterType: DisasterType;
  address: GeoPoint;
  districtId: string;
  severity: DisasterSeverity;
  description: string;
  reportedBy: string;
  resourcesNeeded: string[];
  volunteersAssigned?: string[]|[];
  status: string;
  createdAt: Date|string;
  updatedAt: Date|string;
}

// ---------------------
// ✅ Address
// ---------------------
export interface Address {
  district?: string;
  state?: string;
  country?: string;
}

// ---------------------
// ✅ User
// ---------------------
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: Address;
  role: ROLES;
  isVolunteer: boolean;
  reputationScore?: number;
  badges: string[];
  resetToken: string | null;
  resetTokenExpires?: Date | null;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoPoint {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
}

export interface Resource  {
    resourceType: string;
    quantity: number;
    unit: string;
    locationName: string;
    contactInfo: string; 
    availableFrom: Date|string; 
    notes?: string; 
    donatedBy?:string;
    currentQuantity?: number; 
    source?: string;
    location?: GeoPoint; 
    createdAt?: Date;
    updatedAt?: Date;
}




export interface Rumor  {
  reportedBy?: string;
  content: string;
  sourceSeen?: string;
  screenshotUrl?: string;
  location?: string;
  districtId?: string;
  status?: "pending" | "reviewed" | "dismissed" | "escalated";
  reviewedBy?: string;
  associatedFactCheck?: string;
  additionalInfo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

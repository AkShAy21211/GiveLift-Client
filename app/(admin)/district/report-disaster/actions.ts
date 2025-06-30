import { clientApi } from "@/lib/api/client";
import { SEVERITY } from "@/lib/types";
import { z } from "zod";


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

// Define Zod schema for form validation
export const disasterReportSchema = z.object({
  id: z.string().optional(), // For edit mode
  place: z.string().min(2, {
    message: "Specific location must be at least 2 characters.",
  }),
  country: z.any().optional(),
  state: z.any().optional(),
  district: z.string().optional(),
  disasterType: z.enum(DISASTER_TYPES, {
    errorMap: () => ({ message: "Please select a valid disaster type." }),
  }),
  severityLevel: z.enum(
    ["low", "moderate", "high", "critical", "catastrophic"],
    {
      errorMap: () => ({ message: "Please select a valid severity level." }),
    }
  ),
  peopleAffected: z.coerce.number().min(0, {
    message: "Number of people affected must be a positive number.",
  }),
  situationDescription: z.string().min(10, {
    message: "Situation description must be at least 10 characters.",
  }),
  resourcesNeeded: z.array(z.string()).min(1, {
    message: "Please select at least one resource needed.",
  }),
});

export type DisasterReport = {
  _id: string;
  place: string;
  disasterType: (typeof DISASTER_TYPES)[number];
  severityLevel: "low" | "moderate" | "high" | "critical" | "catastrophic";
  peopleAffected: number;
  country: any;
  state: any;
  district: string;
  situationDescription: string;
  resourcesNeeded: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  status: "pending" | "verified" | "responding" | "resolved";
  reportedBy: string;
  createdAt: string;
  updatedAt: string;
};

// Server action to create disaster report
export async function createDisasterReport(
  _prevState: any,
  formData: DisasterReport
) {
  try {
    await clientApi.post("/disaster/report", formData);

    return { success: true, message: "Disaster report submitted successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Failed to submit disaster report" };
  }
}
export async function updateeDisasterReport(
  id: string,
  _prevState: any,
  formData: DisasterReport
) {
  try {
    await clientApi.post(`/disaster/${id}`, formData);

    return { success: true, message: "Disaster report submitted successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Failed to submit disaster report" };
  }
}

// Server action to update disaster report status
export async function updateDisasterReportStatus(
  id: string,
  status: DisasterReport["status"]
) {
  try {
    return { success: true, message: "Status updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update status" };
  }
}

// Server action to get disaster report by ID
export async function getDisasterReportById(
  id: string
): Promise<DisasterReport | null> {
  try {
    throw new Error("Disaster report not found");
  } catch (error) {
    console.error("Error fetching disaster report:", error);
    return null;
  }
}

export type { DisasterReport as DisasterReportType };

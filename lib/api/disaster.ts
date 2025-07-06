import { clientApi } from "@/lib/api/client";
import { DISASTER_TYPES, DisasterReport, SEVERITY } from "@/lib/types";
import { z } from "zod";




// Define Zod schema for form validation
export const disasterReportSchema = z.object({
  id: z.string().optional(), // For edit mode
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  districtId: z.string().optional(),
  disasterType: z.enum(DISASTER_TYPES, {
    errorMap: () => ({ message: "Please select a valid disaster type." }),
  }),
  severity: z.enum(
    ["low", "moderate", "high", "critical", "catastrophic"],
    {
      errorMap: () => ({ message: "Please select a valid severity level." }),
    }
  ),
  description: z.string().min(10, {
    message: "Situation description must be at least 10 characters.",
  }),
  resourcesNeeded: z.array(z.string()).min(1, {
    message: "Please select at least one resource needed.",
  }),
});




// Server action to create disaster report
export async function createDisasterReport(
  
  formData: DisasterReport
) {
 
    const response = await clientApi.post("/disaster/report", formData);
    return response.data;

}
export async function updateeDisasterReport(
  id: string,
  formData: DisasterReport
) {
 
   const response =  await clientApi.post(`/disaster/${id}`, formData);
  return response.data;

  
}
export async function getDistricts(): Promise<{ _id: string; name: string }[]> {
  const res = await clientApi.get("/districts?state=Kerala&select=name"); 
  return res.data;
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

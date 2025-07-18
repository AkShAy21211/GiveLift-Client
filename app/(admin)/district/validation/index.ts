import { DISASTER_TYPES } from "@/lib/types";
import { z } from "zod";

// Define Zod schema for form validation
export const disasterReportSchema = z.object({
  id: z.string().optional(), // For edit mode
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  districtId: z.string({
    message: "Please select a district.",
  }),
  disasterType: z.enum(DISASTER_TYPES, {
    errorMap: () => ({ message: "Please select a valid disaster type." }),
  }).optional(),
  severity: z.enum(["low", "moderate", "high", "critical", "catastrophic"], {
    errorMap: () => ({ message: "Please select a valid severity level." }),
  }).optional(),
  description: z.string().min(10, {
    message: "Situation description must be at least 10 characters.",
  }),
  resourcesNeeded: z.array(z.string()).min(1, {
    message: "Please select at least one resource needed.",
  }),
});

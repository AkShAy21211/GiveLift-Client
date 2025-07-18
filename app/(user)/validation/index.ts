import { RESOURCE_TYPES } from "@/lib/types";
import { z } from "zod";

export const resourcePledgeSchema = z.object({
  resourceType: z.enum(RESOURCE_TYPES, {
    errorMap: () => ({ message: "Please select a resource type" }),
  }),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),
  locationName: z.string().min(1, "Location is required"),
  contactInfo: z.string().min(1, "Contact information is required"),
  availableFrom: z.string().min(1, "Available date is required"),
  notes: z.string().optional(),
});


export const rumorReportSchema = z.object({
  content: z.string().min(10, "Rumor content must be at least 10 characters"),
  sourceSeen: z.string().optional(),
  screenshotUrl: z.string().optional(),
  location: z.string().optional(),
  districtId: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type RumorReportForm = z.infer<typeof rumorReportSchema>;


export type ResourcePledgeForm = z.infer<typeof resourcePledgeSchema>;

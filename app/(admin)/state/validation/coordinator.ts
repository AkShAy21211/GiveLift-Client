import { z } from "zod";

export const coordinatorFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  district: z.string().min(1, {
    message: "Please select a district.",
  }),
  isVolunteer: z.boolean().optional(),
});
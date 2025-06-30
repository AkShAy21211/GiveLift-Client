"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSSRApi } from "@/lib/api/server";


// Define Zod schema for form validation
const coordinatorFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  country: z.any(),
  state: z.any(),
  district: z.any(),
});

export type Coordinator = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isDeleted: boolean;
  country: any;
  state: any;
  district: string;
  isActive: boolean;
  createdAt: string;
};

// Server action to fetch coordinators
export async function getCoordinators(): Promise<Coordinator[]> {
  try {
    const api = await createSSRApi();
    const response = await api.get("/users?role=district_coordinator");
    return response.data as Coordinator[];
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    throw error;
  }
}

// Server action to create coordinator
export async function createCoordinator(_prevState: any, formData: any) {
  try {
    const api = await createSSRApi();

    await api.post("/users/create", formData);
    return { success: true, message: "Coordinator created successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Failed to create coordinator" };
  }
}

// Server action to update coordinator
export async function updateCoordinator(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const api = await createSSRApi();

    await api.put(`/users/${id}`, formData);
    return { success: true, message: "Coordinator updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Failed to update coordinator" };
  }
}

// Server action to soft delete coordinator
export async function deactivateCoordinator(id: string) {
  try {
    const api = await createSSRApi();

    await api.patch(`/users/${id}/deactivate`);
    revalidatePath("/state/coordinators")
    return { success: true, message: "Coordinator deactivated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to deactivate coordinator" };
  }
}


export async function restoreCoordinator(id: string) {
  try {
    const api = await createSSRApi();

    await api.patch(`/users/${id}/restore`);

    revalidatePath("/state/coordinators")
    return { success: true, message: "Coordinator restored successfully" };
  } catch (error) {
    return { success: false, message: "Failed to restore coordinator" };
  }
}
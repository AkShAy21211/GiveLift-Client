import { clientApi } from "@/lib/api/client";



// Server action to create coordinator
export async function createCoordinator(formData: any) {
  try {
    
    await clientApi.post("/users/create", formData);
    return { success: true, message: "Coordinator created successfully" };
  } catch (error:any) {
    return { success: false, message: error.message };
  }
}

// Server action to update coordinator
export async function updateCoordinator(id:string,formData: any) {
  try {
    await clientApi.put(`/users/${id}`, formData);
    return { success: true, message: "Coordinator updated successfully" };
  } catch (error:any) {
    return { success: false, message: error.message };
  }
}

// Server action to soft delete coordinator
export async function deactivateCoordinator(id: string) {
  try {
    await clientApi.patch(`/users/${id}/deactivate`);
    return { success: true, message: "Coordinator deactivated successfully" };
  } catch (error:any) {
    return { success: false, message: error.message };
  }
}

export async function restoreCoordinator(id: string) {
  try {
    await clientApi.patch(`/users/${id}/restore`);
    return { success: true, message: "Coordinator restored successfully" };
  } catch (error:any) {
    return { success: false, message: error.message };
  }
}

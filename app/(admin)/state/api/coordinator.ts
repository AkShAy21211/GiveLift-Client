import { clientApi } from "@/lib/api/client";
import { apiActionWrapper } from "@/lib/utils";

const base = "/users";

export const createUser = async (formData: any) => {
  return apiActionWrapper(() => clientApi.post(`${base}/create`, formData), "User created successfully");
};

export const updateUser = (id: string, formData: any) => {
  return apiActionWrapper(() => clientApi.put(`${base}/${id}`, formData), "User updated successfully");
};

export const deactivateUser = (id: string) => {
  return apiActionWrapper(() => clientApi.patch(`${base}/${id}/deactivate`), "User deactivated successfully");
};

export const restoreUser = (id: string) => {
  return apiActionWrapper(() => clientApi.patch(`${base}/${id}/restore`), "User restored successfully");
};

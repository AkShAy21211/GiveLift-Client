import { clientApi } from "@/lib/api/client";
import { User } from "@/lib/types";

export const getProfile = async () => {
  const { data } = await clientApi.get(`/users/me`);
  return data;
};

export const updateProfile = async (id: string, data: Partial<User>) => {
  const { data: updatedData } = await clientApi.put(`/users/${id}`, data);
  return updatedData;
};

import { clientApi } from "@/lib/api/client";
import { apiActionWrapper } from "@/lib/utils"; 
import { User } from "@/lib/types";

//  Get current user's profile
export const getProfile = () =>
  apiActionWrapper<User>(() =>
    clientApi.get("/users/me").then(res => res.data),
    "Profile fetched successfully"
  );

//  Update current user's profile
export const updateProfile = (id: string, data: Partial<User>) =>
  apiActionWrapper<User>(() =>
    clientApi.put(`/users/${id}`, data).then(res => res.data),
    "Profile updated successfully"
  );

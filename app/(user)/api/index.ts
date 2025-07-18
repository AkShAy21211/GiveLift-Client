import { clientApi } from "@/lib/api/client";
import { apiActionWrapper } from "@/lib/utils";
import { DisasterReport, User } from "@/lib/types";

//  Get current user's profile
export const getProfile = () =>
  apiActionWrapper<User>(
    () => clientApi.get("/users/me"),
    "Profile fetched successfully",
    false
  );

//  Update current user's profile
export const updateProfile = (id: string, data: Partial<User>) =>
  apiActionWrapper<User>(
    () => clientApi.put(`/users/${id}`, data).then((res) => res.data),
    "Profile updated successfully"
  );

// Get Disasters api
export const getDisasters = () =>
  apiActionWrapper<DisasterReport[]>(
    () => clientApi.get("/disasters?status=verified"),
    "Disasters fetched successfully",
    false
  );

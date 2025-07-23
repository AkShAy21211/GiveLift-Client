import { clientApi } from "@/lib/api/client";
import { apiActionWrapper } from "@/lib/utils";
import { DisasterReport, Resource, Rumor, User } from "@/lib/types";



// Get Disasters api
export const getDisasters = () =>
  apiActionWrapper<any>(
    () => clientApi.get("/disasters?status=verified"),
    "Disasters fetched successfully",
    false
  );

// Get disaster by id
export const getDisasterById = (id: string) =>
  apiActionWrapper<DisasterReport>(
    () => clientApi.get(`/disasters/${id}`),
    "Disaster fetched successfully",
    false
  )
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


  export const donateResource =  (resource:Resource)=>{
    return apiActionWrapper<any>(
        () => clientApi.post("/resources/create", resource),
        "Resource donated successfully"
      )
  }

  export const reportRumor = (rumor:Rumor)=>{
    return apiActionWrapper<any>(
        () => clientApi.post("/rumors/report", rumor),
        "Rumor reported successfully"
      )
  }
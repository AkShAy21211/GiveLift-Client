"use server";

import { createSSRApi } from "@/lib/api/server";
import { User } from "@/lib/types";
import { headers } from "next/headers";

// Server action to fetch coordinators
export async function getCoordinators(): Promise<User[]> {
  try {
    const headersConfigs = await headers()
    const api = await createSSRApi(headersConfigs);
    const response = await api.get("/users?role=district_coordinator");
    return response.data as User[];
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    throw error;
  }
}

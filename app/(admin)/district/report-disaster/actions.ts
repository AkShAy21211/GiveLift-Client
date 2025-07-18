"use server";

import { createSSRApi } from "@/lib/api/server";

export async function getDisasters(header: Headers) {
  try {
    const api = await createSSRApi(header);
    const response = await api.get("/disasters")
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

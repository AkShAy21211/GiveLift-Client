"use server";

import { createSSRApi } from "@/lib/api/server";

export async function getDisasters(header: Headers) {
  try {
    const api = await createSSRApi(header);
    const response = await api.get("/disaster")
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

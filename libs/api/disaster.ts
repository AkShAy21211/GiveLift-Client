import { api } from "../axios";
import { DISASTER_ROUTES } from "../constants/constants";

export const getAllDisasters = async (limit: number) => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // ⏳ Delay for 3 seconds

  const response = await api.get(`${DISASTER_ROUTES.list}?limit=${limit}`);
  return response.data;
};

import { api } from "../axios";
import { DISASTER_ROUTES } from "../constants/constants";

export const getAllDisasters = async (limit: number) => {
  const response = await api.get(`${DISASTER_ROUTES.list}?limit=${limit}`);
  return response.data;
};

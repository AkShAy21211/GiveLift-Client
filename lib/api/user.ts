import { api } from "../axios";
import { USER_ROUTE } from "../constants/constants";
import { User } from "../types";

export const getUserProfile = async () => {
  const response = await api.get(USER_ROUTE.profile);
  return response;
};
export const updateUserPofile = async (userData: User) => {
  const response = await api.put(USER_ROUTE.updateProfie, userData);
  return response;
};

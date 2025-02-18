import { api } from "../axios";
import { ADMIN_ROUTE, AUTH_ROUTES } from "../constants/constants";
import { Coordinator } from "../types";

export type LoginType = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginType) => {
  const response = await api.post(AUTH_ROUTES.adminLogin, { email, password });
  return response;
};



export const createCoordinator = async (coordinatorData: Coordinator) => {
  const response = await api.post(ADMIN_ROUTE.createCoordinator, coordinatorData);
  return response;
};

export const getCoordinators = async (page:number,limit:number) => {

  const response = await api.get(`${ADMIN_ROUTE.getCoordinators}?page=${page}&limit=${limit}`);
  return response;
}
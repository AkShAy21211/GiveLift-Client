import { api } from "../axios";
import { ADMIN_ROUTE, AUTH_ROUTES } from "../constants/constants";

export type LoginType = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginType) => {
  const response = await api.post(AUTH_ROUTES.adminLogin, { email, password });
  return response;
};

export type CreateCordinatorType={
  name: string;
  email: string;
  password: string;
  address: { district: string; city: string; pincode: number };
  phone: string;
  role?: string; 

}

export const createCoordinator = async (coordinatorData: CreateCordinatorType) => {
  const response = await api.post(ADMIN_ROUTE.createCoordinator, coordinatorData);
  return response;
};

export const getCoordinators = async (page:number,limit:number) => {

  const response = await api.get(`${ADMIN_ROUTE.getCoordinators}?page=${page}&limit=${limit}`);
  return response;
}
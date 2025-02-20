import { api } from "../axios";
import { DISASTER_ROUTES } from "../constants/constants";
import { DisasterReport } from "../types";

export const getAllDisasters = async (limit: number,page:number) => {
    await new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 5000)
  );
  const response = await api.get(`${DISASTER_ROUTES.list}?limit=${limit}&page=${page}`);
  return response;
};


export const reportDisasters = async (disaster:FormData) => {
  const response = await api.post(`${DISASTER_ROUTES.report}`,disaster);
  return response;
};

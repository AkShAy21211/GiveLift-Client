import { DisasterReport } from "../types";
import { apiActionWrapper } from "../utils";
import { clientApi } from "./client";
const disaster = "/districts";
const disasters = "/disasters"


//  Get All Districts
export const getDistricts = async (): Promise<
  { _id: string; name: string }[]
> => {
  const res = await clientApi.get(`${disaster}?state=Kerala&select=name`);
  
  return res.data;
};

//  Create Disaster Report
export const createDisasterReport = (formData: DisasterReport) => {
  return apiActionWrapper(
    () => clientApi.post(`${disasters}/report`, formData),
    "Disaster report created"
  );
};
import { clientApi } from "./client";
const disaster = "/districts";

//  Get All Districts
export const getDistricts = async (): Promise<
  { _id: string; name: string }[]
> => {
  const res = await clientApi.get(`${disaster}?state=Kerala&select=name`);
  console.log(res.data);
  
  return res.data;
};
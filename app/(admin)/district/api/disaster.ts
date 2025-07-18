import { clientApi } from "@/lib/api/client";
import { apiActionWrapper } from "@/lib/utils";
import { DisasterReport } from "@/lib/types";

const disaster = "/disaster";
//  Create Disaster Report
export const createDisasterReport = (formData: DisasterReport) => {
  return apiActionWrapper(
    () => clientApi.post(`${disaster}/report`, formData),
    "Disaster report created"
  );
};

//  Update Disaster Report
export const updateDisasterReport = (id: string, formData: DisasterReport) => {
  return apiActionWrapper(
    () => clientApi.put(`${disaster}/${id}`, formData),
    "Disaster report updated"
  );
};

//  Update Status of Report
export const updateDisasterReportStatus = (
  id: string,
  status: DisasterReport["status"]
) => {
  return apiActionWrapper(
    () => clientApi.patch(`${disaster}/${id}/status`, { status }),
    "Status updated successfully"
  );
};

//  Get Report by ID
export const getDisasterReportById = (id: string) => {
  return apiActionWrapper<DisasterReport>(
    () => clientApi.get(`${disaster}/${id}`).then((res) => res.data),
    "Disaster report fetched successfully"
  );
};

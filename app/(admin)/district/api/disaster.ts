import { clientApi } from "@/lib/api/client";
import { apiActionWrapper } from "@/lib/utils";
import { DisasterReport } from "@/lib/types";

const disaster = "/disasters";

interface GetDisasterReportsParams {
  page?: number;
  perPage?: number;
  search?: string;
  severity?: string;
  status?: string;
  // You can add more filter parameters as needed
}

interface GetDisasterReportsResponse {
  reports: any[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function getDisasterReports(
  params: GetDisasterReportsParams = {}
): Promise<GetDisasterReportsResponse> {
  const queryParams = new URLSearchParams();

  // Add pagination parameters
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.perPage) queryParams.append("limit", params.perPage.toString());
  
  // Add search parameter
  if (params.search) queryParams.append("search", params.search);
  
  // Add severity filter parameter
  if (params.severity) queryParams.append("severity", params.severity);
  
  // Add status filter parameter
  if (params.status) queryParams.append("status", params.status);

  try {
    const response = await clientApi.get(`/disasters?${queryParams.toString()}`);
        
    return {
      reports: response.data.disasters || response.data.data || [],
      totalCount: response.data.totalCount || response.data.total || 0,
      totalPages: response.data.totalPages || Math.ceil(
        (response.data.totalCount || response.data.total || 0) / (params.perPage || 10)
      ),
      currentPage: response.data.currentPage || params.page || 1,
    };
  } catch (error) {
    console.error("Disaster Reports API Error:", error);
    throw error;
  }
}




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

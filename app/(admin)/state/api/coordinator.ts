import { clientApi } from "@/lib/api/client";
import { apiActionWrapper } from "@/lib/utils";

const base = "/users";

interface GetUsersParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
  district?: string;
  role?: string;
}

interface GetUsersResponse {
  users: any[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function getUsers(
  params: GetUsersParams = {}
): Promise<GetUsersResponse> {
  const queryParams = new URLSearchParams();


  // Add role parameter first if specified
  if (params.role) queryParams.append("role", params.role);
  
  // Add pagination parameters
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.perPage) queryParams.append("limit", params.perPage.toString());
  
  // Add search parameter
  if (params.search) queryParams.append("search", params.search);
  
  // Handle isActive parameter correctly - only append if explicitly set
  if (typeof params.isActive === "boolean") {
    queryParams.append("isActive", params.isActive.toString());
  }
  
  // Add district parameter
  if (params.district) queryParams.append("district", params.district);

  
  try {
    const response = await clientApi.get(`/users?${queryParams.toString()}`);
    
    console.log("API Response:", response.data);
    
    return {
      users: response.data.users || response.data.data || [],
      totalCount: response.data.totalCount || response.data.total || 0,
      totalPages: response.data.totalPages || Math.ceil(
        (response.data.totalCount || response.data.total || 0) / (params.perPage || 10)
      ),
      currentPage: response.data.currentPage || params.page || 1,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const createUser = async (formData: any) => {
  return apiActionWrapper(
    () => clientApi.post(`${base}/create`, formData),
    "User created successfully"
  );
};

export const updateUser = (id: string, formData: any) => {
  return apiActionWrapper(
    () => clientApi.put(`${base}/${id}`, formData),
    "User updated successfully"
  );
};

export const deactivateUser = (id: string) => {
  return apiActionWrapper(
    () => clientApi.patch(`${base}/${id}/deactivate`),
    "User deactivated successfully"
  );
};

export const restoreUser = (id: string) => {
  return apiActionWrapper(
    () => clientApi.patch(`${base}/${id}/restore`),
    "User restored successfully"
  );
};
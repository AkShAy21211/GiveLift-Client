"use server";

import { createSSRApi } from "@/lib/api/server";
import { User } from "@/lib/types";
import { headers } from "next/headers";

// Interface for pagination and filtering parameters
interface GetCoordinatorsParams {
  page?: number;
  perPage?: number;
  search?: string;
  status?: string;
  district?: string;
}

// Interface for the response
interface GetCoordinatorsResponse {
  coordinators: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

// Server action to fetch coordinators with pagination and filtering
export async function getCoordinators(
  params: GetCoordinatorsParams = {}
): Promise<GetCoordinatorsResponse> {
  try {
    const headersConfigs = await headers();
    const api = await createSSRApi(headersConfigs);
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('role', 'district_coordinator');
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.perPage) queryParams.append('limit', params.perPage.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status && params.status !== 'all') {
      queryParams.append('status', params.status);
    }
    if (params.district && params.district !== 'all') {
      queryParams.append('district', params.district);
    }
    
    const response = await api.get(`/users?${queryParams.toString()}`);
    return {
      coordinators: response.data.users || response.data,
      totalCount: response.data.totalCount || response.data.length,
      totalPages: response.data.totalPages || Math.ceil((response.data.totalCount || response.data.length) / (params.perPage || 10)),
      currentPage: response.data.currentPage || params.page || 1,
    };
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    throw error;
  }
}
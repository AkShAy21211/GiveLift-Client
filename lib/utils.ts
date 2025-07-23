import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}


// Severity color mapping
export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    case "moderate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Status color mapping
export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "verified":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "resolved":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export async function apiActionWrapper<T>(
  action: () => Promise<{ data: T }>,
  successMessage = "Operation successful",
  showToast = true // ✅ Optional toast flag
): Promise<ApiResponse<T>> {
  try {
    const response = await action();
    const message = (response.data as any)?.message || successMessage;

    if (showToast) {
      toast.success(message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }

    return {
      success: true,
      message,
      data: response.data,
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error);
    }

    if (showToast) {
      toast.error(message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }

    return {
      success: false,
      message,
    };
  }
}

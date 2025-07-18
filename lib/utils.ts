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

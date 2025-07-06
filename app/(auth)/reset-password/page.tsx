"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { resetPasswordHandler } from "@/lib/api/auth";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
  token: string;
};

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const response = await resetPasswordHandler(data);
      toast.success(response.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Invalid or missing token
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Please use the password reset link sent to your email.
          </p>
          <Link href="/forgot-password">
            <Button className="bg-[#1A5F7A] hover:bg-[#235163] text-white">
              Go to Forgot Password
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Reset Password
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="password" className="text-gray-700">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="mt-1 pr-10 border-gray-300 focus:border-gray-400 focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your new password"
                  className="mt-1 pr-10 border-gray-300 focus:border-gray-400 focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Input type="hidden" {...register("token")} />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1A5F7A] hover:bg-[#235163] text-white"
            >
              {isSubmitting ? <LoaderCircle className="animate-spin" />: "Set New Password"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <Link href="/login" className="text-gray-800 underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

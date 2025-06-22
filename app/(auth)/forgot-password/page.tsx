"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgortPasswordHandler } from "@/lib/api/auth";
import { forgotPasswordSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const response = await forgortPasswordHandler(data);
      toast.success(response.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Reset Password
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email."
                className="mt-1 border-gray-300 focus:border-gray-400 focus:ring-0"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1A5F7A] hover:bg-[#235163] text-white"
            >
             {
              isSubmitting? <LoaderCircle className="animate-spin" /> : "Reset Password"
             }
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

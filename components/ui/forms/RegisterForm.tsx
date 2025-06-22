"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/lib/validation";
import { registerHandler } from "../../../lib/api/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const registerData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await registerHandler(registerData);
      toast.success(response.message,{
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name" className="text-gray-700">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          {...register("name")}
          className="mt-1 border-gray-300 focus:border-gray-400 focus:ring-0"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email address"
          className="mt-1 border-gray-300 focus:border-gray-400 focus:ring-0"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            placeholder="Enter your password."
            className="mt-1 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform translate-y-1/2 text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Label htmlFor="confirmPassword" className="text-gray-700">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("confirmPassword")}
            placeholder="Confirm your password."
            className="mt-1 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform translate-y-1/2 text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-gray-800 underline">
          Login
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#1A5F7A] hover:bg-[#235163] text-white"
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;

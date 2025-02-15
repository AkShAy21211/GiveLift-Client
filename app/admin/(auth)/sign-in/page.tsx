"use client";
import LoginForm from "@/app/components/form/LoginForm";
import { login, LoginType } from "@/lib/api/auth";
import { loginSuccess } from "@/store/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (userData: LoginType) => {
    try {
      const response = await login(userData);
      toast.success(response.data.message);
      dispatch(loginSuccess(response.data.role));
      router.push("/admin/dashboard");
      return;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
      return;
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-around min-h-screen p-4 bg-gray-100">
      {/* Left Side - Image */}
      

      {/* Right Side - Form */}
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

export default SignIn;

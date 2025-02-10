"use client";
import { LoginType } from "@/libs/api/auth";
import { loginValidationSchema } from "@/libs/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
interface LoginFormProps {
  onSubmit: (userData:LoginType) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, serEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      serEmail(value);
    } else {
      setPassword(value);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  return (
    <div className="w-full md:w-1/3 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign In</h2>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Email & pasword */}
        <div className="flex flex-col gap-4 ">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              onChange={onChange}
              placeholder="e.g. john@example.com"
              className="w-full p-3 border border-black rounded-lg"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="e.g. ********"
              className="w-full p-3 border border-black rounded-lg"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
        </div>
        <Link
          className="text-right  float-right text-blue-500"
          href={"/forgot-password"}
        >
          Forgot Password?
        </Link>
        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

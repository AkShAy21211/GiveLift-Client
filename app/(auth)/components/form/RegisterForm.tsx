"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/app/(auth)/validation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerHandler } from "@/app/(auth)/api";
import { useRouter } from "next/navigation";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      district: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    district: string;
  }) => {
    const response = await registerHandler({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      district: data.district,
    });

    if (response.success) {
      router.push("/login");
      reset();
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
        <Label htmlFor="email" className="text-gray-700">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="phone"
          {...register("phone")}
          placeholder="Enter your phone number"
          className="mt-1 border-gray-300 focus:border-gray-400 focus:ring-0"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="hidden">
        <Label className="text-gray-700">Country</Label>
        <CountrySelect
          onChange={(e: any) => {
            setCountryid(e.id);
            setValue("country", e.name);
          }}
          value={101}
          defaultValue={
            {
              id: 101,
              name: "India",
            } as any
          }
          placeHolder="Select Country"
          containerClassName="mt-1 border-gray-300 rounded-md focus:border-gray-400 focus:ring-0"
          inputClassName="w-full p-2 border rounded-md"
        />
      </div>

      <div className="hidden">
        <Label className="text-gray-700">State</Label>
        <StateSelect
          countryid={countryid || 101}
          value={4028}
          defaultValue={
            {
              id: 4028,
              name: "Kerala",
            } as any
          }
          placeHolder="Select State"
          containerClassName="mt-1 border-gray-300 rounded-md focus:border-gray-400 focus:ring-0"
          inputClassName="w-full p-2 border rounded-md"
        />
        {errors.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
        )}
      </div>

      <div>
        <Label className="text-gray-700">District</Label>
        <CitySelect
          countryid={countryid || 101}
          stateid={stateid || 4028}
          onChange={(e: any) => {
            setValue("district", e.name);
          }}
          placeHolder="Select City"
          containerClassName="mt-1 border-gray-300 rounded-md focus:border-gray-400 focus:ring-0"
          inputClassName="w-full p-2 border rounded-md"
        />
        {errors.district && (
          <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
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

"use client"
import { RegisterType } from "@/libs/api/auth";
import { USER_ROLE } from "@/libs/types";
import { registerValidationSchema } from "@/libs/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface RegisterFormProps {
  onSubmit: (userData: RegisterType) => void;

}

function RegisterForm({ onSubmit }: RegisterFormProps) {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: { district: "", city: "", pincode: "" },
    phone: "",
  });



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  return (
    <div className="w-full md:w-1/3 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign Up</h2>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input {...register("name")} placeholder="e.g. John Doe" className="w-full p-3 border border-black rounded-lg" />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input {...register("email")} placeholder="e.g. john@example.com" className="w-full p-3 border border-black rounded-lg" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input type="password" {...register("password")} placeholder="********" className="w-full p-3 border border-black rounded-lg" />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input type="password" {...register("confirmPassword")} placeholder="Re-enter password" className="w-full p-3 border border-black rounded-lg" />
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>
        </div>

        {/* District, City & PIN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">District</label>
            <input {...register("address.district")} placeholder="District" className="w-full p-3 border border-black rounded-lg" />
            <p className="text-red-500 text-sm">{errors.address?.district?.message}</p>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">City</label>
            <input {...register("address.city")} placeholder="City" className="w-full p-3 border border-black rounded-lg" />
            <p className="text-red-500 text-sm">{errors.address?.city?.message}</p>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">PIN Code</label>
            <input {...register("address.pincode")} placeholder="123456" className="w-full p-3 border border-black rounded-lg" />
            <p className="text-red-500 text-sm">{errors.address?.pincode?.message}</p>
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-gray-700 mb-1">Mobile Number</label>
          <input {...register("phone")} placeholder="e.g. 9876543210" className="w-full p-3 border border-black rounded-lg" />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
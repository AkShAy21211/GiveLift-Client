"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCoordinatorSchema } from "@/libs/validation";
import { CreateCordinatorType } from "@/libs/api/admin";



type CreateCordinatorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (coordinatorData: CreateCordinatorType) => Promise<void>;
};

function CreateCordinatorModal({ isOpen, onClose ,onSubmit}: CreateCordinatorModalProps) {
  const [image, setImage] = useState<string | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCoordinatorSchema),
  });



  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null; // Hide modal when not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 z-50">
      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-xl transform transition-all scale-95 sm:scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">Create Coordinator</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
            ✖
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 overflow-y-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input {...register("name")} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter name" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input {...register("email")} type="email" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter email" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input {...register("phone")} type="tel" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter phone number" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Address - District */}
            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input {...register("address.district")} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter district" />
              {errors.address?.district && <p className="text-red-500 text-sm mt-1">{errors.address.district.message}</p>}
            </div>

            {/* Address - City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input {...register("address.city")} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter city" />
              {errors.address?.city && <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>}
            </div>

            {/* Address - Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input {...register("address.pincode")} type="number" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter pincode" />
              {errors.address?.pincode && <p className="text-red-500 text-sm mt-1">{errors.address.pincode.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input {...register("password")} type="password" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter password" />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Image Upload (Optional) */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
              {image && <img src={image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg border" />}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-5 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCordinatorModal;

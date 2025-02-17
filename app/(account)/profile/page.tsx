"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import { getUserProfile, updateUserPofile } from "@/lib/api/user";
import { User } from "@/lib/types";
import { profileSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        city: "",
        district: "",
        pincode: 0,
      },
    },
    resolver: yupResolver(profileSchema),
  });

  // Fetch user profile on component mount
  useEffect(() => {
    async function fetchProfile(): Promise<void> {
      try {
        const response = await getUserProfile();
        setUser(response.data);
        reset(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    }

    fetchProfile();
  }, [reset]);

  // update user profile handler

  async function onSubmit(userData: User): Promise<void> {
    if (!userData) return;
    try {
      const response = await updateUserPofile(userData);
      if (response.data) {
        toast.success(response.data.message);
        return;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Failed to update user profile", error);
    }
  }

  // Show skeleton loader if user data is still loading
  if (!user) {
    return <ProfileSkeleton />;
  }

  return (
    <div id="profile-info" className="p-10 w-full h-auto flex justify-center">
      <form
        className="p-4 w-full md:w-2/3"
        onSubmit={handleSubmit(onSubmit as any)}
      >
        <div className="h-auto mb-10 flex justify-center items-center">
          <Image
            alt="user_avatar"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            width={100}
            className="rounded-full"
            height={100}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Input
            error={errors.name?.message}
            label={"Name"}
            type="text"
            name="name"
            defaultValue={user.name}
            register={register}
            className="w-full"
          />
          <Input
            error={errors.email?.message}
            label={"Email"}
            type="text"
            defaultValue={user.email}
            register={register}
            name="email"
            className="w-full"
          />
          <Input
            error={errors.phone?.message}
            label={"Phone"}
            type="text"
            defaultValue={user.phone}
            {...register("phone")}
            className="w-full"
          />
          <Input
            error={errors.address?.district?.message}
            label={"District"}
            type="text"
            defaultValue={user.address.district}
            register={register}
            name="address.district"
            className="w-full"
          />
          <Input
            error={errors.address?.city?.message}
            label={"City"}
            type="text"
            defaultValue={user.address.city}
            register={register}
            name="address.city"
            className="w-full"
          />
          <Input
            error={errors.address?.pincode?.message}
            label={"Pincode"}
            type="text"
            defaultValue={user.address.pincode}
            register={register}
            name="address.pincode"
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          disabled={!isDirty}
          className={`w-full ${
            isDirty
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-400 hover:bg-blue-400"
          } mt-3 text-white`}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Profile;

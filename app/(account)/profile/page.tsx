"use client";
import React, { useEffect, useState } from "react";
import { User, ViewType } from "@/libs/types";
import { getUserProfile, updateUserPofile } from "@/libs/api/user";
import dynamic from "next/dynamic";
import ProfileFormSkeleton from "../../components/skleton/ProfileFormSkeleton";
import toast from "react-hot-toast";

const ProfileForm = dynamic(() => import("../../components/form/ProfileForm"), {
  ssr: false,
  loading: () => <ProfileFormSkeleton />,
});

 function Profile() {
  const [userProfile, setUserProfile] = useState<any>({});
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response.data);
        setRefetch(false);
        return;
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };
    fetchUserProfile();
  }, []);

  const updateProfile = async (data: User) => {
    try {
      const response = await updateUserPofile(data);
      if (response.data) {
        toast.success(response.data.message);
        return;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Error updating user profile", error);
    }
  };
  return <ProfileForm onSubmit={updateProfile} userData={userProfile} />;
}

export default Profile;
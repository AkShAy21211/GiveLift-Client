"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { User } from "@/libs/types";
import { getUserProfile, updateUserPofile } from "@/libs/api/user";
import dynamic from "next/dynamic";
import ProfileFormSkeleton from "../../components/skleton/ProfileFormSkeleton";
import toast from "react-hot-toast";

const ProfileForm = dynamic(() => import("../../components/form/ProfileForm"), {
  ssr: false,
  loading: () => <ProfileFormSkeleton />,
});

function Profile() {
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    document.title = "Profile";
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response.data);
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
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.error("Error updating user profile", error);
    }
  };

  return (
    <>
      {userProfile ? (
        <ProfileForm onSubmit={updateProfile} userData={userProfile} />
      ) : (
        <ProfileFormSkeleton />
      )}
    </>
  );
}

export default Profile;

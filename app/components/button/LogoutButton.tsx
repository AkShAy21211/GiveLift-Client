"use client";
import { logout } from "@/libs/api/auth";
import { logoutSuccess } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.data.status) {
        router.push("/sign-in");
        toast.success(response.data.message);
        dispatch(logoutSuccess());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      className="w-full text-left px-4 py-2 mt-3 text-red-500"
      onClick={logoutHandler}
      title="Logout"
    >
      Logout
    </button>
  );
}

export default LogoutButton;

"use client";
import React from "react";
import { PROFILE_MENU } from "@/libs/constants/constants";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "@/store/authSlice";
import { logout } from "@/libs/api/auth";
import LogoutButton from "../button/LogoutButton";
import Link from "next/link";
type ViewType = "profile" | "donations" | "reports";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="p-4 flex flex-col items-center md:h-screen border-r">
      {PROFILE_MENU.map((item, index) => (
        <Link
          href={item.route}
          aria-label={item.name}
          title={item.name}
          key={index}
          className={`w-full text-left px-4 py-2  mt-3 ${
            item.route === pathname ? "bg-blue-500 text-white" : "text-black"
          }`}
        >
          {item.name}
        </Link>
      ))}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;

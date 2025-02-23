"use client";

import { useState } from "react";
import { LogOut, Phone, User, HeartHandshake, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "@/store/authSlice";
import { RootState } from "@/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutSuccess());
    localStorage.clear();
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={` hidden md:block fixed top-16 left-0 h-screen  bg-white shadow-lg w-64 p-4  ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 `}
      >
        {/* Navigation Links */}
        <nav className="mt-8 space-y-4 ">
          <Link
            href="/profile"
            className="flex items-center space-x-3 p-2 hover:bg-gray-100"
          >
            <User size={20} />
            <span>Profile</span>
          </Link>
          {role === "coordinator" && (
            <Link
              href="/admin/disasters"
            className="flex items-center space-x-3 p-2 hover:bg-gray-100"
            >
              <ShieldAlert size={20} />
              <span>My Reports</span>
            </Link>
          )}
          <Link
            href="/contact"
            className="flex items-center space-x-3 p-2 hover:bg-gray-100"
          >
            <Phone size={20} />
            <span>Contact</span>
          </Link>
          <Link
            href="/coordinators"
            className="flex items-center space-x-3 p-2 hover:bg-gray-100"
          >
            <HeartHandshake size={20} />
            <span>Coordinators</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center space-x-3 p-2 text-red-500 hover:bg-red-100 w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1  ml-0 md:ml-64 p-6 mt-20">
        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}

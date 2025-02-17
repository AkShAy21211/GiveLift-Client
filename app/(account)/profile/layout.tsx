"use client";

import { useState } from "react";
import { LogOut, Phone, User, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={` hidden md:block fixed top-16 left-0 h-screen  bg-white shadow-lg w-64 p-4  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
          <button className="flex items-center space-x-3 p-2 text-red-500 hover:bg-red-100 w-full">
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

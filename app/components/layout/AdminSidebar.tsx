"use client";
import React, { useState } from "react";
import LogoutButton from "../button/LogoutButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ADMIN_MENU } from "../../../libs/constants/constants";
import { Menu, X } from "lucide-react"; // Icons

function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 fixed top-4 right-4 z-50 bg-gray-200 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r transform transition-transform duration-300 ${
          isOpen ? "translate-x-0 z-50" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-60 md:flex md:flex-col md:h-screen p-4`}
      >
        {/* Menu Items */}
        {ADMIN_MENU.map((item, index) => (
          <Link
            href={item.route}
            aria-label={item.name}
            key={index}
            title={item.name}
            className={`block px-4 py-2 mt-3 rounded-lg ${
              item.route === pathname
                ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                : "text-black hover:bg-slate-200"
            }`}
          >
            {item.name}
          </Link>
        ))}
        <LogoutButton />
      </div>

      {/* Overlay (For Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default AdminSidebar;

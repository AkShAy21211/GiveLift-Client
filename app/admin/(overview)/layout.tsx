"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShieldAlert,
  HandCoins,
  Newspaper,
  HeartHandshake,
  ShieldPlus,
  Users,
  MessageSquareText,
} from "lucide-react";
import Image from "next/image";
import logo from "@/app/assests/images/logo.png";

function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen  w-full overflow-auto">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50   shadow-lg transition-all duration-300 
          ${isOpen ? "w-64" : "w-16"} md:relative`}
      >
        <div className="p-4 flex justify-between items-center bg-white ">
          <span className={`${isOpen ? "block" : "hidden"} font-bold text-xl`}>
            <Image src={logo} width={100} height={10} alt="logo" />
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2  focus:outline-none"
          >
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
        <nav className="flex flex-col gap-4 p-4  bg-white h-screen">
          <Link
            href="/admin/dashboard"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <LayoutDashboard />{" "}
            <span className={isOpen ? "ml-2" : "hidden"}>Dashboard</span>
          </Link>
          <Link
            href="/admin/disasters"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <ShieldAlert />{" "}
            <span className={isOpen ? "ml-2" : "hidden"}>Disasters</span>
          </Link>
          <Link
            href="/admin/donations"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <HandCoins />{" "}
            <span className={isOpen ? "ml-2" : "hidden"}>Donations</span>
          </Link>
          <Link
            href="/admin/news"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <Newspaper />{" "}
            <span className={isOpen ? "ml-2" : "hidden"}>News</span>
          </Link>
          <Link
            href="/admin/coordinators"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <ShieldPlus />{" "}
            <span className={isOpen ? "ml-2" : "hidden"}>Coordinators</span>
          </Link>
          <Link
            href="/admin/volunteers"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <HeartHandshake />{" "}
            <span className={isOpen ? "ml-2" : "hidden"}>Volunteers</span>
          </Link>
          <Link
            href="/admin/users"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <Users /> <span className={isOpen ? "ml-2" : "hidden"}>Users</span>
          </Link>
          <Link
            href="/admin/chats"
            className="hover:bg-blue-500 p-2 hover:text-white rounded flex items-center"
          >
            <MessageSquareText />
            <span className={isOpen ? "ml-2" : "hidden"}>Chats</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between h-20 items-center"></header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-white text-center p-4 text-sm border-t">
          &copy; {new Date().getFullYear()} GiveLift
        </footer>
      </div>
    </div>
  );
}

export default Layout;

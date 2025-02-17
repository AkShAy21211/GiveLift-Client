"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, CircleUser } from "lucide-react"; // Icons for mobile menu
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assests/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUser } from "@/store/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // To prevent hydration mismatch
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true); // Ensures component is mounted before rendering dynamic content
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-20 p-4">
        {/* 🔹 Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image src={logo} alt="GiveLift Logo" width={120} height={40} />
        </Link>

        {/* 🔹 Desktop Menu (Links) */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className=" py-2">
            About
          </Link>

          <Link href="/contact" className=" py-2">
            Contact
          </Link>

          {/* 🔹 Conditional Rendering with isMounted Fix */}
          {isMounted && !isAuthenticated ? (
            <>
              <Link
                href="/sign-in"
                className="border-2 px-4 py-2 text-sm rounded-lg"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 text-sm text-white px-4 py-2 rounded-lg"
              >
                Sign up
              </Link>
            </>
          ) : (
            <Link
              href="/profile"
              className="  px-4 py-2 rounded-lg"
            >
              <CircleUser />
            </Link>
          )}
        </nav>

        {/* 🔹 Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-4 flex flex-col space-y-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>

            {/* 🔹 Conditional Rendering for Auth Links */}
            {isMounted && !isAuthenticated ? (
              <>
                <Link
                  href="/sign-in"
                  className="border-2 px-4 py-2 text-sm rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-600 text-sm text-white px-4 py-2 rounded-lg"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                href="/profile"
                className="  py-2 rounded-lg"
              >
                Account
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

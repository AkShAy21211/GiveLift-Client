"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/libs/api/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutSuccess } from "@/store/authSlice";
import { RootState } from "@/store/store";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Sync auth state with client
  useEffect(() => {
    setIsAuthenticated(authState?.isAuthenticated || false);
  }, [authState]);

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
    <>
      <header className="sticky top-0 flex justify-between items-center px-4 shadow-md bg-white z-50 h-20">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image alt="logo" src="/img/logo.png" width={130} height={130} />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <nav className="flex space-x-6">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/services" className="hover:underline">Services</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
          <div className="space-x-4">
            {isAuthenticated === null ? null : isAuthenticated ? (
              <button
                onClick={logoutHandler}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 border border-black rounded-md"
                >
                  Sign Up
                </Link>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/services" className="hover:underline">Services</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            {isAuthenticated === null ? null : isAuthenticated ? (
              <button
                onClick={logoutHandler}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 border border-black rounded-md"
                >
                  Sign Up
                </Link>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Sign In
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;

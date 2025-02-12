"use client";
import React, { useEffect, useState } from "react";
import { CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/authSlice";
import { RootState } from "@/store/store";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Prevent flickering
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.user?.isAuthenticated
  );

  // Sync auth state with client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
      setLoading(false); // Done loading
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 flex justify-between items-center px-4 shadow-md bg-white z-50 h-20">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image alt="logo" src="/img/logo.png" width={130} height={130} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <nav className="flex space-x-6">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
          <div className="space-x-4">
            {!loading && isAuthenticated ? (
              <Link href="/profile" className="px-4 py-2 rounded-md">
                <CircleUserRound />
              </Link>
            ) : (
              !loading && (
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
              )
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-white shadow-md absolute top-20 left-0 w-full z-50">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/about"
              className="hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!loading && isAuthenticated ? (
              <Link
                href="/profile"
                className=" py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            ) : (
              !loading && (
                <>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 border border-black rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </>
              )
            )}
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;

"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center h-24 p-4 shadow-md">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image alt="logo" src={"/img/logo.png"} width={130} height={130} />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
            <Link href={"/sign-up"} className="px-4 py-2 border border-black rounded-md">
              Sign Up
            </Link>
            <Link href={'/sign-in'} className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Sign In
            </Link>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <button className="px-4 py-2 border border-black rounded-md">
              Sign Up
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Sign In
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;

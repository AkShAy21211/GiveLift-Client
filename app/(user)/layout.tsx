"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, User, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/store/store";
import { DonationModal } from "@/components/modal/DonateResourceModal";
import { logoutHandler } from "@/lib/api/auth";
import { logoutAction } from "@/store/authSlice";
import { toast } from "sonner";
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const role = useSelector((state: RootState) => state.auth?.role);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutHandler();

      dispatch(logoutAction());
      persistor.purge();
      localStorage.removeItem("auth");
      router.push("/login");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };
  return (
    <header className="bg-[#1A5F7A] text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold">GiveLift</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white border-0"
            >
              Request Help
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency Contact
            </Button>
            {/* <DonationModal /> */}
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 bg-teal-600 px-3 py-2 rounded-lg">
                  <Link
                    href={"/profile"}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <User className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-sm font-medium bg-white text-black px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-white text-black px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-teal-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-teal-600">
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                variant="secondary"
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white border-0 w-full justify-start"
              >
                Request Help
              </Button>

              <Button
                variant="secondary"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 w-full justify-start"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Contact
              </Button>

              <DonationModal />

              {/* Auth Links - Mobile */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 bg-teal-600 px-3 py-2 rounded-lg">
                  <Link
                    href={"/profile"}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <User className="w-4 h-4 text-white" />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    href="/login"
                    className="text-sm font-medium bg-white text-black px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-medium bg-white text-black px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#1A5F7A] py-4 text-center text-sm text-white border-t">
      © {new Date().getFullYear()} GiveLift. All rights reserved.
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

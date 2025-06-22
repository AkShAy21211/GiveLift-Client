import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-[#1A5F7A] py-4 text-center text-sm text-white border-t">
      © {new Date().getFullYear()} GiveLift. All rights reserved.
    </footer>
  );
}

export default Footer;

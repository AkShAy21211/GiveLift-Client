import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assests/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t shadow-lg relative z-50">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {/* 🔹 Left: Logo Section */}
        <div className="flex flex-col items-start">
          <Image src={logo} alt="GiveLift Logo" width={120} height={40} />
        </div>

        {/* 🔹 About Us */}
        <div>
          <h3 className="font-semibold text-lg">About Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt iure
            illo, molestias natus dolorem quidem officia fugit consequatur nisi
            voluptates ipsam expedita numquam autem. Eveniet eum porro facilis
            accusantium praesentium.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="/how-it-works"
                className="text-gray-600 hover:underline"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-gray-600 hover:underline">
                Donate Now
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="text-gray-600 hover:underline">
                Join as Volunteer
              </Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Follow Us */}
        <div>
          <h3 className="font-semibold text-lg">Follow Us On</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="https://linkedin.com"
                className="text-gray-600 hover:underline"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com"
                className="text-gray-600 hover:underline"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="https://instagram.com"
                className="text-gray-600 hover:underline"
              >
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Bottom: Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} GiveLift. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

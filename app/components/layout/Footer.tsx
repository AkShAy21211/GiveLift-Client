import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
        <footer className=" p-6 shadow-lg shadow-black">
          <div className="container mx-auto flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <Image
                alt="logo"
                src={"/img/logo.png"}
                width={130}
                height={130}
              />
            </div>
            <div>
              <h3 className="text-md font-semibold">About Us</h3>
              <p className="text-sm">We provide disaster relief solutions.</p>
            </div>
            <div>
              <h3 className="text-md font-semibold">Quick Links</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <Link href="/faq" className="hover:underline">
                    Disaster
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:underline">
                    Report Disaster
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-semibold">Follow Us</h3>
              <div className="flex   flex-col">
                <Link href="#" className="hover:underline">
                  Facebook
                </Link>
                <Link href="#" className="hover:underline">
                  Twitter
                </Link>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer
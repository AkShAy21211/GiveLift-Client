"use client";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Providers from "./provider";

const newsReader = Newsreader({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const pathname = usePathname();

  const isAuthScreen =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  if (isAuthScreen) {
    return (
      <html lang="en">
        <body className={` ${newsReader.variable} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={` ${newsReader.variable} antialiased`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

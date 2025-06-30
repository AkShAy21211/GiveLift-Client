"use client";
import { Newsreader } from "next/font/google";
import "./globals.css";
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

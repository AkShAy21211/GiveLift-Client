"use client";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../store/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

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

  return (
    <html lang="en">
      <body className={` ${newsReader.variable} antialiased`}>
        <main>
          <Provider store={store}>
            {pathname.startsWith("/admin") ? <></> : <Header />}
            <Toaster position="top-center" />
            {children}
            {pathname.startsWith("/admin") ? <></> : <Footer />}
          </Provider>
        </main>
      </body>
    </html>
  );
}

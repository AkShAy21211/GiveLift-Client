"use client";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../store/store";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
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
        <Provider store={store}>
          <Header/>
          <main>
            <Toaster position="top-center" />
            {children}
          </main>
          <Footer/>
        </Provider>
      </body>
    </html>
  );
}

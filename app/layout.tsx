"use client";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../store/store";

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
          <Toaster position="top-center" />

          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

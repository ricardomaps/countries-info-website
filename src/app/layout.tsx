"use client"
import type { Metadata } from "next";
import Link from "next/link"
import { Nunito_Sans } from "next/font/google"
import { useState } from "react";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Where in the World",
//   description: "Find everything you always wanted to know about the different countries on Earth!",
// }

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setDarkMode] = useState(false);
  return (
    <html lang="en">
      <body className={nunitoSans.className + (isDarkMode ? "dark-theme" : "")}>
        <header className="sticky top-0 z-10 flex justify-between w-full px-16 py-6 bg-skin-card shadow-lg">
          <Link href="/" className="text-lg text-skin-base font-bold">Where in the world?</Link>
          <button onClick={() => setDarkMode(!isDarkMode)} className="text-skin-base"> {isDarkMode ? "Light" : "Dark" } Mode </button>
        </header>
        {children}
      </body>
    </html>
  );
}

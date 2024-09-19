"use client"
import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link"
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setDarkMode] = useState(false);
  return (
    <html lang="en">
      <body className={isDarkMode ? "dark-theme" : ""}>
        <header className="flex justify-between w-full px-16 py-6 bg-skin-card shadow-lg">
          <Link href="/" className="text-lg text-skin-base font-bold">Where in the world?</Link>
          <button onClick={() => setDarkMode(!isDarkMode)} className="text-skin-base"> {isDarkMode ? "Light" : "Dark" } Mode </button>
        </header>
        {children}
      </body>
    </html>
  );
}

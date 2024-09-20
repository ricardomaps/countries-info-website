import type { Metadata } from "next";
import Link from "next/link"
import ThemeProvider from "@/components/ThemeProvider.tsx";
import ThemeSwitcher from "@/components/ThemeSwitcher.tsx";
import { Nunito_Sans } from "next/font/google"
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata: Metadata = {
  title: "Where in the World",
  description: "Find everything you always wanted to know about the different countries on Earth!",
}

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${nunitoSans.className} bg-skin-fill`}>
          <header className="sticky top-0 z-10 flex justify-between w-full px-16 py-6 bg-skin-card shadow-lg">
            <Link href="/" className="text-lg text-skin-base font-bold">Where in the world?</Link>
            <ThemeSwitcher/>
          </header>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}

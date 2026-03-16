import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { MoviesProvider } from "@/context/MoviesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Popcornia – evokes popcorn and fun movie browsing",
  description: "A Next.js app to search and explore movies using the IMDb API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div 
          className="w-full"
          style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/popcorn-background.jpg) bottom center / cover no-repeat" }} 
        >
          <div 
            className="
              max-w-5xl
              mx-auto
              p-2
              sm:p-4
              md:p-6
              lg:p-6
              flex
              flex-col
              md:flex-row
              gap-4
              sm:gap-4
              md:gap-6
              lg:gap-6
              items-center
          ">
            <Link href="/" className="flex items-center gap-4">
              <Image src="/assets/popcornia-logo.jpg" alt="Popcornia logo" width={64} height={64} />
              <div>
                <h1 className="text-4xl font-bold text-white text-shadow:_0_0_0.5px_black">Popcornia</h1>
                <h4 className="text-lg text-white text-shadow:_0_0_0.5px_black">Evokes popcorn and fun movie browsing</h4>
              </div>
            </Link>
          </div>
        </div>
        <MoviesProvider>
          {children}
        </MoviesProvider>
      </body>
    </html>
  );
}

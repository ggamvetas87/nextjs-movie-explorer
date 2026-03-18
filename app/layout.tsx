import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MoviesProvider } from "@/context/MoviesContext";
import Header from "@/components/partial/Header";
import Footer from "@/components/partial/Footer";

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
        <MoviesProvider>
          <Header />
            {children}
          <Footer />
        </MoviesProvider>
      </body>
    </html>
  );
}

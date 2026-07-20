import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdminProvider } from "@/lib/admin-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maeme’s Admin Management Control",
  description: "Frontend-only restaurant operations prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body><AdminProvider>{children}</AdminProvider></body>
    </html>
  );
}

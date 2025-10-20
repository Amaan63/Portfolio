import type { Metadata } from "next";
import "./globals.css";
// 👇 Make sure you are importing HeaderClient here!
import HeaderClient from "@/components/Header/HeaderClient";

export const metadata: Metadata = {
  title: "Amaan Sayyed | Portfolio",
  description: "Gen-Z Developer Portfolio with Spotify vibe 🎧",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white overflow-x-hidden" >
        <HeaderClient /> {/* ✅ Use the client wrapper */}
        {children}
      </body>
    </html>
  );
}
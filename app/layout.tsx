import type { Metadata } from "next";

import Header from "@/components/ui/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bulletin Hub",
  description: "Your best and only place for news",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-stone-100 relative w-screen">
        <Header/>
        {children}
      </body>
    </html>
  );
}

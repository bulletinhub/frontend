import type { Metadata } from "next";
import StoreProvider from '@/app/StoreProvider'

import Header from "@/components/ui/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bulletin Hub",
  description: "Your best and only place for news",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className="bg-stone-100 relative w-screen">
          <Header/>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}

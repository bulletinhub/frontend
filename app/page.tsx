"use client"
import { useRef, useState } from "react";

import Article from "@/components/ui/Article";

// import { Poppins } from "next/font/google";
// const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

export default function Home() {
  
  return (
    <main
      className="
        flex
        justify-center
        z-0
        absolute
        w-full
        h-[calc(100vh-4rem)]
        overflow-y-auto
    ">
      <section
        aria-description="News feed"
        className="
          flex
          flex-wrap
          w-full
          pt-3
          justify-center

          md:max-w-2xl
          lg:max-w-3xl
          xl:max-w-5xl
          2xl:max-w-7xl
      ">
        <Article/>
        <Article/>
        <Article/>
        <Article/>
        <Article/>
        <Article/>
        <Article/>
        <Article/>
      </section>
    </main>
  );
}

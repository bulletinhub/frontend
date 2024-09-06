"use client"
import { useRef, useState } from "react";

// import { Poppins } from "next/font/google";
// const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

export default function SignIn() {
  
  return (
    <>
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
          aria-description="Sign In"
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

            border
            border-red-500
        ">
            <h1>opa fala ae doido</h1>
        </section>
      </main>
    </>
  );
}

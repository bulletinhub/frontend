"use client"
import { useRef, useState, FormEvent } from "react";

import Link from 'next/link';
import { Merriweather, Poppins } from "next/font/google";
const merriweatherFontBold = Merriweather({ subsets: ["latin"], weight: '700' });
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

import Input from "@/components/input/Input";

export default function SignIn() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
  
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
      ">
          <form method="post" onSubmit={handleSubmit} className="flex flex-col items-center justify-start w-80">
            <h1 className={`${merriweatherFontBold.className} text-xl md:text-2xl my-8`}>Sign In</h1>
            <Input type="email" name="email" placeholder="Email address" className="rounded-md border py-2 px-2 mt-3 mb-2 w-full" />
            <Input type="password" name="password" placeholder="Password" className="rounded-md border py-2 px-2 mb-3 mt-2 w-full" />
            <button type="submit" className={`${poppinsFontSemibold.className} btn-primary w-full text-xs md:text-lg`}>Sign In</button>
            <p className={`${poppinsFont.className} my-8 text-stone-700`}>
              Need an account? <Link href="/signup" className="underline">Sign up</Link>
            </p>
            <Link href="/" className={`${poppinsFontSemibold.className} underline`}>Go back to homepage</Link>
          </form>
      </section>
    </main>
  );
}

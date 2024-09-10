"use client"
import { useRef, useState, FormEvent } from "react";

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { Merriweather, Poppins } from "next/font/google";
const merriweatherFontBold = Merriweather({ subsets: ["latin"], weight: '700' });
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

import { setCookie } from '@/utils/cookies'
import Input from "@/components/input/Input";

export default function SignUp() {
  const router = useRouter()
  const [formError, setFormError] = useState('')

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    
    let { data, message } = await fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/user/signup`, { method: form.method, body: formData })
      .then((res) => res.json())
      .catch((error) => console.error(error))
    
    if (data?.token_data.access_token) {
      setCookie('access_token', data.token_data.access_token, data.token_data.expires_in)
      setCookie('user_id', data.user.id, data.token_data.expires_in) // highly insecure, using only for testing purposes
      setFormError('')
      router.push('/')
    } else {
      setFormError(message)
    }
  }
  
  return (
    <main className="flex justify-center z-0 absolute w-full h-[calc(100vh-4rem)] overflow-y-auto">
      <section aria-description="Sign Up" className=" flex flex-wrap w-full pt-3 justify-center md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
          <form method="post" onSubmit={handleSignUp} className="flex flex-col items-center justify-start w-80">
            <h1 className={`${merriweatherFontBold.className} text-xl md:text-2xl my-8`}>Sign Up</h1>
            <Input required minLength={3} type="text" name="name" placeholder="Full name" className="rounded-md border py-2 px-2 mt-3 mb-2 w-full" />
            <Input required type="email" name="email" placeholder="Email address" className="rounded-md border py-2 px-2 mt-3 mb-2 w-full" />
            <Input required minLength={6} type="password" name="password" placeholder="Password" className="rounded-md border py-2 px-2 mb-3 mt-2 w-full" />
            <p className={`${poppinsFont.className} mb-3 mt-2 text-red-500`}>{formError}</p>
            <button type="submit" className={`${poppinsFontSemibold.className} btn-primary w-full text-xs md:text-lg`}>Sign Up</button>
            <p className={`${poppinsFont.className} my-8 text-stone-700`}>
              Already have an account? <Link href="/signin" className="underline">Sign in</Link>
            </p>
            <Link href="/" className={`${poppinsFontSemibold.className} underline`}>Go back to homepage</Link>
          </form>
      </section>
    </main>
  );
}
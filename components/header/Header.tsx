"use client";
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Yeseva_One, Poppins } from "next/font/google";
const yesevaFont = Yeseva_One({ subsets: ["latin"], weight: '400' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '@/app/hooks'
import { openLeftDrawer } from '@/components/drawer/drawersSlice'
import { getCookie } from "@/utils/cookies";

export default function Header() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="flex justify-between items-center w-full h-16 border-b border-black">
      {pathname == "/" ?
        <button
          aria-label="Open left drawer"
          onClick={() => dispatch(openLeftDrawer())}
          className="flex items-center rounded-md h-auto w-auto py-2 px-2 md:px-4"
        >
          <FontAwesomeIcon icon={faSliders} className="text-lg md:text-xl" />
          <span className={`${poppinsFont.className} ml-1.5 text-xs md:text-lg`}>Filters</span>
        </button>
        :
        <div className="w-[74px] md:w-[109px]" />
      }
      <Link href="/"><h1 className={`${yesevaFont.className} text-2xl md:text-3xl`}>Bulletin Hub</h1></Link>
        {(isMounted && getCookie('access_token')) &&
          (pathname !== "/signin" || "/signup") ?
            <Link href="/myaccount">
              <button 
                aria-label="Go to my account page"
                className="btn-outline mr-4"
              >
                <span className={`${poppinsFontSemibold.className} text-xs md:text-lg`}>My Account</span>
              </button>
            </Link>
            :
            <Link href="/signin">
              <button 
                aria-label="Go to sign in page"
                className="btn-primary mr-4"
              >
                <span className={`${poppinsFontSemibold.className} text-xs md:text-lg`}>Sign In</span>
              </button>
            </Link>
        }
    </header>
  );
}

"use client";
import { useRef, useState } from "react";
import Link from 'next/link';

import { Yeseva_One, Poppins } from "next/font/google";
const yesevaFont = Yeseva_One({ subsets: ["latin"], weight: '400' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from '@fortawesome/free-solid-svg-icons';

import { Drawer, DrawerRefProps } from '@/components/ui/Drawer';
import FilterForm from "@/components/form/FilterForm";

export default function Header() {
  const drawerRef = useRef<DrawerRefProps>(null)

  function openDrawer() {
    drawerRef.current?.openDrawer()
  }

  return (
    <>
      <Drawer ref={drawerRef} position="left">
        <FilterForm />
      </Drawer>
      <header className="flex justify-between items-center w-full h-16 border-b border-black">
        <button
          aria-label="Open left drawer"
          onClick={() => openDrawer()}
          className="flex items-center rounded-md h-auto w-auto py-2 px-2 md:px-4"
        >
          <FontAwesomeIcon icon={faSliders} className="text-lg md:text-xl" />
          <span className={`${poppinsFont.className} ml-1.5 text-xs md:text-lg`}>Filters</span>
        </button>
        <h1 className={`${yesevaFont.className} text-2xl md:text-3xl`}>Bulletin Hub</h1>
        <Link href="/signin">
          <button 
            aria-label="Go to sign in page"
            className="btn-primary mr-2"
          >
            <span className={`${poppinsFontSemibold.className} text-xs md:text-lg`}>Sign In</span>
          </button>
        </Link>
      </header>
    </>
  );
}

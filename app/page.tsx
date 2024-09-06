"use client"
import { useRef, useState } from "react";

import Article from "@/components/ui/Article";

import { Merriweather, Poppins } from "next/font/google";
const merriweatherFontBold = Merriweather({ subsets: ["latin"], weight: '700' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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
        <div className="flex flex-wrap justify-center items-center w-full min-h-40 mb-3">
          <div className="flex items-center justify-center w-full">
            <h1 className={`${merriweatherFontBold.className} text-xl md:text-2xl`}>Filtered News:</h1>
          </div>
          <div className="flex items-center justify-center p-1 w-auto rounded-full border border-black m-1">
            <span className={`${poppinsFont.className} pr-1 pl-2`}>Sarah Blaskey</span>
            <button type="button" title="Remove filter">
              <FontAwesomeIcon icon={faCircleXmark} className="pr-2" />
            </button>
          </div>
          <div className="flex items-center justify-center p-1 w-auto rounded-full border border-black m-1">
            <span className={`${poppinsFont.className} pr-1 pl-2`}>Sports</span>
            <button type="button" title="Remove filter">
              <FontAwesomeIcon icon={faCircleXmark} className="pr-2" />
            </button>
          </div>
          <div className="flex items-center justify-center p-1 w-auto rounded-full border border-black m-1">
            <span className={`${poppinsFont.className} pr-1 pl-2`}>15/09/2024</span>
            <button type="button" title="Remove filter">
              <FontAwesomeIcon icon={faCircleXmark} className="pr-2" />
            </button>
          </div>
          <div className="flex items-center justify-center p-1 w-auto rounded-full border border-black m-1">
            <span className={`${poppinsFont.className} pr-1 pl-2`}>The New York Times</span>
            <button type="button" title="Remove filter">
              <FontAwesomeIcon icon={faCircleXmark} className="pr-2" />
            </button>
          </div>
          <div className="flex items-center justify-center p-1 w-auto rounded-full border border-black m-1">
            <span className={`${poppinsFont.className} pr-1 pl-2`}>barack obama</span>
            <button type="button" title="Remove filter">
              <FontAwesomeIcon icon={faCircleXmark} className="pr-2" />
            </button>
          </div>
        </div>
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

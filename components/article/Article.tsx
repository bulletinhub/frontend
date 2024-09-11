"use client"
import { useRef, useState } from "react";
import Image from 'next/image';

import { Poppins, Merriweather } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
const merriweatherFontBold = Merriweather({ subsets: ["latin"], weight: '700' });

export default function Article({ data }) {
  const thumbSrc = data.url_thumbnail || '/articleFallback.jpeg';
  
  return (
    <a href={data.url_origin} target="_blank" rel="noopener noreferrer">
      <article className="flex flex-col w-[22rem] h-96 sm:mr-5 mb-5 border-2 border-black/50 rounded-b-2xl shadow">
        <div aria-description="Article source" className="flex justify-center items-center h-[10%] w-full border-b border-black/50">
          <h1 className={`${poppinsFont.className} uppercase`}>{data.source}</h1>
        </div>
        <div aria-description="Article headline" className="flex items-center h-[22%] w-full px-2 line-clamp-3">
          <span className={`${merriweatherFontBold.className}`}><b>{data.title}</b></span>
        </div>
        <div className="flex relative h-[40%] w-[calc(100%-1rem)] self-center">
          <Image
            loader={() => thumbSrc}
            src={thumbSrc}
            fill
            alt="Article image"
            className="object-cover"
          />
        </div>
        <div aria-description="Article description" className="flex items-center h-[21%] w-full px-2">
          <span className={`${poppinsFont.className} text-xs text-gray-500 line-clamp-4`}>{data.description}</span>
        </div>
        {data.author && 
          <div aria-description="Article author" className="flex items-start h-[7%] w-full px-2">
            <span className={`${poppinsFont.className} text-[0.5rem] text-gray-500`}>By {data.author}</span>
          </div>
        }
      </article>
    </a>
  );
}

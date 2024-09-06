"use client"
import { useState, InputHTMLAttributes } from "react";

import { Poppins } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
};

export default function Input({ label, labelClassName, ...rest }: InputBaseProps) {
  return (
    <>
      <label
        className={`
          ${poppinsFont.className}
          flex
          flex-col
          justify-evenly
          h-16
          ${labelClassName}
      `}>
        {label || label}
        <input {...rest}/>
      </label>
    </>
  )
}
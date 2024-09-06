"use client"
import { useState, InputHTMLAttributes } from "react";

import { Poppins } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
};

export default function Input({ label, labelClassName, ...htmlAtt }: InputBaseProps) {
  return (
    <>
      {label && <label htmlFor={htmlAtt.id} className={`${poppinsFont.className} ${labelClassName}`}>{label}</label>}
      <input {...htmlAtt}/>
    </>
  )
}
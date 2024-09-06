"use client"
import { useState, SelectHTMLAttributes } from "react";

import { Poppins } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  labelClassName?: string;
  options: Array<{ value: string, label: string }>;
}

export default function Select({ label, labelClassName, options, ...rest }: SelectBaseProps) {
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
        <select {...rest}>
          {options.map(option => <option value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </>
  )
}
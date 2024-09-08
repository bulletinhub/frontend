import { SelectHTMLAttributes } from "react";

import { Poppins } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  labelClassName?: string;
  options: Array<{ value: string, label: string }>;
}

export default function Select({ label, labelClassName, options, ...htmlAtt }: SelectBaseProps) {
  return (
    <>
      {label && <label htmlFor={htmlAtt.id} className={`${poppinsFont.className} ${labelClassName}`}>{label}</label>}
      <select {...htmlAtt}>
        {options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
      </select>
    </>
  )
}
"use client"
import { useRef, useState, FormEvent } from "react";

import { Poppins } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFontBold = Poppins({ subsets: ["latin"], weight: '700' });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPen, faTrash, faFloppyDisk, faShare } from '@fortawesome/free-solid-svg-icons';

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function FilterForm() {
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
    <>
      <div
        className="
          flex
          flex-col
          justify-between
          h-40
          w-full
      ">
        <div className="flex items-center h-12">
          <h1 className={`${poppinsFontBold.className} text-lg`}>Saved Filters</h1>
        </div>
        <div
          className="
            flex
            flex-wrap
            items-start
            h-96
            w-full
            rounded-md
            overflow-y-auto

            border
            border-black/50
        ">
          <div 
            className="
              flex
              items-center
              justify-between
              h-9
              w-full
              rounded-md
              mb-1

              hover:cursor-pointer
              shadow
              border
              border-black
          ">
            <div className={`flex items-center w-11/12 text-ellipsis whitespace-nowrap overflow-hidden ${poppinsFont.className}`}>
              <FontAwesomeIcon icon={faShare} className="pl-2 pr-1" />
              <span>My Saved Filter 1</span>
            </div>
          </div>
        </div>
      </div>
      <form className="flex flex-col flex-grow w-full" method="post" onSubmit={handleSubmit}>
        <div className="flex items-center h-12">
          <h1 className={`${poppinsFontBold.className} text-lg`}>Filter News:</h1>
        </div>
        <Input labelClassName="w-full h-8 flex items-center" className="rounded-md border py-1 px-2 h-9" id="keyword" label="Search by keyword:" type="search" name="keyword" defaultValue="" placeholder="Keyword..." />
        <Input labelClassName="w-full h-8 flex items-center" className="rounded-md border py-1 px-2 h-9" id="date" label="Date:" type="date" name="date" />
        <Select
          id="category"
          label="Category:" 
          name="category"
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 bg-white h-9"
          options={[
            { value: "empty", label: 'All' },
            { value: "valor1", label: 'Valor 1' },
            { value: "valor2", label: 'Valor 2' },
            { value: "valor3", label: 'Valor 3' },
          ]}
        />
        <Select
          id="source"
          label="Source:" 
          name="source"
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 bg-white h-9"
          options={[
            { value: "empty", label: 'All' },
            { value: "valor1", label: 'Valor 1' },
            { value: "valor2", label: 'Valor 2' },
            { value: "valor3", label: 'Valor 3' },
          ]}
        />
        <Select
          id="author"
          label="Author:" 
          name="author"
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 bg-white h-9"
          options={[
            { value: "empty", label: 'All' },
            { value: "valor1", label: 'Valor 1' },
            { value: "valor2", label: 'Valor 2' },
            { value: "valor3", label: 'Valor 3' },
          ]}
        />
        <div className="flex justify-between items-center h-16 w-full">
          <button type="reset" className={`${poppinsFontSemibold.className}`}>Clear filter</button>
          <div className="actions">
            <button type="submit" className={`${poppinsFontSemibold.className} btn-primary px-4 text-lg`}>Filter</button>
          </div>
        </div>
      </form>
    </>
  )
}
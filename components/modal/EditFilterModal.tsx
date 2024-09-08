"use client"
import { useRef, useState, FormEvent, forwardRef, useImperativeHandle } from "react";

import { Poppins } from "next/font/google";
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import Input from "@/components/input/Input";
import { ModalComponent, ModalComponentRefProps } from "@/components/modal/Modal";

export type EditFilterModalRefProps = {
  openModal: () => void
  closeModal: () => void
}

export const EditFilterModal = forwardRef<EditFilterModalRefProps>(
  function EditFilterModal({}, ref) {
    const modalRef = useRef<ModalComponentRefProps>(null)
    
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      const form = e.currentTarget;
      const formData = new FormData(form);
  
      // fetch('/some-api', { method: form.method, body: formData });
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
      closeModal()
    }
  
    const openModal = () => modalRef.current?.openModal()
    const closeModal = () => modalRef.current?.closeModal()

    useImperativeHandle(ref, () => {
      return {
        openModal,
        closeModal,
      };
    }, []);
  
    return (
      <ModalComponent ref={modalRef}>
        <form className="flex flex-col flex-grow w-full" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col flex-grow w-full overflow-y-auto">
            <div className="flex justify-center items-center h-12">
              <h1 className={`${poppinsFontSemibold.className} text-lg`}>Edit your filters</h1>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col h-32 mb-1 border-b border-black/25 only:border-b-0 last:border-b-0">
                <div className="flex items-center h-8">
                  <FontAwesomeIcon icon={faBookmark} className="pr-1.5" />
                  <p className={`${poppinsFontSemibold.className} text-base`}>My Saved Filter 1</p>
                </div>
                <Input
                  type="text"
                  label="New filter name:"
                  id="filterName"
                  name="filterName"
                  labelClassName="w-full h-8 flex items-center"
                  className="rounded-md border py-1 px-2 h-9"
                  // onChange={handleFormChange}
                  // value={currentForm.fullName}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-8">
            <button aria-label="Cancel" className="btn-outline" onClick={() => closeModal()}>
              <span className={`${poppinsFontSemibold.className} text-lg`}>Cancel</span>
            </button>
            <button aria-label="Save" className="btn-primary" disabled={false}>
              <span className={`${poppinsFontSemibold.className} text-lg`}>Save</span>
            </button>
          </div>
        </form>
      </ModalComponent>
    );
  }
)
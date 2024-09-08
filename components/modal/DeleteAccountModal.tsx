"use client"
import { useRef, FormEvent, forwardRef, useImperativeHandle } from "react";

import { Poppins } from "next/font/google";
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

import { ModalComponent, ModalComponentRefProps } from "@/components/modal/Modal";

export type DeleteAccountModalRefProps = {
  openModal: () => void
  closeModal: () => void
}

export const DeleteAccountModal = forwardRef<DeleteAccountModalRefProps>(
  function DeleteAccountModal({}, ref) {
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
          <div className="flex justify-center items-center h-12">
            <h1 className={`${poppinsFontSemibold.className} text-lg`}>Confirmation</h1>
          </div>
          <div className="flex flex-col w-full">
            <p className={`${poppinsFont.className} text-base`}>
              Are you sure you want to delete your account? <span className={poppinsFontSemibold.className}>This action is irreversible.</span>
            </p>
          </div>
          <div className="flex justify-between w-full mt-8">
            <button aria-label="Cancel" className="btn-outline" onClick={() => closeModal()}>
              <span className={`${poppinsFontSemibold.className} text-lg`}>Cancel</span>
            </button>
            <button aria-label="Save" className="btn-red">
              <span className={`${poppinsFontSemibold.className} text-lg`}>Delete My Account</span>
            </button>
          </div>
        </form>
      </ModalComponent>
    );
  }
)
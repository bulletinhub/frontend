"use client"
import { useRef, FormEvent, forwardRef, useImperativeHandle } from "react";

import { useRouter } from 'next/navigation'
import { Poppins } from "next/font/google";
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

import { ModalComponent, ModalComponentRefProps } from "@/components/modal/Modal";
import { eraseCookie, getCookie } from '@/utils/cookies'

export type DeleteAccountModalRefProps = {
  openModal: () => void
  closeModal: () => void
}

export const DeleteAccountModal = forwardRef<DeleteAccountModalRefProps>(
  function DeleteAccountModal({}, ref) {
    const router = useRouter()
    const modalRef = useRef<ModalComponentRefProps>(null)
    
    async function handleDelete(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      const accessToken = getCookie('access_token')
      const userId = getCookie('user_id')

      let { status, message } = await fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/user/${userId}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        }
      })
        .then((res) => res.json())
        .catch((error) => console.error(error))
      
      if (status === 'success') {
        eraseCookie('access_token')
        eraseCookie('user_id')
        router.push('/')
      } else {
        console.error(message)
      }
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
        <form className="flex flex-col flex-grow w-full" method="post" onSubmit={handleDelete}>
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
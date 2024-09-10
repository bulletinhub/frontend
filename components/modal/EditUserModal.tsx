"use client"
import { useRef, useState, FormEvent, forwardRef, useImperativeHandle, ChangeEvent, useEffect } from "react";
import { isEqual } from 'radash'

import { Poppins } from "next/font/google";
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });

import Input from "@/components/input/Input";
import { ModalComponent, ModalComponentRefProps } from "@/components/modal/Modal";
import { getCookie } from '@/utils/cookies'

export type EditUserModalRefProps = {
  openModal: () => void
  closeModal: () => void
}

interface EditUserModalProps {
  userData: {
    name: string;
    email: string;
  } | null;
}

type EmptyFormTypes = {
  fullName: string;
  email: string;
  password: string;
  oldPassword: string;
}

const emptyForm: EmptyFormTypes = {
  fullName: '',
  email: '',
  password: '',
  oldPassword: ''
}

export const EditUserModal = forwardRef<EditUserModalRefProps, EditUserModalProps>(
  function EditUserModal({ userData }, ref) {
    const modalRef = useRef<ModalComponentRefProps>(null)
    const [currentForm, setCurrentForm] = useState<EmptyFormTypes>(emptyForm)
    const [isFormEmpty, setIsFormEmpty] = useState(true)
    
    async function handleEditUser(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      const form = e.currentTarget
      const formData = new FormData(form)
      const nameInput = formData.get('fullName')
      formData.append('name', nameInput as string)
      formData.append('current_name', userData.name)
      formData.append('current_email', userData.email)

      const accessToken = getCookie('access_token')
      const userId = getCookie('user_id')
      
      let { status, message } = await fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/user/${userId}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
        body: formData
      })
        .then((res) => res.json())
        .catch((error) => console.error(error))
      
      if (status === 'success') {
        closeModal()
        window.location.reload()
      } else {
        console.error(message)
      }
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target
      setCurrentForm((prevFilter) => ({
        ...prevFilter,
        [name]: value
      }))
    }
  
    const openModal = () => modalRef.current?.openModal()
    const closeModal = () => modalRef.current?.closeModal()

    useImperativeHandle(ref, () => {
      return {
        openModal,
        closeModal,
      };
    }, []);

    useEffect(() => {
      setIsFormEmpty(isEqual(currentForm, emptyForm))
  
      // let filterAlreadySaved = savedFilters.some(({ filter }) => isEqual(currentFilter, filter))
      // setIsFilterEqualFilterSaved(filterAlreadySaved)
    }, [currentForm])
  
    return (
      <ModalComponent ref={modalRef}>
        <form className="flex flex-col flex-grow w-full" method="post" onSubmit={handleEditUser}>
          <div className="flex justify-center items-center h-12">
            <h1 className={`${poppinsFontSemibold.className} text-lg`}>Edit your profile</h1>
          </div>
          <div className="flex flex-col w-full">
            <Input
              type="text"
              label="Full name:"
              id="fullName"
              name="fullName"
              labelClassName="w-full h-8 flex items-center"
              className="rounded-md border py-1 px-2 h-9"
              placeholder={userData?.name}
              onChange={handleFormChange}
              value={currentForm.fullName}
              minLength={3}
            />
            <Input
              type="email"
              label="Email:"
              id="email"
              name="email"
              labelClassName="w-full h-8 flex items-center"
              className="rounded-md border py-1 px-2 h-9"
              placeholder={userData?.email}
              onChange={handleFormChange}
              value={currentForm.email}
            />
            <Input
              type="password"
              label="Old Password:"
              id="oldPassword"
              name="oldPassword"
              labelClassName="w-full h-8 flex items-center"
              className="rounded-md border py-1 px-2 h-9"
              onChange={handleFormChange}
              value={currentForm.oldPassword}
              required
            />
            <Input
              type="password"
              label="New Password:"
              id="password"
              name="password"
              labelClassName="w-full h-8 flex items-center"
              className="rounded-md border py-1 px-2 h-9"
              onChange={handleFormChange}
              value={currentForm.password}
              minLength={6}
            />
          </div>
          <div className="flex justify-between w-full mt-8">
            <button aria-label="Cancel" className="btn-outline" onClick={() => closeModal()}>
              <span className={`${poppinsFontSemibold.className} text-lg`}>Cancel</span>
            </button>
            <button aria-label="Save" className="btn-primary" disabled={isFormEmpty}>
              <span className={`${poppinsFontSemibold.className} text-lg`}>Save</span>
            </button>
          </div>
        </form>
      </ModalComponent>
    );
  }
)
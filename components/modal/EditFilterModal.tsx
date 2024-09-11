"use client"
import { useRef, useState, FormEvent, forwardRef, useImperativeHandle, useEffect, ChangeEvent } from "react";

import { Poppins } from "next/font/google";
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import Input from "@/components/input/Input";
import { ModalComponent, ModalComponentRefProps } from "@/components/modal/Modal";
import { getCookie } from '@/utils/cookies'

export type EditFilterModalRefProps = {
  openModal: () => void
  closeModal: () => void
}

type NamedBaseFilter = {
  name: string;
  id: number;
} & BaseFilter;

interface EditFilterModalProps {
  filterData: Array<NamedBaseFilter>
}

type BaseFilter = {
  id: number | string;
  name: string;
  keyword: string;
  date: string;
  category: string;
  source: string;
  author: string;
  newName: string;
  status: string;
}

export const EditFilterModal = forwardRef<EditFilterModalRefProps, EditFilterModalProps>(
  function EditFilterModal({ filterData }, ref) {
    const modalRef = useRef<ModalComponentRefProps>(null)
    const [currentForm, setCurrentForm] = useState<Array<BaseFilter>>([])
    
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const accessToken = getCookie('access_token')
  
      let { status, message } = await fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/filter/batch-update`, {
          method: 'post',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify(currentForm)
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

    function handleFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) {
      const { name, value } = event.target;
      const updatedForm = [...currentForm];

      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };

      setCurrentForm(updatedForm);
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
      if (filterData.length > 0) {
        setCurrentForm(filterData)
      }
    }, [filterData])
  
    return (
      <ModalComponent ref={modalRef}>
        <form className="flex flex-col flex-grow w-full" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col flex-grow w-full overflow-y-auto">
            <div className="flex justify-center items-center h-12">
              <h1 className={`${poppinsFontSemibold.className} text-lg`}>Edit your filters</h1>
            </div>
            <div className="flex flex-col w-full">
              {currentForm.map((filter, i) =>
                <div key={filter.id} className="flex flex-col h-32 mb-1 border-b border-black/25 only:border-b-0 last:border-b-0">
                  <div className="flex items-center h-8">
                    <FontAwesomeIcon icon={faBookmark} className="pr-1.5" />
                    <p className={`${poppinsFontSemibold.className} text-base`}>{filter.name}</p>
                  </div>
                  <Input
                    type="text"
                    label="New filter name:"
                    id="filterName"
                    name="filterName"
                    labelClassName="w-full h-8 flex items-center"
                    className="rounded-md border py-1 px-2 h-9"
                    onChange={(e) => handleFormChange(e, i)}
                    value={filter.newName}
                  />
                  <Input
                    type="checkbox"
                    label="Delete?"
                    id="delete"
                    name="delete"
                    labelClassName="w-full h-8 flex items-center"
                    className="rounded-md border py-1 px-2 h-9 self-start"
                    onChange={(e) => handleFormChange(e, i)}
                    value={filter.status}
                  />
                </div>
              )}
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
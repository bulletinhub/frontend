"use client"
import { useRef, useState, useEffect } from "react";

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { Merriweather, Poppins } from "next/font/google";
const merriweatherFontBold = Merriweather({ subsets: ["latin"], weight: '700' });
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
const poppinsFontItalic = Poppins({ subsets: ["latin"], weight: '400', style: "italic" });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import { EditUserModal, EditUserModalRefProps } from "@/components/modal/EditUserModal";
import { EditFilterModal, EditFilterModalRefProps } from "@/components/modal/EditFilterModal";
import { DeleteAccountModal, DeleteAccountModalRefProps } from "@/components/modal/DeleteAccountModal";
import { eraseCookie, getCookie } from '@/utils/cookies'

type ModalTypes = 'editUser' | 'editFilter' | 'delAccount' | null

export default function MyAccount() {
  const router = useRouter()
  const editUserModalRef = useRef<EditUserModalRefProps>(null)
  const editFilterModalRef = useRef<EditFilterModalRefProps>(null)
  const deleteAccountModalRef = useRef<DeleteAccountModalRefProps>(null)

  const [userData, setUserData] = useState(null)
  const [isUserLoading, setUserLoading] = useState(true)
  const [filterData, setFilterData] = useState([])
  const [isFilterLoading, setFilterLoading] = useState(true)

  function handleSignOut() {
    eraseCookie('access_token')
    eraseCookie('user_id')
    router.push('/')
  }

  function openModal(modalType: ModalTypes) {
    switch (modalType) {
      case "editUser":
        editUserModalRef.current?.openModal()
        break
      case "editFilter":
        editFilterModalRef.current?.openModal()
        break
      case "delAccount":
        deleteAccountModalRef.current?.openModal()
        break
      default:
        break
    }
  }

  function loadUserData(accessToken: string | null, userId: string | null) {
    fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/user/${userId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setUserData(data)
        setUserLoading(false)
      })
      .catch((error) => console.error(error))
  }

  function loadUserFilters(accessToken: string | null, id_users: string | null) {
    fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/filter/user/${id_users}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setFilterData(data)
        setFilterLoading(false)
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    const accessToken = getCookie('access_token')
    const userId = getCookie('user_id')
    const signedIn = !!userId

    if (signedIn) {
      loadUserData(accessToken, userId)
      loadUserFilters(accessToken, userId)
    }
  }, [])

  return (
    <main className="flex justify-center z-0 absolute w-full h-[calc(100vh-4rem)] overflow-y-auto">
      <section aria-description="Manage your account" className="flex flex-wrap w-full pt-3 justify-center md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
        <div className="flex flex-col items-center justify-start w-full md:w-2/3">
          <h1 className={`${merriweatherFontBold.className} text-xl md:text-2xl my-8`}>My Account</h1>
          <div className="flex flex-col w-full rounded-t-md border border-black/50">
            <div className="flex items-center justify-between w-full border-b border-black/50 py-4">
              <h1 className={`${poppinsFontSemibold.className} pl-4 text-lg md:text-xl`}>Personal Information</h1>
              <button
                type="button"
                aria-label="Edit your personal information"
                className="btn-outline mr-4"
                onClick={() => openModal('editUser')}
              >
                <span className={`${poppinsFontSemibold.className} text-lg`}>Edit</span>
              </button>
            </div>
            <div className="flex flex-col w-1/2 text-sm md:text-base">
              <h1 className={`${poppinsFontItalic.className} pl-4 pt-4`}>NAME</h1>
              <p className={`${poppinsFont.className} pl-4`}>{!isUserLoading ? userData?.name : 'Loading name...'}</p>
              <h1 className={`${poppinsFontItalic.className} pl-4 pt-4`}>EMAIL</h1>
              <p className={`${poppinsFont.className} pl-4`}>{!isUserLoading ? userData?.email : 'Loading email...'}</p>
              <h1 className={`${poppinsFontItalic.className} pl-4 pt-4`}>PASSWORD</h1>
              <p className={`${poppinsFont.className} pl-4 pb-4`}>***********</p>
              <button 
                type="button"
                aria-label="Delete your account"
                className={`${poppinsFontSemibold.className} self-start underline p-4 text-red-600 text-sm`}
                onClick={() => openModal('delAccount')}
              >
                Delete my account
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full rounded-b-md border border-t-0 border-black/50">
            <div className="flex items-center w-full justify-between border-b border-black/50 py-4">
              <h1 className={`${poppinsFontSemibold.className} pl-4 text-lg md:text-xl`}>My Filters</h1>
              <button 
                type="button"
                aria-label="Edit your filters"
                className={`btn-outline mr-4 ${!filterData.length && 'hidden'}`}
                onClick={() => openModal("editFilter")}
              >
                <span className={`${poppinsFontSemibold.className} text-lg`}>Edit</span>
              </button>
            </div>
            
            {!isFilterLoading ?
              (filterData.length > 0) ?
                filterData.map((filter, i) =>
                  <div key={filter.id} className="flex items-center h-12 w-full text-sm md:text-base">
                    <FontAwesomeIcon icon={faBookmark} className="pl-4 pr-1.5" />
                    <span className={`${poppinsFont.className} text-base`}>{filter.name}</span>
                  </div>
                )
              :
                <div className="flex flex-col w-full text-sm md:text-base">
                  <span className={`${poppinsFont.className} pl-4 py-4`}>There are no custom filters linked to your account.</span>
                </div>
            :
              <div className="flex flex-col w-full text-sm md:text-base">
                <span className={`${poppinsFont.className} pl-4 py-4`}>Loading custom filters...</span>
              </div>
            }
          </div>
          <button aria-label="Sign Out" className="btn-red my-8" onClick={() => handleSignOut()}>
            <span className={`${poppinsFontSemibold.className} text-lg`}>Sign Out</span>
          </button>
          <Link href="/" className={`${poppinsFontSemibold.className} underline mb-8`}>Go back to homepage</Link>
        </div>
      </section>
      <EditUserModal userData={userData} ref={editUserModalRef} />
      <EditFilterModal filterData={filterData} ref={editFilterModalRef} />
      <DeleteAccountModal ref={deleteAccountModalRef} />
    </main>
  );
}
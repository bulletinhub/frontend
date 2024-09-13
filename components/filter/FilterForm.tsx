"use client"
import { useRef, useEffect, FormEvent, useState, ChangeEvent } from "react";
import Link from "next/link";
import { isEqual } from 'radash'

import { Poppins } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
const poppinsFontSemibold = Poppins({ subsets: ["latin"], weight: '600' });
const poppinsFontBold = Poppins({ subsets: ["latin"], weight: '700' });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import { getCookie } from '@/utils/cookies'

import { useAppSelector, useAppDispatch, useAppStore } from '@/app/hooks'
import { setSavedFilter, setAppliedFilter, updateCurrentFilter, resetCurrentFilter } from '@/components/filter/filtersSlice'
import { closeLeftDrawer } from "@/components/drawer/drawersSlice";

export default function FilterForm({ categories, sources, authors }) {
  const dispatch = useAppDispatch()
  const emptyFilter = useAppSelector((state) => state.filters.emptyFilter)
  const savedFilters = useAppSelector((state) => state.filters.savedFilters)
  // const appliedFilter = useAppSelector((state) => state.filters.appliedFilter)

  const [currentFilter, setCurrentFilter] = useState(emptyFilter)
  const [isFilterEmpty, setIsFilterEmpty] = useState(true)
  const [isFilterEqualFilterSaved, setIsFilterEqualFilterSaved] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    dispatch(closeLeftDrawer())
    settingUpAppliedFilter(formData)
  }

  function settingUpAppliedFilter(formData: FormData) {
    const { keyword, date, source, author, category } = Object.fromEntries(formData.entries());
    
    const appliedFilter = {
      keyword: keyword as string,
      date: date as string,
      source: source as string,
      author: author as string,
      category: category as string
    }

    dispatch(setAppliedFilter(appliedFilter))
  }

  async function handleSaveFilter() {
    await saveCurrentFilterToDatabase()
    saveCurrentFilterToRedux()
  }

  function saveCurrentFilterToRedux() {
    const newFilter = {
      filterName: 'My Saved Filter',
      filter: currentFilter
    }

    setIsFilterEqualFilterSaved(true)
    dispatch(setSavedFilter(newFilter))
  }

  async function saveCurrentFilterToDatabase() {
    const userId = getCookie('user_id')
    const accessToken = getCookie('access_token')
    const newFilter = JSON.stringify({
      id_users: Number(userId),
      name: 'My Saved Filter',
      ...currentFilter
    })

    let { status, message } = await fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/filter`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'content-type': 'application/json',
        },
        body: newFilter
      })
      .then((res) => res.json())
      .catch((error) => console.error(error))
    
    if (status === 'error') {
      console.error(message)
    }
  }

  async function getFiltersByUserId(id_users: number) {
    const accessToken = getCookie('access_token')

    let { data, message } = await fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/filter/user/${id_users}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })
    .then((res) => res.json())
    .catch((error) => console.error(error))
  
    if (data) {
      for (let filter of data) {
        const filterName = filter.name
        delete filter.name
        delete filter.id_users
        dispatch(setSavedFilter({ filterId: filter.id, filterName, filter }))
      }
    } else {
      console.error(message)
    }
  }

  function handleFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target
    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }))
  }

  useEffect(() => {
    setIsFilterEmpty(isEqual(currentFilter, emptyFilter))

    let filterAlreadySaved = savedFilters.some(({ filter }) => isEqual(currentFilter, filter))
    setIsFilterEqualFilterSaved(filterAlreadySaved)
  }, [currentFilter])

  useEffect(() => {
    const userId = getCookie('user_id')
    const signedIn = !!userId
    setIsUserLoggedIn(signedIn)

    if (signedIn) {
      getFiltersByUserId(Number(userId))
    }
  }, [])

  return (
    <>
      <div className="flex flex-col justify-between h-40 w-full">
        <div className="flex items-center h-12">
          <h1 className={`${poppinsFontBold.className} text-lg`}>Saved Filters</h1>
        </div>
        <div className="flex flex-wrap items-start h-96 w-full rounded-md overflow-y-auto border border-black/50">
          {isUserLoggedIn ?
            savedFilters.map(({ filterName, filter, filterId }) => 
              <div 
                key={filterId}
                className="flex items-center justify-between h-9 w-full rounded-md mb-1 hover:cursor-pointer shadow border border-black"
                onClick={() => setCurrentFilter(filter)}
              >
                <div className={`flex items-center w-11/12 text-ellipsis whitespace-nowrap overflow-hidden ${poppinsFont.className}`}>
                  <FontAwesomeIcon icon={faShare} className="pl-2 pr-1" />
                  <span>{filterName}</span>
                </div>
              </div>
            )
          :
            <div className="flex items-center justify-center h-full w-full">
              <span className={`${poppinsFont.className} text-xs`}>
                <Link href="/signin" className="underline">Sign in</Link> to save custom filters for autofill!
              </span>
            </div>
          }
        </div>
      </div>
      <form className="flex flex-col flex-grow w-full" method="post" onSubmit={handleSubmit}>
        <div className="flex items-center h-12">
          <h1 className={`${poppinsFontBold.className} text-lg`}>Filter News:</h1>
        </div>
        <Input 
          type="search"
          id="keyword"
          name="keyword"
          label="Search by keyword:"
          placeholder="Keyword..."
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 h-9"
          onChange={handleFormChange}
          value={currentFilter.keyword}
        />
        <Input 
          type="date"
          id="date"
          name="date"
          label="Date:"
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 h-9"
          max={new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }).slice(0, 10)} // max date today
          onChange={handleFormChange}
          value={currentFilter.date}
        />
        <Select
          id="category"
          label="Category:" 
          name="category"
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 bg-white h-9"
          onChange={handleFormChange}
          value={currentFilter.category}
          options={[
            { value: "all", label: 'All' },
            ...categories
          ]}
        />
        <Select
          id="source"
          label="Source:" 
          name="source"
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 bg-white h-9"
          onChange={handleFormChange}
          value={currentFilter.source}
          options={[
            { value: "all", label: 'All' },
            ...sources
          ]}
        />
        <Select
          id="author"
          label="Author:" 
          name="author"
          labelClassName="w-full h-8 flex items-center"
          className="rounded-md border py-1 px-2 bg-white h-9"
          onChange={handleFormChange}
          value={currentFilter.author}
          options={[
            { value: "all", label: 'All' },
            ...authors
          ]}
        />
        <div className="flex justify-center items-center h-16 w-full">
          <button 
            type="button"
            className={`flex justify-center items-center w-full ${(isFilterEmpty || isFilterEqualFilterSaved || !isUserLoggedIn) && 'hidden'}`}
            onClick={() => handleSaveFilter()}
          >
            <FontAwesomeIcon icon={faBookmark} className="pr-1.5" />
            <span className={`${poppinsFontSemibold.className}`}>Save this filter</span>
          </button>
        </div>
        <div className="flex justify-between items-center h-16 w-full">
          <button 
            type="reset"
            className={`${poppinsFontSemibold.className} btn-outline px-4 text-lg`}
            onClick={() => setCurrentFilter(emptyFilter)}
          >
            Clear filter
          </button>
          <div className="actions">
            <button
              type="submit"
              className={`${poppinsFontSemibold.className} btn-primary px-4 text-lg`}
              disabled={isFilterEmpty}
            >
              Filter
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
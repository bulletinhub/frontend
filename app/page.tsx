"use client"
import { useEffect, useRef, useState } from "react";

import { Drawer } from '@/components/drawer/Drawer';
import FilterForm from "@/components/filter/FilterForm";
import Article from "@/components/article/Article";
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setAppliedFilter } from "@/components/filter/filtersSlice";

import { Merriweather, Poppins } from "next/font/google";
const merriweatherFontBold = Merriweather({ subsets: ["latin"], weight: '700' });
const poppinsFont = Poppins({ subsets: ["latin"], weight: '400' });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { isEqual, isEmpty } from "radash";

export default function Home() {
  const appliedFilter = useAppSelector((state) => state.filters.appliedFilter)
  const emptyFilter = useAppSelector((state) => state.filters.emptyFilter)
  const dispatch = useAppDispatch()
  const [haveFilters, setHaveFilters] = useState(false)
  const [exhibitionFilters, setExhibitionFilters] = useState(Array<{}>)

  function formatExhibitionFilters() {
    let newExhibitionFilters = Object.entries(appliedFilter)
      .filter(([key, value]) => value !== emptyFilter[key as keyof BaseFilter])
      .map(([key, value]) => ({ [key]: value }))
    setExhibitionFilters(newExhibitionFilters)
  }

  function removeFilter(index: number) {
    updateAppliedFilter(index)
    const newExhibitionFilters = exhibitionFilters.filter((_, i) => i !== index);
    setExhibitionFilters(newExhibitionFilters)
    isEmpty(exhibitionFilters) && setHaveFilters(false)
  }

  function updateAppliedFilter(exhibFiltIndex: number) {
    let removedFilter = exhibitionFilters[exhibFiltIndex]
    let keyRemoved = Object.keys(removedFilter)[0]
    let updatedAppliedFilter = {
      ...appliedFilter,
      [keyRemoved]: emptyFilter[keyRemoved as keyof BaseFilter]
    }
    dispatch(setAppliedFilter(updatedAppliedFilter))
  }

  useEffect(() => {
    setHaveFilters(!isEqual(appliedFilter, emptyFilter))
    formatExhibitionFilters()
  }, [appliedFilter])

  return (
    <>
      <Drawer position="left">
        <FilterForm />
      </Drawer>
      <main className="flex justify-center z-0 absolute w-full h-[calc(100vh-4rem)] overflow-y-auto">
        <section aria-description="News feed" className="flex flex-wrap w-full pt-3 justify-center md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
          {haveFilters &&
            <div className="flex flex-wrap justify-center items-center w-full min-h-40 mb-3">
              <div className="flex items-center justify-center w-full">
                <h1 className={`${merriweatherFontBold.className} text-xl md:text-2xl`}>Filtered News:</h1>
              </div>
              {exhibitionFilters.map((filter, i) =>
                <div key={i} className="flex items-center justify-center p-1 w-auto rounded-full border border-black m-1">
                  <span className={`${poppinsFont.className} pr-1 pl-2`}>{Object.values(filter)[0] as string}</span>
                  <button type="button" title="Remove filter" onClick={() => removeFilter(i)}>
                    <FontAwesomeIcon icon={faCircleXmark} className="pr-2" />
                  </button>
                </div>
              )}
            </div>
          }
          <Article/>
          <Article/>
          <Article/>
          <Article/>
          <Article/>
          <Article/>
          <Article/>
          <Article/>
        </section>
      </main>
    </>
  );
}

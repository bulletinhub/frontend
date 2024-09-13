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

type Article = {
  id: number;
  title: string;
  description: string;
  url_origin: string;
  author: string | null;
  url_thumbnail: string | null;
  language: string;
  source: string;
  published: string;
}

export default function Home() {
  const appliedFilter = useAppSelector((state) => state.filters.appliedFilter)
  const emptyFilter = useAppSelector((state) => state.filters.emptyFilter)
  const dispatch = useAppDispatch()
  const [haveFilters, setHaveFilters] = useState(false)
  const [exhibitionFilters, setExhibitionFilters] = useState(Array<{}>)
  const [articles, setArticles] = useState<Array<Article>>([])
  const [categories, setCategories] = useState<Array<string>>([])
  const [sources, setSources] = useState<Array<string>>([])
  const [authors, setAuthors] = useState<Array<string>>([])
  const [filteredArticles, setFilteredArticles] = useState([])

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

  function loadArticles() {
    fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/article`, {
      method: 'get',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setArticles(data)
      })
      .catch((error) => console.error(error))
  }

  function configureCategories () {
    let newCategories = [...categories];
    // set to track categories
    const categorySet = new Set(newCategories);

    for (let article of articles) {
      article.categories.forEach(categoryObj => {
        if (!categorySet.has(categoryObj.name)) {
          categorySet.add(categoryObj.name);
          newCategories.push({ value: categoryObj.name, label: categoryObj.name });
        }
      });
    }
    setCategories(newCategories);
  }

  function configureSources () {
    let newSources = [...sources];
    // set to track sources
    const sourceSet = new Set(newSources);

    for (let article of articles) {
      if (!sourceSet.has(article.source) && article.source) {
        sourceSet.add(article.source);
        newSources.push({ value: article.source, label: article.source });
      }
    }
    setSources(newSources);
  }

  function configureAuthors () {
    let newAuthors = [...authors];
    // set to track authors
    const authorSet = new Set(newAuthors);

    for (let article of articles) {
      if (!authorSet.has(article.author) && article.author) {
        authorSet.add(article.author);
        newAuthors.push({ value: article.author, label: article.author });
      }
    }
    setAuthors(newAuthors);
  }

  async function addOlderArticles() {
    await fetch(`${process.env.NEXT_PUBLIC_BULLETINHUB_API}/api/article/by-date/${appliedFilter.date}`, {
      method: 'get',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((res) => res.json())
      .then(({ data }) => {
        const newArticles = [ ...articles, ...data ]
        dispatch(setArticles(newArticles))
      })
      .catch((error) => console.error(error))
  }

  function filterArticles() {
    // transform filter data to array of words
    let filterValues = Object.values(appliedFilter);
    filterValues = filterValues
      .filter(value => value && value != 'all')
      .map(str => str.toLowerCase().split(/[\s\-\.\!\:\,\/\&\?\+\=\@]+/))
      .flat()

    // regex pattern to match URLs
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

    const result = articles.filter(article => {
      const articleCategoriesValues = article.categories.map(categ => categ.name)

      // transform article data to array of words
      const articleValues = Object.values({ ...article, ...articleCategoriesValues })
      const cleanArticle = articleValues.filter(value => typeof value === 'string')
      const articleWords = cleanArticle
        .map((str) => urlPattern.test(str) ? [str] : str.toLowerCase().split(/[\s\-\.\!\:\,\/\&\?\+\=\@]+/))
        .flat()

      // check if every filter word are inside the article words
      return filterValues.every(val => articleWords.includes(val))
    });

    setFilteredArticles(result);
  }

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }).slice(0, 10)
    if (appliedFilter.date && appliedFilter.date != today) {
      addOlderArticles()
    }
    setHaveFilters(!isEqual(appliedFilter, emptyFilter))
    formatExhibitionFilters()
  }, [appliedFilter])

  useEffect(() => {
    loadArticles()
  }, [])

  useEffect(() => {
    configureCategories()
    configureSources()
    configureAuthors()
  }, [articles])

  useEffect(() => {
    if (haveFilters) {
      filterArticles()
    }
  }, [haveFilters, appliedFilter])

  return (
    <>
      <Drawer position="left">
        <FilterForm categories={categories} sources={sources} authors={authors} />
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
          {haveFilters && filteredArticles.map((article, i) =>
            <Article key={i} data={article} />
          )}
          {!haveFilters && articles.map((article, i) => 
            <Article key={i} data={article} />
          )}
          {(haveFilters && !filteredArticles.length) &&
            <span className={`${poppinsFont.className} py-64`}>No article(s) found with the applied filter(s). Try a different filter!</span>
          }
        </section>
      </main>
    </>
  );
}

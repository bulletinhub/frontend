declare type BaseFilter = {
  keyword: string;
  date: string;
  source: string;
  author: string;
  category: string;
}

declare type SavedFilter = {
  filterId: number | string;
  filterName: string;
  filter: BaseFilter;
}
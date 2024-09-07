import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type BaseFilter = {
  keyword: string;
  date: string;
  source: string;
  author: string;
  category: string;
}

type SavedFilter = {
  filterName: string;
  filter: BaseFilter;
}

export interface FiltersState {
  currentFilter: BaseFilter;
  appliedFilter: BaseFilter;
  savedFilters: Array<SavedFilter>;
}

const emptyFilter: BaseFilter = {
  keyword: "",
  date: "",
  source: "all",
  author: "all",
  category: "all"
}

const initialState: FiltersState = {
  currentFilter: emptyFilter,
  appliedFilter: emptyFilter,
  savedFilters: []
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAppliedFilter: (state, action: PayloadAction<BaseFilter>) => {
      state.appliedFilter = action.payload
    },
    setSavedFilter: (state, action: PayloadAction<SavedFilter>) => {
      state.savedFilters.push(action.payload)
    },
    updateCurrentFilter: (state, action: PayloadAction<{ key: string, value: string }>) => {
      state.currentFilter = {
        ...state.currentFilter,
        [action.payload.key]: action.payload.value
      }
    },
    resetCurrentFilter: (state) => {
      state.currentFilter = emptyFilter
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAppliedFilter, setSavedFilter, updateCurrentFilter, resetCurrentFilter } = filtersSlice.actions

export default filtersSlice.reducer
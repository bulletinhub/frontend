import { configureStore } from '@reduxjs/toolkit'

import filtersReducer from '@/components/filter/filtersSlice'
import drawersReducer from '@/components/drawer/drawersSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      filters: filtersReducer,
      drawers: drawersReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
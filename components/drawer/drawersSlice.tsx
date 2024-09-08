import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DrawersState {
  isLeftDrawerOpened: boolean;
  isRightDrawerOpened: boolean;
}

const initialState: DrawersState = {
  isLeftDrawerOpened: false,
  isRightDrawerOpened: false
}

export const drawersSlice = createSlice({
  name: 'drawers',
  initialState,
  reducers: {
    openLeftDrawer: (state) => {
      state.isLeftDrawerOpened = true
    },
    closeLeftDrawer: (state) => {
      state.isLeftDrawerOpened = false
    },
    openRightDrawer: (state) => {
      state.isRightDrawerOpened = true
    },
    closeRightDrawer: (state) => {
      state.isRightDrawerOpened = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { openLeftDrawer, closeLeftDrawer, openRightDrawer, closeRightDrawer } = drawersSlice.actions

export default drawersSlice.reducer
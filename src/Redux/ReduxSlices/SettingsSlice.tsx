import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface settingsState {
  boardHeight: number,
  boardWidth: number
}

const initialState = { boardHeight: 6, boardWidth: 6 } as settingsState

const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    increment(state) {
      state.boardHeight++
    },
    decrement(state) {
      state.boardHeight--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.boardHeight += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = SettingsSlice.actions
export default SettingsSlice.reducer
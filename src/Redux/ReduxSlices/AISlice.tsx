import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface settingsState {
  iterations: number,
  generation: number
}

const initialState = { iterations: 100, generation: 1 } as settingsState

const AISlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setIteration(state, action) {
      state.iterations = action.payload
    },
    setGeneration(state, action) {
      state.generation = action.payload
    },
    
  },
})

export const { setIteration, setGeneration } = AISlice.actions
export default AISlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import AISlice from "./ReduxSlices/AISlice";
import GameStateSlice from "./ReduxSlices/GameStateSlice";
import SettingsSlice from "./ReduxSlices/SettingsSlice";


export const store = configureStore({
    reducer: { 
      settings: SettingsSlice,
      gameState: GameStateSlice,
      ai: AISlice
    },
  })
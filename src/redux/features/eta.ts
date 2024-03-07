import { BookmarkEta } from "@/app/interfaces/eta";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { [key: string]: BookmarkEta } = {};

const etaSlice = createSlice({
  name: "etas",
  initialState,
  reducers: {
    addEta: (state, action: PayloadAction<{ [key: string]: BookmarkEta }>) => {
      return { ...state, ...action.payload };
    },
    removeEta: (state, action: PayloadAction<string>) => {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    },
  },
});

// Export actions and reducer
export const { addEta, removeEta } = etaSlice.actions;
export default etaSlice.reducer;

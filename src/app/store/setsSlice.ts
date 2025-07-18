// setsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  weekById: Record<string, number>;
  indexById: Record<string, number>;
}

const initialState: ProgressState = {
  weekById: {},
  indexById: {},
};

export const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    setWeek(state, action: PayloadAction<{ id: string; week: number }>) {
      state.weekById[action.payload.id] = action.payload.week;
    },
    setIndex(state, action: PayloadAction<{ id: string; index: number }>) {
      state.indexById[action.payload.id] = action.payload.index;
    },
  },
});

export const { setWeek, setIndex } = setsSlice.actions;
export default setsSlice.reducer;

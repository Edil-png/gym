import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Set {
  id: number;
  exercise: string;
  week: string;
  time: string;
}

interface SetsState {
  sets: Set[];
}

const loadFromLocalStorage = (): Set[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("sets");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const initialState: SetsState = {
  sets: loadFromLocalStorage(),
};

const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    addSet: (state, action: PayloadAction<Set>) => {
      state.sets.unshift(action.payload);
      localStorage.setItem("sets", JSON.stringify(state.sets));
    },
    removeSet: (state, action: PayloadAction<number>) => {
      state.sets = state.sets.filter((set) => set.id !== action.payload);
      localStorage.setItem("sets", JSON.stringify(state.sets));
    },
  },
});

export const { addSet, removeSet } = setsSlice.actions;
export default setsSlice.reducer;

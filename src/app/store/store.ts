import { configureStore } from '@reduxjs/toolkit';
import setsReducer from './setsSlice';

export const store = configureStore({
  reducer: {
    sets: setsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

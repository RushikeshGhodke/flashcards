// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/cardSlice.js';

export const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

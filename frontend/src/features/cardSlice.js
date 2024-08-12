import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

// Thunks
export const fetchCards = createAsyncThunk('card/fetchCards', async () => {
  const response = await api.get('/card/getAllCards');
  return response.data.data;
});

export const addCard = createAsyncThunk('card/addCard', async (card) => { // Corrected type here
  const response = await api.post('/card/addCard', card);
  return response.data.data;
});

export const deleteCard = createAsyncThunk('card/deleteCard', async (cardId) => { // Corrected name here
  console.log(cardId)
  await api.delete('/card/deleteCard', { data: { id: cardId } }); // Ensure your API route is correct
  return cardId;
});

export const updateCard = createAsyncThunk('card/updateCard', async (card) => {
  const response = await api.put('/card/editCard', card);
  return response.data.data;
});

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter(card => card.id !== action.payload); // Use correct variable here
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex(card => card.id === action.payload.id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      });
  },
});

export default cardSlice.reducer;

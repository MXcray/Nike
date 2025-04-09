import { createSlice } from '@reduxjs/toolkit';
import { FavoriteProductSchema } from '../types/favorites';
import { addToFavorites } from '../services/addToFavorites/addToFavorites.ts';
import { removeFromFavorites } from '../services/removeFromFavorites/removeFromFavorites.ts';
import { initFavorites } from '../services/initFavorites/initFavorites';

const initialState: FavoriteProductSchema = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработчики для инициализации избранных товаров
      .addCase(initFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(initFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(initFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Обработчики для добавления товара в избранное
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Обработчики для удаления товара из избранного
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: favoriteActions } = favoritesSlice;
export const { reducer: favoriteReducer } = favoritesSlice;
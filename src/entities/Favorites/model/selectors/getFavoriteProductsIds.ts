import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { createSelector } from '@reduxjs/toolkit';

export const getFavoritesState  = (state: StateSchema) => state.favoriteProducts;

// Мемоизированный селектор для получения массива ID избранных товаров
export const getFavoriteProductsIds = createSelector(
	[getFavoritesState],
	(favoritesState) => {
		if (!favoritesState?.data?.productId) {
			return [];
		}
		return favoritesState.data.productId;
	}
);
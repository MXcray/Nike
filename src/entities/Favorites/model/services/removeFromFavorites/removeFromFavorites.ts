import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FavoriteProducts } from '../../types/favorites.ts';
import { getUserIdFromToken } from '@/shared/lib/getUserIdFromToken/getUserIdFromToken.ts';
import {
	getUserFavoriteProducts,
	removeProductFromFavorites
} from '../../api/favoritesApi';
import { removeFromLocalFavorites } from '../../lib/localStorage/favoritesLocalStorage';

/**
 * Асинхронный thunk для удаления товара из избранного
 * @param productId - ID товара для удаления из избранного
 */
export const removeFromFavorites = createAsyncThunk<
	FavoriteProducts,
	string,
	ThunkConfig<string>
>('favorites/removeFromFavorites', async (productId, thunkApi) => {
	const { extra, rejectWithValue } = thunkApi;

	// Получаем ID пользователя из токена
	const userId = getUserIdFromToken();

	try {
		// Если пользователь авторизован
		if (userId) {
			// Получаем текущие избранные товары пользователя из БД
			const userFavorites = await getUserFavoriteProducts(extra.api, userId);

			// Если у пользователя есть избранные товары в БД
			if (userFavorites) {
				// Проверяем, есть ли товар в избранном
				if (userFavorites.productId.includes(productId)) {
					// Удаляем товар из избранного
					return await removeProductFromFavorites(extra.api, userFavorites, productId);
				}

				// Если товара нет в избранном, возвращаем текущий список
				console.log('Товар не найден в избранном');
				return userFavorites;
			}

			// Если у пользователя нет избранных товаров в БД
			return {
				id: userId,
				productId: [],
				userId
			};
		}

		// Если пользователь не авторизован, работаем с localStorage
		else {
			// Удаляем товар из localStorage
			const updatedFavorites = removeFromLocalFavorites(productId);

			// Возвращаем объект, совместимый с FavoriteProducts
			return {
				id: 'local',
				productId: updatedFavorites,
				userId: 'guest'
			};
		}
	} catch (e) {
		console.error('Ошибка при удалении из избранного:', e);
		return rejectWithValue('Ошибка при удалении товара из избранного');
	}
});
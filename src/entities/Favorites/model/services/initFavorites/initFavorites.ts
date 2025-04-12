import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FavoriteProducts } from '../..//types/favorites.ts';
import { getUserIdFromToken } from '@/shared/lib/getUserIdFromToken/getUserIdFromToken.ts';
import {
	clearLocalFavorites,
	getLocalFavorites
} from '../../lib/localStorage/favoritesLocalStorage';
import { favoritesApi } from '../../api/favoritesRtkApi.ts';
import {
	createNewFavorites,
	getUserFavoriteProducts,
	updateFavoritesProductIds
} from '../../api/favoritesApi';

/**
 * Инициализирует избранные товары при загрузке приложения
 */
export const initFavorites = createAsyncThunk<
	FavoriteProducts,
	void,
	ThunkConfig<string>
>('favorites/initFavorites', async (_, thunkApi) => {
	const { extra, rejectWithValue, dispatch } = thunkApi;

	// Получаем ID пользователя из токена
	const userId = getUserIdFromToken();

	try {
		// Если пользователь авторизован
		if (userId) {
			// Получаем избранные товары из БД
			const userFavoritesResult = await dispatch(
				favoritesApi.endpoints.getUserFavorites.initiate(userId)
			).unwrap();

			// Получаем избранные товары из localStorage
			const localFavorites = getLocalFavorites();

			// Если есть товары в БД
			if (userFavoritesResult) {
				// Если есть товары в localStorage, объединяем их
				if (localFavorites.length > 0) {
					const mergedProductIds = [...new Set([...userFavoritesResult.productId, ...localFavorites])];

					// Обновляем запись в БД и очищаем localStorage
					const updatedFavorites = await dispatch(
						favoritesApi.endpoints.updateFavorites.initiate({
							favoriteId: userFavoritesResult.id,
							productIds: mergedProductIds
						})
					).unwrap();

					clearLocalFavorites();
					return updatedFavorites;
				}

				return userFavoritesResult;
			}

			// Если в БД нет записи, но есть товары в localStorage
			if (localFavorites.length > 0) {
				// Создаем новую запись в БД с товарами из localStorage
				const newFavorites = await dispatch(
					favoritesApi.endpoints.createFavorites.initiate({
						userId,
						productIds: localFavorites
					})
				).unwrap();

				clearLocalFavorites();
				return newFavorites;
			}

			// Если нигде нет избранных товаров, возвращаем пустой объект
			return {
				id: userId,
				productId: [],
				userId
			};
		}

		// Если пользователь не авторизован
		else {
			// Возвращаем товары из localStorage
			const localFavorites = getLocalFavorites();

			return {
				id: 'local',
				productId: localFavorites,
				userId: 'guest'
			};
		}
	} catch (e) {
		console.error('Ошибка при инициализации избранных товаров:', e);
		return rejectWithValue('Ошибка при загрузке избранных товаров');
	}
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FavoriteProducts } from '../../types/favorites.ts';
import { getUserIdFromToken } from '@/shared/lib/getUserIdFromToken/getUserIdFromToken.ts';
import {
	addToLocalFavorites,
	clearLocalFavorites,
	getLocalFavorites
} from '../../lib/localStorage/favoritesLocalStorage';
import {
	createNewFavorites,
	getUserFavoriteProducts,
	updateExistingFavorites,
} from '../../api/favoritesApi';
import { favoritesApi } from '../../api/favoritesRtkApi.ts';

/**
 * Асинхронный thunk для добавления товара в избранное
 * @param productId - ID товара для добавления в избранное
 */
export const addToFavorites = createAsyncThunk<
	FavoriteProducts,
	string,
	ThunkConfig<string>
>('favorites/addToFavorites', async (productId, thunkApi) => {
	const { extra, rejectWithValue, dispatch } = thunkApi;

	// Получаем ID пользователя из токена
	const userId = getUserIdFromToken();

	try {
		// Если пользователь авторизован
		if (userId) {
			// Получаем текущие избранные товары пользователя из БД
			const userFavoritesResult = await dispatch(
				favoritesApi.endpoints.getUserFavorites.initiate(userId)
			).unwrap();

			// Получаем избранные товары из localStorage (если есть)
			const localFavorites = getLocalFavorites();

			// Если у пользователя уже есть избранные товары в БД
			if (userFavoritesResult) {
				// Объединяем товары из localStorage с товарами из БД
				if (localFavorites.length > 0) {
					const mergedProductIds = [
						...new Set([...userFavoritesResult.productId, ...localFavorites, productId])
					];

					// Очищаем localStorage после объединения
					clearLocalFavorites();

					// Обновляем запись в БД с объединенными данными
					return await dispatch(
						favoritesApi.endpoints.updateFavorites.initiate({
							favoriteId: userFavoritesResult.id,
							productIds: mergedProductIds
						})
					).unwrap();
				}

				// Если в localStorage нет товаров, просто добавляем новый товар
				return await dispatch(
					favoritesApi.endpoints.addProductToFavorites.initiate({
						favoriteId: userFavoritesResult.id,
						currentProductIds: userFavoritesResult.productId,
						productId,
						userId
					})
				).unwrap();
			}

			// Если у пользователя нет избранных товаров в БД, создаем новую запись
			// и объединяем с товарами из localStorage
			const initialProductIds = localFavorites.length > 0
				? [...new Set([...localFavorites, productId])]
				: [productId];

			// Очищаем localStorage после объединения
			clearLocalFavorites();

			return await dispatch(
				favoritesApi.endpoints.createFavorites.initiate({
					userId,
					productIds: initialProductIds
				})
			).unwrap();
		}

		// Если пользователь не авторизован, работаем с localStorage
		else {
			// Добавляем товар в localStorage
			const updatedFavorites = addToLocalFavorites(productId);

			// Возвращаем объект, совместимый с FavoriteProducts
			return {
				id: 'local',
				productId: updatedFavorites,
				userId: 'guest'
			};
		}
	} catch (e) {
		console.error('Ошибка при добавлении в избранное:', e);
		return rejectWithValue('Ошибка при добавлении товара в избранное');
	}
});
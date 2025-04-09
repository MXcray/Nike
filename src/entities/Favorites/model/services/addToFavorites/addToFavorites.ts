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
	updateExistingFavorites
} from '../../api/favoritesApi';

/**
 * Асинхронный thunk для добавления товара в избранное
 * @param productId - ID товара для добавления в избранное
 */
export const addToFavorites = createAsyncThunk<
	FavoriteProducts,
	string,
	ThunkConfig<string>
>('favorites/addToFavorites', async (productId, thunkApi) => {
	const { extra, rejectWithValue } = thunkApi;

	// Получаем ID пользователя из токена
	const userId = getUserIdFromToken();

	try {
		// Если пользователь авторизован
		if (userId) {
			// Получаем текущие избранные товары пользователя из БД
			const userFavorites = await getUserFavoriteProducts(extra.api, userId);

			// Получаем избранные товары из localStorage (если есть)
			const localFavorites = getLocalFavorites();

			// Если у пользователя уже есть избранные товары в БД
			if (userFavorites) {
				// Объединяем товары из localStorage с товарами из БД
				if (localFavorites.length > 0) {
					const mergedProductIds = [...new Set([...userFavorites.productId, ...localFavorites])];

					// Очищаем localStorage после объединения
					clearLocalFavorites();

					// Обновляем запись в БД с объединенными данными
					return await updateExistingFavorites(extra.api, userFavorites, productId, mergedProductIds);
				}

				// Если в localStorage нет товаров, просто добавляем новый товар
				return await updateExistingFavorites(extra.api, userFavorites, productId);
			}

			// Если у пользователя нет избранных товаров в БД, создаем новую запись
			// и объединяем с товарами из localStorage
			const initialProductIds = localFavorites.length > 0
				? [...new Set([...localFavorites, productId])]
				: [productId];

			// Очищаем localStorage после объединения
			clearLocalFavorites();

			return await createNewFavorites(extra.api, userId, initialProductIds);
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
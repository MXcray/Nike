import { AxiosInstance } from 'axios';
import { FavoriteProducts } from '../../model/types/favorites';
import { v4 as uuidv4 } from 'uuid';

/**
 * Получает избранные товары пользователя из БД
 * @deprecated
 */
export async function getUserFavoriteProducts(
	api: AxiosInstance,
	userId: string
): Promise<FavoriteProducts | null> {
	const response = await api.get<FavoriteProducts[]>('favoriteProducts', {
		params: { userId }
	});

	return response.data && response.data.length > 0
		? response.data[0]
		: null;
}

/**
 * Обновляет существующую запись избранных товаров
 * @deprecated
 */
export async function updateExistingFavorites(
	api: AxiosInstance,
	userFavorites: FavoriteProducts,
	productId: string,
	mergedProductIds?: string[]
): Promise<FavoriteProducts> {
	// Если переданы объединенные ID товаров, используем их
	if (mergedProductIds) {
		const response = await api.patch<FavoriteProducts>(
			`/favoriteProducts/${userFavorites.id}`,
			{ productId: mergedProductIds }
		);

		console.log('Избранные товары объединены и обновлены');
		return response.data;
	}

	// Проверяем, есть ли уже товар в избранном
	if (!userFavorites.productId.includes(productId)) {
		// Добавляем новый товар в список избранных
		const updatedProductIds = [...userFavorites.productId, productId];

		const response = await api.patch<FavoriteProducts>(
			`/favoriteProducts/${userFavorites.id}`,
			{ productId: updatedProductIds }
		);

		console.log('Товар успешно добавлен в избранное');
		return response.data;
	}

	console.log('Товар уже находится в избранном');
	return userFavorites;
}

/**
 * Обновляет список ID товаров в избранном
 * @deprecated
 */
export async function updateFavoritesProductIds(
	api: AxiosInstance,
	userFavorites: FavoriteProducts,
	productIds: string[]
): Promise<FavoriteProducts> {
	const response = await api.patch<FavoriteProducts>(
		`/favoriteProducts/${userFavorites.id}`,
		{ productId: productIds }
	);

	console.log('Список избранных товаров обновлен');
	return response.data;
}

/**
 * Создает новую запись избранных товаров
 * @deprecated
 */
export async function createNewFavorites(
	api: AxiosInstance,
	userId: string,
	productId: string | string[]
): Promise<FavoriteProducts> {
	const productIds = Array.isArray(productId) ? productId : [productId];

	const newFavorite: FavoriteProducts = {
		id: uuidv4(),
		productId: productIds,
		userId
	};

	const response = await api.post<FavoriteProducts>(
		'/favoriteProducts',
		newFavorite
	);

	console.log('Создана новая запись избранного');
	return response.data;
}

/**
 * Удаляет товар из избранного в БД
 * @deprecated
 */
export async function removeProductFromFavorites(
	api: AxiosInstance,
	userFavorites: FavoriteProducts,
	productId: string
): Promise<FavoriteProducts> {
	// Удаляем товар из списка избранных
	const updatedProductIds = userFavorites.productId.filter(id => id !== productId);

	const response = await api.patch<FavoriteProducts>(
		`/favoriteProducts/${userFavorites.id}`,
		{ productId: updatedProductIds }
	);

	console.log('Товар успешно удален из избранного');
	return response.data;
}
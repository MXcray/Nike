import { rtkApi } from '@/shared/api/rtkApi';
import { FavoriteProducts } from '../types/favorites';
import { v4 as uuidv4 } from 'uuid';

/**
 * API для работы с избранными товарами
 */
export const favoritesApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		// Получение избранных товаров пользователя
		getUserFavorites: build.query<FavoriteProducts | null, string>({
			query: (userId) => ({
				url: 'favoriteProducts',
				params: { userId },
			}),
			transformResponse: (response: FavoriteProducts[]) => {
				return response && response.length > 0 ? response[0] : null;
			},
			providesTags: (result) =>
				result
					? [{ type: 'Favorites', id: result.id }]
					: [{ type: 'Favorites', id: 'LIST' }],
		}),

		// Создание новой записи избранных товаров
		createFavorites: build.mutation<FavoriteProducts, { userId: string; productIds: string[] }>({
			query: ({ userId, productIds }) => ({
				url: '/favoriteProducts',
				method: 'POST',
				body: {
					id: uuidv4(),
					productId: productIds,
					userId
				},
			}),
			invalidatesTags: [{ type: 'Favorites', id: 'LIST' }],
		}),

		// Обновление списка избранных товаров
		updateFavorites: build.mutation<FavoriteProducts, { favoriteId: string; productIds: string[] }>({
			query: ({ favoriteId, productIds }) => ({
				url: `/favoriteProducts/${favoriteId}`,
				method: 'PATCH',
				body: { productId: productIds },
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Favorites', id: result.id }] : [],
		}),

		// Добавление товара в избранное
		addProductToFavorites: build.mutation<FavoriteProducts, {
			favoriteId: string;
			currentProductIds: string[];
			productId: string;
			userId: string;
		}>({
			query: ({ favoriteId, currentProductIds, productId }) => {
				// Проверяем, есть ли уже товар в избранном
				if (!currentProductIds.includes(productId)) {
					const updatedProductIds = [...currentProductIds, productId];
					return {
						url: `/favoriteProducts/${favoriteId}`,
						method: 'PATCH',
						body: { productId: updatedProductIds },
					};
				}
				// Если товар уже в избранном, просто получаем текущее состояние
				return {
					url: `/favoriteProducts/${favoriteId}`,
					method: 'GET',
				};
			},
			// Вместо инвалидации тега, обновляем кэш напрямую
			async onQueryStarted({ favoriteId, currentProductIds, productId, userId }, { dispatch, queryFulfilled }) {
				try {
					// Ждем завершения запроса
					const { data: updatedFavorites } = await queryFulfilled;

					// Обновляем кэш запроса getUserFavorites напрямую
					dispatch(
						favoritesApi.util.updateQueryData('getUserFavorites', userId, (draft) => {
							// Если draft существует, обновляем его
							if (draft) {
								// Заменяем весь объект обновленными данными
								Object.assign(draft, updatedFavorites);
							}
							return draft;
						})
					);
				} catch {
					// В случае ошибки ничего не делаем, кэш останется прежним
				}
			},
		}),

		// Удаление товара из избранного
		removeProductFromFavorites: build.mutation<FavoriteProducts, {
			favoriteId: string;
			currentProductIds: string[];
			productId: string;
			userId: string;
		}>({
			query: ({ favoriteId, currentProductIds, productId }) => {
				const updatedProductIds = currentProductIds.filter(id => id !== productId);
				return {
					url: `/favoriteProducts/${favoriteId}`,
					method: 'PATCH',
					body: { productId: updatedProductIds },
				};
			},
			async onQueryStarted({ favoriteId, currentProductIds, productId, userId }, { dispatch, queryFulfilled }) {
				try {
					// Ждем завершения запроса
					const { data: updatedFavorites } = await queryFulfilled;

					// Обновляем кэш запроса getUserFavorites напрямую
					dispatch(
						favoritesApi.util.updateQueryData('getUserFavorites', userId, (draft) => {
							// Если draft существует, обновляем его
							if (draft) {
								// Заменяем весь объект обновленными данными
								Object.assign(draft, updatedFavorites);
							}
							return draft;
						})
					);
				} catch {
					// В случае ошибки ничего не делаем, кэш останется прежним
				}
			},
		}),
	}),
});

// Экспорт хуков для использования в компонентах
export const {
	useGetUserFavoritesQuery,
	useCreateFavoritesMutation,
	useUpdateFavoritesMutation,
	useAddProductToFavoritesMutation,
	useRemoveProductFromFavoritesMutation,
} = favoritesApi;
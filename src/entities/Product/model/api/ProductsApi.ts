import { rtkApi } from '@/shared/api/rtkApi.ts';
import { Product } from '@/entities/Product';

/**
 * Интерфейс ответа API для запроса продуктов
 */
export interface ProductsResponse {
	products: Product[];
	totalCount: number;
}

/**
 * Параметры запроса для получения продуктов с пагинацией и фильтрацией
 */
export interface ProductQueryParams {
	page?: number;
	limit?: number;
	size?: string;
	minPrice?: number;
	maxPrice?: number;
	color?: string;
	material?: string;
}

/**
 * API для работы с продуктами
 */
export const ProductsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<ProductsResponse, ProductQueryParams | void>({
			query: (params) => {
				const page = params?.page || 1;
				const limit = params?.limit || 9;

				// Формируем параметры запроса
				const queryParams: Record<string, string | number> = {
					_page: page,
					_limit: limit,
				};

				// Добавляем фильтры по цене
				if (params?.minPrice) {
					queryParams['price.currentPrice_gte'] = params.minPrice;
				}

				if (params?.maxPrice) {
					queryParams['price.currentPrice_lte'] = params.maxPrice;
				}

				// Добавляем фильтры по размеру, цвету и материалу
				if (params?.size) {
					queryParams['size'] = params.size;
				}

				if (params?.color) {
					queryParams['color'] = params.color;
				}

				if (params?.material) {
					queryParams['material'] = params.material;
				}

				return {
					url: '/products',
					params: queryParams
				};
			},
			transformResponse: (response: Product[], meta) => {
				const totalCount = Number(meta?.response?.headers.get('X-Total-Count') || 0);

				return {
					products: response,
					totalCount
				};
			},
			providesTags: ['Products'],
		}),
		getProductsByIds: build.query<Product[], string[]>({
			query: (ids) => {
				const params = new URLSearchParams();

				// Добавляем каждый id как отдельный параметр с одинаковым именем
					ids.forEach(id => {
						params.append('id', id);
					});

				return {
					url: '/products',
					params,
				};
			},
			providesTags: ['Products'],
		}),
		getProductById: build.query<Product, string>({
			query: (id) => {

				return {
					url: `/products/${id}`,
				};
			},
			providesTags: ['Products'],
		}),
	}),
	overrideExisting: false,
});

// Экспорт хуков для использования в компонентах
export const {
	useGetProductsQuery,
	useGetProductsByIdsQuery,
	useGetProductByIdQuery,
} = ProductsApi;
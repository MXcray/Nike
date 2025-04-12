import { rtkApi } from '@/shared/api/rtkApi.ts';
import { Product } from '@/entities/Product';

const ProductsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<Product[], void>({
			query: () => ({
				url: '/products',
			}),
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
					url: `/products`,
					params ,
				}
			},
			providesTags: ['Products'],
		}),
	}),
	overrideExisting: false,
});

export const { useGetProductsQuery } = ProductsApi;
export const { useGetProductsByIdsQuery } = ProductsApi;
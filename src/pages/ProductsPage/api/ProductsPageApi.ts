import { rtkApi } from '@/shared/api/rtkApi.ts';
import { Product } from '@/entities/Product';

const ProductsPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<Product[], void>({
			query: () => ({
				url: '/products',
			})
		}),
	}),
});

export const { useGetProductsQuery } = ProductsPageApi;

import { useSelector } from 'react-redux';
import {
	getProductsPageLimit,
	getProductsPageNum,
	getProductsPageSize,
	getProductsPageColor,
	getProductsPageMinPrice,
	getProductsPageMaxPrice,
	getProductsPageMaterial,
} from '../../selectors/ProductsPageSelectors.ts';
import { useGetProductsQuery } from '@/entities/Product/model/api/ProductsApi.ts';

export const useProductsWithPagination = () => {
	const page = useSelector(getProductsPageNum);
	const limit = useSelector(getProductsPageLimit);
	const size = useSelector(getProductsPageSize);
	const color = useSelector(getProductsPageColor);
	const minPrice = useSelector(getProductsPageMinPrice);
	const maxPrice = useSelector(getProductsPageMaxPrice);
	const material = useSelector(getProductsPageMaterial);

	return useGetProductsQuery({
		page,
		limit,
		size,
		color,
		minPrice,
		maxPrice,
		material
	});
}
import { memo, useCallback } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductsPage.module.scss';
import { ProductList } from '@/entities/Product/ui/ProductList/ProductList.tsx';
import { AddToFavoriteBtn } from '@/features/AddToFavorite/ui/AddToFavoriteBtn/AddToFavoriteBtn.tsx';
import { ProductsPageFilters } from '@/pages/ProductsPage/ui/ProductsPageFilters/ProductsPageFilters.tsx';
import { useSelector } from 'react-redux';
import { Pagination } from '@/features/Pagination';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/ProductsPageSlice.ts';
import {
	useProductsWithPagination
} from '@/pages/ProductsPage/model/hooks/useProductsWithPagination/useProductsWithPagination.ts';
import {
	getProductsPageLimit,
	getProductsPageNum,
} from '@/pages/ProductsPage/model/selectors/ProductsPageSelectors.ts';

interface ProductsPageProps {
	className?: string;
}

export const ProductsPage = memo((props: ProductsPageProps) => {
	const {
		className,
	} = props;

	const dispatch = useAppDispatch();

	const {
		data,
		isFetching: fetching,
		isLoading: loading,
		error,
	} = useProductsWithPagination();

	const products = data?.products || [];
	const productsQty = data?.totalCount || 0;
	const page = useSelector(getProductsPageNum);
	const limit = useSelector(getProductsPageLimit);

	const onPageChange = useCallback((page: number) => {
		dispatch(productsPageActions.setPage(page));
	},[ dispatch ])

	const isLoading = fetching || loading;

	return (
		<div className={classNames(cls.ProductsPage, {}, [className])}>
			<ProductsPageFilters />

			<Pagination
				currentPage={page}
				itemsPerPage={limit}
				totalItems={productsQty}
				onPageChange={onPageChange}
				isLoading={isLoading}
			/>

			<ProductList
				products={products}
				isLoading={isLoading}
				error={error}
				addToFavoriteRender={(productId: string) => <AddToFavoriteBtn productId={productId} />}
			/>

			{/*{*/}
			{/*	products.length > 0*/}
			{/*		? <ProductListItem product={products[0]} />*/}
			{/*		: <div>продукты не найдены</div>*/}
			{/*}*/}
		</div>
	);
});
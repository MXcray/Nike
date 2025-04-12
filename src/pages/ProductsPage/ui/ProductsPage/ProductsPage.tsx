import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductsPage.module.scss';
import {
	useGetProductsQuery,
} from '@/entities/Product/model/api/ProductsApi.ts';
import { ProductList } from '@/entities/Product/ui/ProductList/ProductList.tsx';
import { AddToFavoriteBtn } from '@/features/AddToFavorite/ui/AddToFavoriteBtn/AddToFavoriteBtn.tsx';
import { ProductsPageFilters } from '@/pages/ProductsPage/ui/ProductsPageFilters/ProductsPageFilters.tsx';

interface ProductsPageProps {
	className?: string;
}

export const ProductsPage = memo((props: ProductsPageProps) => {
	const {
		className,
	} = props;

	const {
		data: products = [],
		isLoading,
		error
	} = useGetProductsQuery();

	return (
		<div className={classNames(cls.ProductsPage, {}, [className])}>
			<ProductsPageFilters />

			<div>
				paginate

			</div>

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
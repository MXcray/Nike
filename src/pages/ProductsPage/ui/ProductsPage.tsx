import { memo, useEffect, useRef } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductsPage.module.scss';
import { ProductListItem } from '@/entities/Product/ui/ProductListItem/ProductListItem.tsx';
import { useSelector } from 'react-redux';
import { getProducts } from '@/pages/ProductsPage/model/slices/ProductsPageSlice.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import { fetchProductsList } from '@/pages/ProductsPage/model/services/fetchProductsList/fetchProductsList.ts';
import {
	useGetProductsQuery,
} from '../api/ProductsPageApi.ts';

interface ProductsPageProps {
	className?: string;
}

export const ProductsPage = memo((props: ProductsPageProps) => {
	const {
		className,
	} = props;

	// const dispatch = useAppDispatch();

	// const products = useSelector((state: StateSchema) => state.productsPage.data)

	// const products = useSelector(getProducts.selectAll);
	// useEffect(() => {
	// 	dispatch(fetchProductsList());
	// }, [dispatch])

	const {
		data: products = [],
		isLoading,
		error
	} = useGetProductsQuery();


	console.log(products);

	return (
			<div style={{ backgroundColor: 'coral' }} className={classNames(cls.ProductsPage, {}, [className])}>
				ProductsPage
				{products.length > 0 ? (
					<ProductListItem product={products[0]} />

				) : (
					<div>продукты не найдены</div>
				)}
			</div>
	);
});
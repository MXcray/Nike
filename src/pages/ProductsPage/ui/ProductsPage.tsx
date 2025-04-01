import { memo, useEffect, useRef } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductsPage.module.scss';
import { ProductListItem } from '@/entities/Product/ui/ProductListItem/ProductListItem.tsx';
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

	const {
		data: products = [],
		isLoading,
		error
	} = useGetProductsQuery();

	console.log(products);

	if (isLoading) {
		return (
			<div>Загрузка...</div>
		);
	}

	if (error) {
		return (
			<div>Призошла ошибка при загрузке товаров</div>
		);
	}

	return (
			<div className={classNames(cls.ProductsPage, {}, [className])}>
				ProductsPage
				{
					products.length > 0
						? <ProductListItem product={products[0]} />
						: <div>продукты не найдены</div>
				}
			</div>
	);
});
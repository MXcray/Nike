import { memo, ReactElement } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductList.module.scss';
import { Product } from '@/entities/Product';
import { ProductListItem } from '@/entities/Product/ui/ProductListItem/ProductListItem.tsx';
import { ProductListItemSkeleton } from '@/entities/Product/ui/ProductListItem/ProductListItemSkeleton.tsx';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ProductsResponse } from '@/entities/Product/model/api/ProductsApi.ts';

interface ProductListProps {
	className?: string;
	products?: Product[];
	isLoading?: boolean;
	addToFavoriteRender?: (productId: string) => ReactElement;
	error?: SerializedError | FetchBaseQueryError | undefined;
}

const getSkeletons = () => {
	return new Array(9)
		.fill(0)
		.map((item, index) => (
			<ProductListItemSkeleton key={index}/>
		))
}

export const ProductList = memo((props: ProductListProps) => {
	const {
		className,
		products,
		isLoading,
		error,
		addToFavoriteRender,
	} = props;

	if (error) {
		return (
			<div>Призошла ошибка при загрузке товаров</div>
		);
	}

	return (
		<div className={classNames(cls.ProductList, {}, [className])}>
			{isLoading && getSkeletons()}

			{products?.map((product, index) => {
				return (
					<ProductListItem
						isLoading={isLoading}
						key={index}
						product={product}
						addToFavoriteRender={addToFavoriteRender ? () => addToFavoriteRender(product.id) : undefined}
					/>
					);
				})}
			</div>
	);
});
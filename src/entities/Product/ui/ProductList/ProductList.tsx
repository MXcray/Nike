import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductList.module.scss';
import { Product } from '@/entities/Product';
import { ProductListItem } from '@/entities/Product/ui/ProductListItem/ProductListItem.tsx';
import { ProductListItemSkeleton } from '@/entities/Product/ui/ProductListItem/ProductListItemSkeleton.tsx';

interface ProductListProps {
	className?: string;
	products?: Product[];
	isLoading?: boolean;
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
	} = props;

	return (
		<div className={classNames(cls.ProductList, {}, [className])}>
			{products?.map((product, index) => {
				return (
					<ProductListItem key={index} product={product} />
					);
				})}
			{isLoading && getSkeletons()}
			</div>
	);
});
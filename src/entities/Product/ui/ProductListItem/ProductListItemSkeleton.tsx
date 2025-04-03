import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductListItem.module.scss';
import { ProductItemGallerySkeleton } from '@/entities/Product/ui/ProductItemGallery/ProductItemGallerySkeleton.tsx';
import { ProductItemInfoSkeleton } from '@/entities/Product/ui/ProductItemInfo/ProductItemInfoSkeleton.tsx';

interface ProductListItemSkeletonProps {
	className?: string;
}

export const ProductListItemSkeleton = memo((props: ProductListItemSkeletonProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.ProductListItem, {}, [className])}>
				<ProductItemGallerySkeleton />
				<ProductItemInfoSkeleton className={cls.info} />
			</div>
	);
});
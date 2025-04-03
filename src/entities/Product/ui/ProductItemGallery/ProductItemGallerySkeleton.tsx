import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductItemGallery.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton.tsx';

interface ProductItemGallerySkeletonProps {
	className?: string;
}

export const ProductItemGallerySkeleton = memo((props: ProductItemGallerySkeletonProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.ProductItemGallery, {}, [className])}>
				<Skeleton height={'100%'} className={cls.errorSlide}/>
			</div>
	);
});
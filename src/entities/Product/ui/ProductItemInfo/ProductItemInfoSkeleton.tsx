import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductItemInfo.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton.tsx';

interface ProductItemInfoSkeletonProps {
	className?: string;
}

export const ProductItemInfoSkeleton = memo((props: ProductItemInfoSkeletonProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.ProductItemInfoSkeleton, {}, [className])}>
				<Skeleton height={14} width={100} />
				<Skeleton height={23} />
				<Skeleton height={18} width={150} />
				<Skeleton height={23} width={80}/>
			</div>
	);
});
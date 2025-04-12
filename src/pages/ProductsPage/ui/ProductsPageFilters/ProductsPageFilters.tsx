import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductsPageFilters.module.scss';

interface ProductsPageFiltersProps {
	className?: string;
}

export const ProductsPageFilters = memo((props: ProductsPageFiltersProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.ProductsPageFilters, {}, [className])}>
				ProductsPageFilters
			</div>
	);
});
import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductsPageFilters.module.scss';
import { SizeFilter } from '@/features/SizeFilter';
import { useProductsFilters } from '@/pages/ProductsPage/model/hooks/useProductsFilters/useProductsFilters.ts';
import { ColorFilter } from '@/features/ColorFilter';
import { MaterialFilter } from '@/features/MaterialFilter';
import { PriceFilter } from '@/features/PriceFilter';
import { ClearFilters } from '@/features/ClearFilters';

interface ProductsPageFiltersProps {
	className?: string;
}

export const ProductsPageFilters = memo((props: ProductsPageFiltersProps) => {
	const {
		className,
	} = props;

	const {
		size,
		minPrice,
		maxPrice,
		color,
		material,
		onChangeSize,
		onChangePrice,
		onChangeColor,
		onChangeMaterial,
		resetFilters,
	} = useProductsFilters();

	return (
		<div className={classNames(cls.ProductsPageFilters, {}, [className])}>
			<div style={{ display: 'flex' }}>
				<SizeFilter
					className={cls.filter}
					size={size}
					onChangeSize={onChangeSize}
				/>
				<PriceFilter
					className={cls.filter}
					minValue={0}
					maxValue={20000}
					initialMinValue={minPrice}
					initialMaxValue={maxPrice}
					onPriceChange={onChangePrice}
				/>
				<ColorFilter
					className={cls.filter}
					color={color}
					onChangeColor={onChangeColor}
				/>
				<MaterialFilter
					className={cls.filter}
					material={material}
					onChangeMaterial={onChangeMaterial}
				/>
				<ClearFilters
					className={cls.filter}
					onClick={resetFilters}
				/>
			</div>
		</div>
	);
});
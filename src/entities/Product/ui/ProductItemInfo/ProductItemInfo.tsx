import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductItemInfo.module.scss';
import { ProductColorPicker } from '../ProductColorPicker/ProductColorPicker.tsx';
import { mapProductColors } from '../../model/lib/mapProductColors.ts';
import { ProductPrice, ProductVariant } from '../../model/types/product.ts';
import { mapCurrencyToSymbol } from '@/shared/lib/mapCurrencyToSymbol/mapCurrencyToSymbol.ts';
import { formatPrice } from '@/shared/lib/formatPrice/formatPrice.ts';
import { ProductItemInfoSkeleton } from '@/entities/Product/ui/ProductItemInfo/ProductItemInfoSkeleton.tsx';

interface ProductInfoProps {
	className?: string;
	brand: string;
	model: string;
	sex: string;
	variants: ProductVariant[];
	price: ProductPrice;
	isLoading?: boolean;
}

export const ProductItemInfo = memo((props: ProductInfoProps) => {
	const {
		className,
		brand,
		model,
		variants,
		sex,
		price,
		isLoading,
	} = props;

	// Получаем цвета из вариантов товара
	const displayColors = mapProductColors(variants);

	const currency = mapCurrencyToSymbol[price.currency];

	if (isLoading) {
		return (
			<ProductItemInfoSkeleton />
		);
	}

	return (
		<div className={classNames(cls.ProductInfo, {}, [className])}>
			<div className={cls.sex}>{sex}</div>
			<div className={cls.name}>{brand} {model}</div>
			{displayColors.length > 0 && (
				<ProductColorPicker
					colors={displayColors}
					className={cls.colorPicker}
				/>
			)}
			<div className={cls.price}>
				<span className={cls.currentPrice}>{formatPrice(price.currentPrice)} {currency}</span>
				{price.oldPrice && (
					<span className={cls.oldPrice}>{formatPrice(price.oldPrice)} {currency}</span>
				)}
			</div>
		</div>
	);
});
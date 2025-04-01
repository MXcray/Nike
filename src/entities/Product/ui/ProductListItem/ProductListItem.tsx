import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductListItem.module.scss';
import { Product } from '@/entities/Product';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { ProductItemGallery } from '../ProductItemGallery/ProductItemGallery';
import { ProductItemInfo } from '../ProductItemInfo/ProductItemInfo';

interface ProductListItemProps {
	className?: string;
	product: Product;
}

export const ProductListItem = memo((props: ProductListItemProps) => {
	const {
		className,
		product,
	} = props;

	return (
		<div className={classNames(cls.ProductListItem, {}, [className])}>
			<ProductItemGallery
				images={product.images}
				badge={product.badge}
				className={cls.gallery}
			/>
			<ProductItemInfo
				className={cls.info}
				brand={product.brand}
				model={product.model}
				sex={product.specifications.sex}
				variants={product.variants}
				price={product.price}
				// price={product.price || { currentPrice: 7899, currency: 'Р' }}
			/>
		</div>
	);
});
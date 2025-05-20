import { memo, ReactElement } from 'react';
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
	addToFavoriteRender?: (productId: string) => ReactElement;
	isLoading?: boolean;
}

export const ProductListItem = memo((props: ProductListItemProps) => {
	const {
		className,
		product,
		addToFavoriteRender,
		isLoading,
	} = props;

	return (
		<div className={classNames(cls.ProductListItem, {}, [className])}>
			<ProductItemGallery
				images={product.images}
				badge={product.badge}
				discount={product.discount}
				className={cls.gallery}
				productId={product.id}
				addToFavoriteRender={addToFavoriteRender ? () => addToFavoriteRender(product.id) : undefined}
				isLoading={isLoading}
			/>
			<ProductItemInfo
				className={cls.info}
				brand={product.brand}
				model={product.model}
				sex={product.specifications.sex}
				variants={product.variants}
				price={product.price}
				// isLoading={isLoading}
			/>
		</div>
	);
});
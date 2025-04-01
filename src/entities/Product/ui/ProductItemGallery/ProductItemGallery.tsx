import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductItemGallery.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Img } from '@/shared/ui/Img/Img.tsx';
import { ProductBadge } from '@/entities/Product';
import { Plug, PredefinedPlugType } from '@/shared/ui/Plug/Plug.tsx';

import 'swiper/scss';
import 'swiper/scss/pagination';

interface ProductImage {
	src: string;
	title?: string;
}

interface ProductGalleryProps {
	className?: string;
	images: ProductImage[];
	badge?: ProductBadge;
}

const mapPlugType: Partial<Record<ProductBadge, PredefinedPlugType>> = {
	[ProductBadge.NEW]: 'new',
	[ProductBadge.DISCOUNT]: 'discount',
	[ProductBadge.BESTSELLER]: 'hit',
};

export const ProductItemGallery = memo((props: ProductGalleryProps) => {
	const {
		className,
		images,
		badge,
	} = props;

	const plugType = badge && badge !== ProductBadge.NONE
		? mapPlugType[badge]
		: undefined;

	// Ограничиваем количество изображений до трех
	const limitedImages = images && images.length > 0
		? images.slice(0, 3)
		: [];

	return (
		<div className={classNames(cls.ProductItemGallery, {}, [className])}>
			<div className={cls.fixedSlideContent}>
				{plugType && <Plug plugType={plugType} />}
			</div>
			<Swiper
				slidesPerView={1}
				pagination={{
					clickable: false,
					bulletClass: cls.paginationBullet,
					bulletActiveClass: cls.paginationBulletActive,
					renderBullet: function (index, className) {
						return `<span class="${className}"></span>`;
					},
				}}
				modules={[Pagination]}
				className={cls.swiper}
			>
				{limitedImages.length > 0 ? (
					limitedImages.map((image, index) => (
						<SwiperSlide key={index}>
							<Img src={image.src} alt={image.title} width={300} />
						</SwiperSlide>
					))
				) : (
					<SwiperSlide>
						<div className={cls.noImage}>Нет изображения</div>
					</SwiperSlide>
				)}
			</Swiper>
		</div>
	);
});
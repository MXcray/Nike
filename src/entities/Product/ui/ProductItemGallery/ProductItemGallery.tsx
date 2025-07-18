
import { memo, ReactElement, useRef, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductItemGallery.module.scss';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Img } from '@/shared/ui/Img/Img.tsx';
import { ProductBadge } from '@/entities/Product';
import { Plug, PredefinedPlugType } from '@/shared/ui/Plug/Plug.tsx';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton.tsx';
import { ProductItemGallerySkeleton } from '@/entities/Product/ui/ProductItemGallery/ProductItemGallerySkeleton.tsx';

interface ProductImage {
	src: string;
	title?: string;
	type?: string;
}

interface ProductGalleryProps {
	className?: string;
	images?: ProductImage[] | ProductImage; // Изменено: теперь может быть массивом или одним объектом
	badge?: ProductBadge;
	discount?: string;
	isLoading?: boolean;
	productId: string;
	isFavorite?: boolean;
	addToFavoriteRender?: (productId: string) => ReactElement;
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
		discount,
		isLoading,
		productId,
		isFavorite,
		addToFavoriteRender,
	} = props;

	const swiperRef = useRef<SwiperRef>(null);

	const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

	const plugType = badge && badge !== ProductBadge.NONE
		? mapPlugType[badge]
		: undefined;

	// Преобразуем одиночное изображение в массив, если необходимо
	const imagesArray = !images
		? []
		: Array.isArray(images)
			? images
			: [images];

	// Ограничиваем количество изображений до трех
	const limitedImages = imagesArray.length > 0
		? imagesArray.slice(0, 3)
		: [];

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!swiperRef.current || limitedImages.length <= 1) return;

		const swiper = swiperRef.current.swiper;
		const { left, width } = e.currentTarget.getBoundingClientRect();
		const mouseX = e.clientX - left;
		const position = mouseX / width;

		// Вычисляем индекс слайда на основе позиции мыши
		const slideIndex = Math.floor(position * limitedImages.length);

		// Переключаемся на соответствующий слайд
		if (slideIndex !== swiper.activeIndex) {
			swiper.slideTo(slideIndex);
		}
	};

	const handleImageError = (index: number) => {
		setImageErrors(prev => ({
			...prev,
			[index]: true
		}));
	};

	if (isLoading) {
		return (
			<ProductItemGallerySkeleton />
		);
	}

	return (
		<div
			className={classNames(cls.ProductItemGallery, {}, [className])}
			onMouseMove={handleMouseMove}
		>
			<div className={classNames(
				cls.fixedSlideContent,
				{ [cls.alignCenter]: Boolean(plugType) && Boolean(addToFavoriteRender) }
			)}>
				{plugType && (
					<Plug
						plugType={plugType}
						{...(plugType === 'discount' && discount
							? { plugText: discount + '%' }
							: {})}
					/>
				)}
				{addToFavoriteRender && (
					<div className={classNames(
						cls.addToFavorite,
						{ [cls.isFavorite]: isFavorite }
					)}>
						{addToFavoriteRender(productId)}
					</div>
				)}
			</div>
			<Swiper
				className={cls.swiper}
				ref={swiperRef}
				slidesPerView={1}
				lazyPreloaderClass={cls.preloader}
				lazyPreloadPrevNext={1}
				pagination={{
					clickable: false,
					bulletClass: cls.paginationBullet,
					bulletActiveClass: cls.paginationBulletActive,
					renderBullet: function (index, className) {
						return `<span class="${className}"></span>`;
					},
				}}
				modules={[Pagination, Navigation]}
			>
				{limitedImages.length > 0 ? (
					limitedImages.map((image, index) => (
						<SwiperSlide
							key={index}
							className={classNames(cls.swiperSlide, {
								[cls.errorSlide]: imageErrors[index],
							})}
						>
							<Img
								className={cls.image}
								src={image.src}
								alt={image.title}
								onError={() => handleImageError(index)}
								loading={'lazy'}
							/>
							<Skeleton
								width={'100%'}
								height={'100%'}
								className={cls.preloader}
							/>
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

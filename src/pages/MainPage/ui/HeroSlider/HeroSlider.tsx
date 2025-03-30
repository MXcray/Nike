import { memo, useEffect, useRef, useState } from 'react';
import { classNames } from "../../../../shared/lib/classNames/classNames.ts";
import cls from './HeroSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Controller, EffectCreative, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink.tsx';
import { getRouteMain } from '../../../../shared/const/router.ts';
import { Button } from '../../../../shared/ui/Button/Button.tsx';
import arrowIcon from '../../../../shared/assets/icons/arrow-right.svg?react';
import LineIcon from '../../../../shared/assets/icons/title-line.svg?react';
import sneaker1 from '../../../../shared/assets/images/hero-slider-1.png';

// Типизация для слайдов
interface SlideContent {
	title: string;
	subtitle: string;
	description: string;
	price: string;
	image: string;
}

// Данные для слайдов
const slidesData: SlideContent[] = [
	{
		title: 'Air max',
		subtitle: 'Flyknit Racer',
		description: 'Усиленный носок и прочный пластиковый каркас.' +
			' Инновационная технология раскрывается через перфорированную стельку',
		price: '7 899 ₽',
		image: sneaker1
	},
	{
		title: 'Air max',
		subtitle: 'Flyknit Pro',
		description: 'Усиленный носок и прочный пластиковый каркас.' +
			' Инновационная технология раскрывается через перфорированную стельку',
		price: '8 599 ₽',
		image: sneaker1
	},
	{
		title: 'Air max',
		subtitle: 'Flyknit Ultra',
		description: 'Усиленный носок и прочный пластиковый каркас.' +
			' Инновационная технология раскрывается через перфорированную стельку',
		price: '9 299 ₽',
		image: sneaker1
	},
	{
		title: 'Air max',
		subtitle: 'Flyknit Ultra',
		description: 'Усиленный носок и прочный пластиковый каркас.' +
			' Инновационная технология раскрывается через перфорированную стельку',
		price: '12 199 ₽',
		image: sneaker1
	},
];

export const HeroSlider = memo(() => {
	const swiperRef1 = useRef<SwiperClass | null>(null);
	const swiperRef2 = useRef<SwiperClass | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [slidesCount, setSlidesCount] = useState(slidesData.length);

	useEffect(() => {
		const swiper1 = swiperRef1.current;
		const swiper2 = swiperRef2.current;
		if (swiper1 && swiper2) {
			// Связываем слайдеры
			swiper1.controller.control = swiper2;
			swiper2.controller.control = swiper1;

			// Обработчик события для отслеживания активного слайда
			const handleSlideChange = () => {
				setActiveIndex(swiper1.realIndex);
			};

			swiper1.on('slideChange', handleSlideChange);

			// Устанавливаем количество слайдов
			if (swiper1.slides?.length) {
				setSlidesCount(swiper1.slides.length);
			}

			// Очистка обработчиков при размонтировании
			return () => {
				swiper1.off('slideChange', handleSlideChange);
			};
		}
	}, []);

	// Функция для перехода к определенному слайду при клике на точку пагинации
	const goToSlide = (index: number) => {
		if (swiperRef1.current) {
			swiperRef1.current.slideTo(index);
		}
	};

	// Рендер текстового содержимого слайда
	const renderSlideContent = (slide: SlideContent) => (
		<>
			<h2 className={cls.slideTitle}>
				<span className={cls.slideTitleTopWrapper}>
					<span className={cls.slideTitleTop}>{slide.title}</span>
					<Icon className={cls.slideTitleIcon} Svg={LineIcon} />
				</span>
				<span className={cls.slideTitleBottom}>{slide.subtitle}</span>
			</h2>
			<p className={cls.slideDesc}>
				{slide.description}
			</p>
			<p className={cls.slidePrice}>
				от
				<span className={cls.slidePriceNum}> {slide.price}</span>
			</p>
			<AppLink to={getRouteMain()}>
				<Button
					className={cls.slideBtn}
					buttonType={'filled'}
					buttonColor={'black'}
					icon={arrowIcon}
				>
					Подробнее
				</Button>
			</AppLink>
		</>
	);

	return (
		<div className={cls.swiperContainer}>
			<div className={cls.firstSwiperContainer}>
				<Swiper
					className={cls.swiper}
					slidesPerView={1}
					effect={'fade'}
					fadeEffect={{ crossFade: true }}
					allowTouchMove={false}
					navigation={{
						nextEl: `.${cls.nextArrow}`,
						prevEl: `.${cls.prevArrow}`,
					}}
					onSwiper={(swiper) => {
						swiperRef1.current = swiper;
					}}
					modules={[Navigation, Controller, EffectFade]}
				>
					{slidesData.map((slide, index) => (
						<SwiperSlide key={index} className={cls.swiperSlide}>
							{renderSlideContent(slide)}
						</SwiperSlide>
					))}
					<div className={cls.arrows}>
							<span className={cls.prevArrow}>
								<Icon Svg={arrowIcon} width={14} />
							</span>
						<span className={cls.nextArrow}>
								<Icon Svg={arrowIcon} width={14} />
							</span>
					</div>
				</Swiper>
			</div>

			<div className={cls.secondSwiperContainer}>
				<div className={cls.verticalPagination}>
					{Array.from({ length: slidesCount }).map((_, index) => (
						<div
							key={index}
							className={classNames(
								cls.paginationBullet,
								{ [cls.active]: index === activeIndex },
								[],
							)}
							onClick={() => goToSlide(index)}
						/>
					))}
				</div>

				<Swiper
					className={cls.swiper}
					modules={[Controller, Pagination]}
					autoHeight={true}
					slidesPerView={'auto'}
					onSwiper={(swiper) => {
						swiperRef2.current = swiper;
						if (swiper.slides?.length) {
							setSlidesCount(swiper.slides.length);
						}
					}}
				>
					{slidesData.map((slide, index) => (
						<SwiperSlide key={index} className={cls.swiperSlide}>
							<div className={cls.slideContent}>
								<img src={slide.image} alt={`${slide.title} ${slide.subtitle}`} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
});
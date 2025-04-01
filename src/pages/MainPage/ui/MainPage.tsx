import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import 'swiper/scss';
import 'swiper/scss/effect-fade';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import cls from './MainPage.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import featuresIcon1 from '@/shared/assets/icons/main-features-1.svg?react';
import featuresIcon2 from '@/shared/assets/icons/main-features-2.svg?react';
import featuresIcon3 from '@/shared/assets/icons/main-features-3.svg?react';
import { HeroSlider } from './HeroSlider/HeroSlider.tsx';

interface MainPageProps {
	className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
	const {
		className,
	} = props;

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<HeroSlider />
			<div className={cls.features}>
				<div className={cls.featuresItem}>
					<Icon
						className={cls.featuresImg}
						Svg={featuresIcon1}
						width={36}
						height={36}
					/>
					<div className={cls.featuresText}>
						<h5 className={cls.featuresTitle}>Только оригинальные товары</h5>
						<p className={cls.featuresDesc}>
							Гарантированная подлинность Nike и высокое качество кроссовок.
						</p>
					</div>
				</div>
				<div className={cls.featuresItem}>
					<Icon
						className={cls.featuresImg}
						Svg={featuresIcon2}
						width={40}
						height={36}
					/>
					<div className={cls.featuresText}>
						<h5 className={cls.featuresTitle}>Профессиональный сервис</h5>
						<p className={cls.featuresDesc}>
							Команда экспертов, готовых помочь с выбором размера ответить на
							все вопросы.
						</p>
					</div>
				</div>
				<div className={cls.featuresItem}>
					<Icon
						className={cls.featuresImg}
						Svg={featuresIcon3}
						width={34}
						height={36}
					/>
					<div className={cls.featuresText}>
						<h5 className={cls.featuresTitle}>Эксклюзивный выбор</h5>
						<p className={cls.featuresDesc}>
							Богатый ассортимент оригинальных моделей Nike, включая редкие
							выпуски.
						</p>
					</div>
				</div>
			</div>

		</div>
	);
});
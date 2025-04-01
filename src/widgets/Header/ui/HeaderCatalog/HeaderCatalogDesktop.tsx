import React, { memo, useMemo } from 'react';
import cls from './HeaderCatalogDesktop.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { getHeaderCategories } from '../../model/selectors/getHeaderCategories.ts';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { Banner } from '@/shared/ui/Banner/Banner.tsx';
import { getRouteMain } from '@/shared/const/router.ts';
import bannerImg from '@/shared/assets/images/header-banner.jpg';
import { motion } from 'motion/react';
import { useAppMedia } from '@/shared/hooks/useAppMedia/useAppMedia.tsx';

const HeaderCatalogDesktop = memo(() => {
	const headerCategoryList = getHeaderCategories();
	const { isMedia992 } = useAppMedia();

	const catalogList = useMemo(() =>
		headerCategoryList.map((category, i) =>
				category.accordion && (
					<div key={i} className={cls.categoryCol}>
						<div className={cls.categoryTitle}>
							{category.title}
						</div>
						{category.items?.map((item, i) => (
							<AppLink
								key={i}
								to={item.path}
								className={cls.categoryItem}
							>
								{item.text}
							</AppLink>
						))}
					</div>
				)
		), [headerCategoryList]
	);

	return (
		<div className={classNames(cls.HeaderCatalogWrapper, {}, [cls.desktop])}>
			<motion.div
				className={cls.headerCatalog}
				initial={{ y: -500 }}
				animate={{ y: 0, transition: { duration: 0.5, type: 'spring' } }}
				exit={{ y: -500, transition: { duration: 0.5, type: 'spring' } }}
			>
				<div className={cls.list}>
					<div className={cls.categoryList}>{catalogList}</div>
					{isMedia992 &&
						<Banner
							width={440}
							title={'Новая коллекция в каталоге Nike Air Max Solo'}
							imgUrl={bannerImg}
							pathText={'Перейти в каталог'}
							path={getRouteMain()}
							darken={false}
						/>
					}
				</div>
			</motion.div>
		</div>
	);
});

export default HeaderCatalogDesktop;
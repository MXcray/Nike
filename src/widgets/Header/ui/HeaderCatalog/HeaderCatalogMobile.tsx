import React, { memo, useMemo } from 'react';
import cls from './HeaderCatalogMobile.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import { getHeaderCategories } from '../../model/selectors/getHeaderCategories.ts';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink.tsx';
import { Banner } from '../../../../shared/ui/Banner/Banner.tsx';
import { getRouteMain } from '../../../../shared/const/router.ts';
import bannerImg from '../../../../shared/assets/images/header-banner.jpg';
import { motion } from 'motion/react';
import { useAppMedia } from '../../../../shared/hooks/useAppMedia/useAppMedia.tsx';
import { Accordion } from '../../../../shared/ui/Accordion/Accordion.tsx';
import { HeaderSearch } from '../HeaderSearch/HeaderSearch.tsx';
import { Button } from '../../../../shared/ui/Button/Button.tsx';
import Bag from '../../../../shared/assets/icons/bag.svg?react';
import Like from '../../../../shared/assets/icons/like.svg?react';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';

const HeaderCatalogMobile = memo(() => {
	let favoritesCount;
	// eslint-disable-next-line prefer-const
	// favoritesCount = 5;
	const cartCount= 7;

	return (
		<div className={classNames(cls.HeaderCatalogWrapper, {}, [cls.mobile])}>
			<HeaderSearch />
			<div className={cls.buttons}>
				<div className={cls.auth}>Вход \ Регистрация</div>
				<div className={cls.icons}>
					<AppLink className={cls.btn} to={getRouteMain()}>
						<Icon Svg={Like} />
						{favoritesCount && <span>{favoritesCount}</span>}
					</AppLink>
					<AppLink className={cls.btn} to={getRouteMain()}>
						<Icon Svg={Bag} />
						{cartCount && <span>{cartCount}</span>}
					</AppLink>
				</div>
			</div>
			<Accordion title={'Заголовок'} arrowPadding={'max'}>
				<div>123</div>
				<div>312</div>
			</Accordion>
		</div>
	);
});

export default HeaderCatalogMobile;
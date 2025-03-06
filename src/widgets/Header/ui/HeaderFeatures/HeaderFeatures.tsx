import React, { memo, useCallback } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import cls from './HeaderFeatures.module.scss';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';
import SearchIcon from '../../../../shared/assets/icons/search.svg?react';
import LikeIcon from '../../../../shared/assets/icons/like.svg?react';
import BagIcon from '../../../../shared/assets/icons/bag.svg?react';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink.tsx';
import { getRouteMain } from '../../../../shared/const/router.ts';

interface HeaderFeaturesProps {
	searchToggle: () => void;
}

export const HeaderFeatures = memo(({ searchToggle }: HeaderFeaturesProps) => {

	return (
		<div className={classNames(cls.HeaderFeatures, {}, [])}>
			<button className={cls.feature} onClick={searchToggle}>
				<Icon Svg={SearchIcon} />
			</button>
			<AppLink to={getRouteMain()} className={cls.feature}>
				<Icon Svg={LikeIcon} />
			</AppLink>
			<AppLink to={getRouteMain()} className={cls.feature}>
				<Icon Svg={BagIcon} />
			</AppLink>
		</div>
	);
});


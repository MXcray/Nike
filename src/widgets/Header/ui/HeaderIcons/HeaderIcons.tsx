import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './HeaderIcons.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import SearchIcon from '@/shared/assets/icons/search.svg?react';
import LikeIcon from '@/shared/assets/icons/like.svg?react';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { getRouteFavorites, getRouteMain } from '@/shared/const/router.ts';
import { useAppMedia } from '@/shared/hooks/useAppMedia/useAppMedia.tsx';
import { useMediaQuery } from 'react-responsive';
import { HeaderIcon } from '../HeaderIcon/HeaderIcon.tsx';

interface HeaderIconsProps {
	searchToggle: () => void;
	className?: string;
}

export const HeaderIcons = memo(({ searchToggle, className }: HeaderIconsProps) => {
	const { isMedia768  } = useAppMedia();
	const  isMedia600 = useMediaQuery({
		query: '(max-width: 600px)'
	})

	return (
		<div className={classNames(cls.HeaderIcons, {}, [className])}>
			{!isMedia600 &&
				<>
					{!isMedia768 &&
						<HeaderIcon className={cls.iconItem} to={getRouteMain()}>
							<Icon Svg={UserIcon} />
						</HeaderIcon>
					}
					<HeaderIcon className={cls.iconItem} onClick={searchToggle}>
						<Icon Svg={SearchIcon} />
					</HeaderIcon>
				</>
			}
			<HeaderIcon className={cls.iconItem} to={getRouteFavorites()}>
				<Icon Svg={LikeIcon} />
			</HeaderIcon>
			<HeaderIcon className={cls.iconItem} to={getRouteMain()}>
				<Icon Svg={BagIcon} />
			</HeaderIcon>
		</div>
	);
});


import React, { memo, useCallback } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import cls from './HeaderFeatures.module.scss';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';
import SearchIcon from '../../../../shared/assets/icons/search.svg?react';
import LikeIcon from '../../../../shared/assets/icons/like.svg?react';
import BagIcon from '../../../../shared/assets/icons/bag.svg?react';
import UserIcon from '../../../../shared/assets/icons/user.svg?react';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink.tsx';
import { getRouteMain } from '../../../../shared/const/router.ts';
import { useAppMedia } from '../../../../shared/hooks/useAppMedia/useAppMedia.tsx';
import { useMediaQuery } from 'react-responsive';

interface HeaderFeaturesProps {
	searchToggle: () => void;
}

export const HeaderFeatures = memo(({ searchToggle }: HeaderFeaturesProps) => {
	const { isMedia768  } = useAppMedia();
	const  isMedia600 = useMediaQuery({
		query: '(min-width: 600px)'
	})

	return (
		<div className={classNames(cls.HeaderFeatures, {}, [])}>
			{isMedia600 &&
				<>
					{!isMedia768 &&
						<AppLink to={getRouteMain()} className={cls.feature}>
							<Icon Svg={UserIcon} />
						</AppLink>
					}
					<button className={cls.feature} onClick={searchToggle}>
						<Icon Svg={SearchIcon} />
					</button>
				</>
			}
			<AppLink to={getRouteMain()} className={cls.feature}>
				<Icon Svg={LikeIcon} />
			</AppLink>
			<AppLink to={getRouteMain()} className={cls.feature}>
				<Icon Svg={BagIcon} />
			</AppLink>
		</div>
	);
});


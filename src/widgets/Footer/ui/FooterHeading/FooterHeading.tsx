import React, { memo } from 'react';
import cls from './FooterHeading.module.scss';
import { FooterSocials } from '../FooterSocials/FooterSocials.tsx';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';
import Logo from '../../../../shared/assets/icons/footer-logo.svg?react';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink.tsx';
import { getRouteMain } from '../../../../shared/const/router.ts';
import { useAppMedia } from '../../../../shared/hooks/useAppMedia/useAppMedia.tsx';
import { SocialWarning } from '../SocialWarning/SocialWarning.tsx';

interface FooterHeadingProps {
	className?: string;
}

export const FooterHeading = memo((props: FooterHeadingProps) => {
	const {
		className,
	} = props;

	const { isMedia768, isMedia480 } = useAppMedia();

	return (
		<div className={classNames(cls.FooterHeading, {}, [className])}>
			<AppLink className={cls.logoWrapper} to={getRouteMain()}>
				{isMedia768
					? <Icon className={cls.logo} Svg={Logo} width={214} height={42} />
					: <Icon className={cls.logo} Svg={Logo} width={147} height={29} />
				}
			</AppLink>
			<FooterSocials className={cls.socials} />
			{!isMedia768 && <SocialWarning className={cls.warning} />}
		</div>
	);
});

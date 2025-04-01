import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './FooterSocials.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import Instagram from '@/shared/assets/icons/instagram.svg?react';
import Vk from '@/shared/assets/icons/vk.svg?react';
import Twitter from '@/shared/assets/icons/twitter.svg?react';
import { useAppMedia } from '@/shared/hooks/useAppMedia/useAppMedia.tsx';
import { SocialWarning } from '../SocialWarning/SocialWarning.tsx';

interface FooterSocialsProps {
	className?: string;
}

export const FooterSocials = memo((props: FooterSocialsProps) => {
	const {
		className,
	} = props;

	const { isMedia768 } = useAppMedia();

	return (
		<div className={classNames(cls.FooterSocials, {}, [className])}>
			<div className={cls.socialsList}>
				<AppLink className={cls.social} to='https://instagram.com'>
					<Icon className={cls.icon} Svg={Instagram} width={20} height={20} />
				</AppLink>
				<AppLink className={cls.social} to='https://vk.com'>
					<Icon className={cls.icon} Svg={Vk} width={23} height={12} />
				</AppLink>
				<AppLink className={cls.social} to='https://x.com'>
					<Icon className={cls.icon} Svg={Twitter} width={18} height={15} />
				</AppLink>
			</div>
			{isMedia768 && <SocialWarning className={cls.warning} />}
		</div>
	);
});
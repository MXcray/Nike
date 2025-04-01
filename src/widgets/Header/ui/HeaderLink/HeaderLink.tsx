import React, { memo, SyntheticEvent } from 'react';
import { AppLink, AppLinkVariant } from '@/shared/ui/AppLink/AppLink.tsx';
import cls from './HeaderLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HeaderLinkType } from '../../model/types/header.ts';

interface HeaderLinkProps {
	link: HeaderLinkType;
	variant?: AppLinkVariant;
}

export const HeaderLink = memo((props: HeaderLinkProps) => {
	const {
		link,
		variant = 'default',
	} = props

	return (
		<AppLink
			className={classNames(cls.HeaderLink, {}, [])}
			to={link.path}
			variant={variant}
			activeClassName={cls.active}
		>
			<span
				className={classNames(cls.text, {}, [ cls[variant] ])}
			>
				{link.text}
			</span>
		</AppLink>
	);
});

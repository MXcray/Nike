import React, { ReactNode } from 'react';
import { getRouteMain } from '@/shared/const/router.ts';
import cls from './HeaderIcon.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

interface HeaderIconBase {
	className?: string;
	children: ReactNode;
}

interface HeaderIconLink extends HeaderIconBase {
	to: string;
	onClick?: never;
}

interface HeaderIconBtn extends HeaderIconBase {
	onClick: () => void;
	to?: never;
}

type HeaderIconProps = HeaderIconLink | HeaderIconBtn;

export const HeaderIcon = (props: HeaderIconProps) => {
	const {
		className,
		to,
		children,
		onClick,
	} = props;

	if (onClick) {
		return (
			<button
				className={classNames(cls.HeaderIcon, {}, [className])}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}

	if (to) {
		return (
			<AppLink
				className={classNames(cls.HeaderIcon, {}, [className])}
				to={to}
			>
				{children}
			</AppLink>
		);
	}

	return children;
};

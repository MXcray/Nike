import React, { memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'default' | 'medium' | 'bold' | 'extrabold' | 'underline';

interface AppLinkProps extends LinkProps {
	className?: string;
	children?: ReactNode;
	variant?: AppLinkVariant;
	activeClassName?: string
}

export const AppLink = memo((props: AppLinkProps) => {
	const {
		to,
		variant = 'default',
		activeClassName= '',
		className,
		children,
		...otherProps
	} = props;

	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])
			}
			{...otherProps}
		>
			{children}
		</NavLink>
	);
});

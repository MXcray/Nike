import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './Button.module.scss';
import { AppLink } from '../AppLink/AppLink.tsx';
import { Icon } from '../Icon/Icon.tsx';

type ButtonColor = 'black' | 'orange' | 'none';
type ButtonType = 'filled' | 'outline' | 'clear';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
	href?: string;
	icon?: React.FC<React.SVGProps<SVGElement>>;
	iconWidth?: number;
	iconHeight?: number;
	buttonColor?: ButtonColor;
	buttonType?: ButtonType;
	// onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		href,
		icon,
		iconWidth,
		iconHeight,
		buttonColor = 'none',
		buttonType = 'clear',
		...otherProps
	} = props;

	const content = (
		<>
			<div className={cls.text}>{children}</div>
			{icon &&
				<Icon
					Svg={icon}
					width={iconWidth}
					height={iconHeight}
					wrapperClassName={cls.iconWrapper}
					className={cls.icon}
				/>
			}
		</>
	)

	if (href) {
		return (
			<AppLink
				className={classNames(cls.Button, {}, [className, cls[buttonType], cls[buttonColor]])}
				to={href}
			>
				{ content }
			</AppLink>
		);
	}

	return (
		<button
			type='button'
			className={classNames(cls.Button, {}, [className, cls[buttonType], cls[buttonColor]])}
			{...otherProps}
		>
			{ content }
		</button>
	);
};

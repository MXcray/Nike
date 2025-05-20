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
	wrapperClassName?: string;
	iconWidth?: number;
	iconHeight?: number;
	iconPosition?: 'left' | 'right';
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
		wrapperClassName,
		iconWidth,
		iconHeight,
		iconPosition = 'right',
		buttonColor = 'none',
		buttonType = 'clear',
		...otherProps
	} = props;

	const content = (
		<>
			{icon && iconPosition === 'left' &&
				<Icon
					Svg={icon}
					width={iconWidth}
					height={iconHeight}
					wrapperClassName={classNames(cls.iconWrapper, {}, [wrapperClassName])}
					className={cls.icon}
				/>
			}
			<div className={cls.text}>{children}</div>
			{icon && iconPosition === 'right' &&
				<Icon
					Svg={icon}
					width={iconWidth}
					height={iconHeight}
					wrapperClassName={classNames(cls.iconWrapper, {}, [wrapperClassName])}
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

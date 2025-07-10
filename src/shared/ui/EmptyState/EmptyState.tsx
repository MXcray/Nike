import React, { JSX, memo, ReactElement, ReactNode } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './EmptyState.module.scss';
import { Icon } from '../Icon/Icon';

interface EmptyStateProps {
	className?: string;
	title?: string;
	description?: ReactNode;
	icon?: React.FC<React.SVGProps<SVGElement>>;
	action?: ReactNode;
}

export const EmptyState = memo((props: EmptyStateProps) => {
	const {
		className,
		title,
		description,
		icon,
		action,
	} = props;

	return (
			<div className={classNames(cls.EmptyState, {}, [className])}>
				<div className={cls.content}>
				{icon && (
					<Icon
						Svg={icon}
						height={86}
						width={'auto'}
					/>
				)}
					<h3 className={cls.title}>{title}</h3>
					{description && (
						<div className={cls.description}>{description}</div>
					)}

				{action && (
					<div className={cls.action}>
						{action}
					</div>
				)}
				</div>
			</div>
	);
});
import React, { memo } from 'react';
import { AppLink, AppLinkVariant } from '../../../../shared/ui/AppLink/AppLink.tsx';
import cls from './HeaderCategory.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import { HeaderCategoryType } from '../../model/types/header.ts';

interface HeaderCategoryProps {
	category: HeaderCategoryType;
	variant?: AppLinkVariant;
}

export const HeaderCategory = memo((props: HeaderCategoryProps) => {
	const {
		category,
		variant = 'bold',
	} = props

	if (!category.accordion) {
		return (
			<AppLink
				className={classNames(cls.HeaderCategory, {}, [])}
				to={category.path}
				variant={variant}
			>
				<span
					className={classNames(cls.text, {}, [ cls[variant] ])}
				>
					{category.title}
				</span>
			</AppLink>
		);
	}

	HeaderCategory.prototype = 'HeaderCategory';
});

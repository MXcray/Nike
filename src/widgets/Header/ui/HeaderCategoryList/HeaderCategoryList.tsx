import React, { useCallback, useMemo } from 'react';
import { HeaderCategoryType } from '../../model/types/header';
import { motion } from 'motion/react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { HeaderCategory } from '../HeaderCategory/HeaderCategory.tsx';
import { HeaderCatalogBtn } from '../HeaderCatalogBtn/HeaderCatalogBtn.tsx';
import cls from	'./HeaderCategoryList.module.scss';

interface HeaderCategoryListProps {
	className?: string;
	categories: HeaderCategoryType[];
	collapsed: boolean;
	onCollapsed: () => void;
}

export const HeaderCategoryList = (props: HeaderCategoryListProps) => {
	const { className, categories, collapsed, onCollapsed } = props;

	// Используем useCallback для создания стабильной функции рендера категории
	const renderCategory = useCallback((category: HeaderCategoryType, index: number) => (
		<HeaderCategory key={category.title || index} category={category} variant={'bold'} />
	), []);

	// Мемоизируем список категорий с использованием стабильной функции рендера
	const categoryList = useMemo(() => (
		categories.map(renderCategory)
	), [categories, renderCategory]);

	return (
		<motion.div
			key="category-list"
			className={classNames(cls.HeaderCategoryList, {}, [className])}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { duration: 0.3 }
			}}
			exit={{
				opacity: 0,
				transition: { duration: 0.3 }
			}}
		>
			<HeaderCatalogBtn onClick={onCollapsed} collapsed={collapsed} />
			{categoryList}
		</motion.div>
	);
};
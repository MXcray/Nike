import React, { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import cls from './HeaderBottom.module.scss';
import { AppLogo } from '../../../../shared/ui/AppLogo/AppLogo.tsx';
import { getHeaderCategories } from '../../model/selectors/getHeaderCategories.ts';
import { HeaderCatalog } from '../HeaderCatalog/HeaderCatalog.tsx';
import { HeaderFeatures } from '../HeaderFeatures/HeaderFeatures.tsx';
import { HeaderSearch } from '../HeaderSearch/HeaderSearch.tsx';
import { AnimatePresence, motion } from 'motion/react';
import { HeaderCategoryList } from '../HeaderCategoryList/HeaderCategoryList.tsx';
import { useAppMedia } from '../../../../shared/hooks/useAppMedia/useAppMedia.tsx';

interface HeaderBottomProps {
	menuCollapsed?: boolean;
}

export const HeaderBottom = () => {
	// получаем категории один раз при монтировании компонента
	const headerCategoryList = useMemo(() => getHeaderCategories(), []);
	const [menuCollapsed, setMenuCollapsed] = useState(true);
	const [isSearched, setIsSearched] = useState(false);

	const searchToggle = useCallback(() => {
		setIsSearched(prev => !prev);
	}, [])

	const onCollapsed = useCallback(() => {
		setMenuCollapsed((prev) => !prev);
	}, []);

	return (
		<div className={cls.HeaderBottom}>
			<div className={cls.headerDefaultContent}>
				<AppLogo className={cls.logo} wrapperClassName={cls.logoWrapper} />
				{/*TODO Вынести логику categoryList в отдельный компонент */}
				<div className={cls.categoryList}>
					<AnimatePresence mode={'wait'}>
						{isSearched
							? <HeaderSearch key="search" className={cls.search} />
							: <HeaderCategoryList
								key="categories"
								className={cls.categories}
								categories={headerCategoryList}
								collapsed={menuCollapsed}
								onCollapsed={onCollapsed}
							/>
						}
					</AnimatePresence>
				</div>
				<HeaderFeatures searchToggle={searchToggle} />

			</div>
			{/*Todo Сделать Loader*/}
			<AnimatePresence>
				{!menuCollapsed && <HeaderCatalog />}
			</AnimatePresence>
		</div>
	);
};
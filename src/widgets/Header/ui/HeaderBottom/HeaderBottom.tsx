import React, { useCallback, useMemo, useState } from 'react';
import cls from './HeaderBottom.module.scss';
import { AppLogo } from '../../../../shared/ui/AppLogo/AppLogo.tsx';
import { getHeaderCategories } from '../../model/selectors/getHeaderCategories.ts';
import { HeaderCatalog } from '../HeaderCatalog/HeaderCatalog.tsx';
import { HeaderIcons } from '../HeaderIcons/HeaderIcons.tsx';
import { HeaderSearch } from '../HeaderSearch/HeaderSearch.tsx';
import { AnimatePresence, motion } from 'motion/react';
import { HeaderCategoryList } from '../HeaderCategoryList/HeaderCategoryList.tsx';
import { getIsHeaderMenuOpened, UIActions } from '../../../../features/UI';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch/useAppDispatch.ts';

export const HeaderBottom = () => {
	// получаем категории один раз при монтировании компонента
	const headerCategoryList = useMemo(() => getHeaderCategories(), []);
	const isHeaderMenuOpened = useSelector(getIsHeaderMenuOpened);
	const [isSearched, setIsSearched] = useState(false);
	const dispatch = useAppDispatch();

	const searchToggle = useCallback(() => {
		setIsSearched(prev => !prev);
	}, [])

	const onClose = useCallback(() => {
		dispatch(UIActions.toggleHeaderMenu());
	}, [dispatch]);

	return (
		<div className={cls.HeaderBottom}>
			<div className={cls.headerDefaultContent}>
				<AppLogo className={cls.logo} wrapperClassName={cls.logoWrapper} />
				{/*TODO Вынести логику categoryList в отдельный компонент */}
				<div className={cls.categoryList}>
					<AnimatePresence mode={'wait'}>
						{isSearched
							? <HeaderSearch key="search" className={cls.search} autofocus />
							: <HeaderCategoryList
								key="categories"
								className={cls.categories}
								categories={headerCategoryList}
								isHeaderMenuOpened={isHeaderMenuOpened}
								onClose={onClose}
							/>
						}
					</AnimatePresence>
				</div>
				<HeaderIcons className={cls.icons} searchToggle={searchToggle} />

			</div>
			{/*Todo Сделать Loader*/}
			<AnimatePresence>
				{isHeaderMenuOpened && <HeaderCatalog onClose={onClose} />}
			</AnimatePresence>
		</div>
	);
};
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import cls from './HeaderCatalogMobile.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import { getHeaderCategories } from '../../model/selectors/getHeaderCategories.ts';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink.tsx';
import { getRouteMain } from '../../../../shared/const/router.ts';
import { Accordion } from '../../../../shared/ui/Accordion/Accordion.tsx';
import { HeaderSearch } from '../HeaderSearch/HeaderSearch.tsx';
import Bag from '../../../../shared/assets/icons/bag.svg?react';
import Like from '../../../../shared/assets/icons/like.svg?react';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';
import { HeaderIcon } from '../HeaderIcon/HeaderIcon.tsx';
import Close from '../../../../shared/assets/icons/close.svg?react';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch/useAppDispatch.ts';
import { UIActions } from '../../../../features/UI';
import { getHeaderLinks } from '../../model/selectors/getHeaderLinks.ts';
import Search from '../../../../shared/assets/icons/search.svg?react';
import { motion } from 'motion/react';

interface HeaderCatalogMobile {
	onClose: () => void;
}

const HeaderCatalogMobile = memo(({ onClose }: HeaderCatalogMobile) => {
	const dispatch = useAppDispatch();
	const categories = getHeaderCategories();
	const links = getHeaderLinks();
	const catalogRef = useRef<HTMLDivElement>(null);

	let favoritesCount;
	const cartCount = 7;

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
			dispatch(UIActions.toggleHeaderMenu());
		}
	}, [dispatch]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside, dispatch]);

	const renderCategories = () => (
		categories.map((category, i) => {
			if (category.accordion)  {
				return (
					<Accordion
						className={cls.accordion}
						title={category.title}
						titleClassName={cls.categoryTitle}
						key={category.title}
						arrowPadding={'max'}
					>
						{category.items.map((categoryItem, i) => {
							return (
								<AppLink
									to={categoryItem.path}
									className={cls.categoryItem}
									key={categoryItem.text}
								>
									{categoryItem.text}
								</AppLink>
							);
						})}
					</Accordion>
				);
			} else {
				return (
					<AppLink
						to={category.path}
						className={`${cls.categoryTitle} ${cls.categoryTitleNoAccordion}`}
					>
						{category.title}
					</AppLink>
				);
			}
		})
	)

	const renderLinks = () => (
		links.map((link) => <AppLink key={link.text} className={cls.linkItem} to={link.path}>{link.text}</AppLink>)
	)

	return (
		<motion.div
			ref={catalogRef}
			className={classNames(cls.HeaderCatalogWrapper, {}, [cls.mobile])}
			initial={{ x: -300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -300, opacity: 0 }}
			transition={{
				type: 'spring',
				bounce: 0,
				duration: 0.3,
			}}
		>
			<div className={cls.catalogContent}>

				<div className={cls.searchWrapper}>
					<HeaderSearch className={cls.search} disableAnimation autofocus={false}/>
					<Icon wrapperClassName={cls.searchIcon} Svg={Search}/>
				</div>

				<div className={cls.buttons}>
					<div className={cls.auth}>Вход \ Регистрация</div>
					<div className={cls.icons}>
						<HeaderIcon className={cls.btn} to={getRouteMain()}>
							<Icon Svg={Like} />
							{favoritesCount && <span>{favoritesCount}</span>}
						</HeaderIcon>
						<HeaderIcon className={cls.btn} to={getRouteMain()}>
							<Icon Svg={Bag} />
							{cartCount && <span>{cartCount}</span>}
						</HeaderIcon>
					</div>
				</div>

				<div className={cls.catalog}>
					<p className={cls.catalogHeading}>Каталог</p>
					{renderCategories()}
				</div>

				<div className={cls.linkList}>
					{renderLinks()}
				</div>

			</div>
			<Icon
				wrapperClassName={cls.close}
				Svg={Close}
				clickable
				onClick={onClose}
			/>
		</motion.div>
	);
});

export default HeaderCatalogMobile;
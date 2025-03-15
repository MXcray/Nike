import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import cls from './HeaderSearch.module.scss';

interface HeaderSearchProps {
	className?: string;
	disableAnimation?: boolean;
	autofocus?: boolean;
}

export const HeaderSearch = ( props: HeaderSearchProps ) => {
	const { className, disableAnimation, autofocus  } = props;

	const animationSettings = disableAnimation
		? {}
		: {
			initial: { width: 0 },
			animate: {
				width: '100%',
				transition: { duration: 0.3 },
			},
			exit: {
				width: 0,
				transition: { duration: 0.3 },
			},
		};

	return (
		<motion.input
			autoFocus={autofocus}
			key="search-input"
			className={classNames(cls.HeaderSearch, {}, [className])}
			placeholder={'Поиск по каталогу товаров...'}
			{...animationSettings}
		/>
	);
};

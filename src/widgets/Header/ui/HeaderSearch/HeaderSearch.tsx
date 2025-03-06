import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import cls from './HeaderSearch.module.scss';

interface HeaderSearchProps {
	className?: string;
}

export const HeaderSearch = ( props: HeaderSearchProps ) => {
	const { className  } = props;

	return (
		<motion.input
			autoFocus
			key="search-input"
			className={classNames(cls.HeaderSearch, {}, [className])}
			initial={{ width: 0 }}
			animate={{
				width: '100%',
				transition: { duration: 0.3 },
			}}
			exit={{
				width: 0,
				transition: { duration: 0.3 },
			}}
			placeholder={'Поиск по каталогу товаров...'}
		/>
	);
};

import React, { memo, useMemo } from 'react';
import { getHeaderLinks } from '../../model/selectors/getHeaderLinks.ts';
import { HeaderLink } from '../HeaderLink/HeaderLink.tsx';
import cls from './HeaderTop.module.scss';

export const HeaderTop = memo(() => {
	const headerLinksList = getHeaderLinks();

	const linkList = useMemo(() => (
		headerLinksList.map((link, i) => (
		 <HeaderLink key={i} link={link} variant={'default'} />
		))
	), [headerLinksList])

	return (
		<div className={cls.HeaderTop}>
			<div className={cls.wrapper}>
				<div className={cls.list}>{linkList}</div>
				<div className={cls.sign}>Вход/регистрация</div>
			</div>
		</div>
	);
});


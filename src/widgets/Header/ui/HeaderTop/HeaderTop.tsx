import React, { memo, useMemo } from 'react';
import { getHeaderLinks } from '../../model/selectors/getHeaderLinks.ts';
import { HeaderLink } from '../HeaderLink/HeaderLink.tsx';
import cls from './HeaderTop.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { getRouteAuth } from '@/shared/const/router.ts';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User/index.ts';
import { getUserInited } from '@/entities/User/selectors/getUserInited/getUserInited.ts';
import { div } from 'motion/react-client';

export const HeaderTop = memo(() => {

	const userData = useSelector(getUserAuthData);
	const isInited = useSelector(getUserInited);
	const headerLinksList = getHeaderLinks();

	console.log(isInited);

	const linkList = useMemo(() => (
		headerLinksList.map((link, i) => (
		 <HeaderLink key={i} link={link} variant={'default'} />
		))
	), [headerLinksList])


	return (
		<div className={cls.HeaderTop}>
			<div className={cls.wrapper}>
				<div className={cls.list}>{linkList}</div>
				<div className={cls.sign}>
					{!isInited ? (
					<AppLink to={getRouteAuth()}>Вход/регистрация</AppLink>
					) : (
						<div>{userData?.name}</div>
					)
				}
				</div>
			</div>
		</div>
	);
});


import React, { memo, useCallback, useMemo } from 'react';
import { getHeaderLinks } from '../../model/selectors/getHeaderLinks';
import { HeaderLink } from '../HeaderLink/HeaderLink.tsx';
import cls from './HeaderTop.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { getRouteLogin, getRouteRegister } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '@/entities/User';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';

export const HeaderTop = memo(() => {

	const dispatch = useAppDispatch();
	const userData = useSelector(getUserAuthData);
	const headerLinksList = getHeaderLinks();

	const linkList = useMemo(() => (
		headerLinksList.map((link, i) => (
		 <HeaderLink key={i} link={link} variant={'default'} />
		))
	), [headerLinksList])


	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch])

	return (
		<div className={cls.HeaderTop}>
			<div className={cls.wrapper}>
				<div className={cls.list}>{linkList}</div>
				<div className={cls.sign}>
					{userData ? (
						<>
							<div style={{ display: 'inline', paddingRight: '10px' }}>{userData?.name}</div>
							<Button style={{ display: 'inline' }} onClick={onLogout}>Выйти</Button>
						</>
					) : (
						<>
						<AppLink to={getRouteLogin()}>Вход</AppLink>
						<span> \ </span>
						<AppLink to={getRouteRegister()}>регистрация</AppLink>
						</>
					)
				}
				</div>
			</div>
		</div>
	);
});


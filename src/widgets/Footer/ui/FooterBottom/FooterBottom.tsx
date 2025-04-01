import React, { memo } from 'react';
import cls from './FooterBottom.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { getRouteMain } from '@/shared/const/router.ts';
import DevIcon from '@/shared/assets/icons/dev-logo.png';

export const FooterBottom = memo(() => {
	return (
		<div className={cls.FooterBottom}>
			<div className={cls.content}>
				<p className={cls.copy}>© 2023 - Swoosh Store - Интернет-магазин ориганальных кроссовок</p>
				<AppLink className={cls.policy} to={getRouteMain()}>Политика конфиденциальности</AppLink>
				<AppLink className={cls.logo} to={getRouteMain()}>
					<img src={DevIcon} alt="dev-logo" />
				</AppLink>
			</div>
		</div>
	);
});

import cls from './FooterContentMobile.module.scss';
import { memo } from 'react';
import { getHeaderLinks } from '../../../Header/model/selectors/getHeaderLinks.ts';
import { getHeaderCategories } from '../../../Header/model/selectors/getHeaderCategories.ts';
import { getRouteMain } from '../../../../shared/const/router.ts';
import { HeaderLinkType } from '../../../Header/model/types/header.ts';
import { FooterContentItemMobile } from '../FooterContentItem/FooterContentItemMobile.tsx';

export const FooterContentMobile = memo(() => {

	const linksList = getHeaderLinks()
		.filter((item) => item.text != 'Индивидуальный заказ');
	const categoryList = getHeaderCategories();
	const featureList: HeaderLinkType[] = [
		{
			text: 'Личный кабинет',
			path: getRouteMain(),
		},
		{
			text: 'Избранное',
			path: getRouteMain(),
		},
		{
			text: 'Корзина',
			path: getRouteMain(),
		},
	]

	return (
		<div className={cls.content}>
			<FooterContentItemMobile title={'Информация'} items={linksList}/>
			<FooterContentItemMobile title={'Товары'} items={categoryList}/>
			<FooterContentItemMobile title={'Магазин'} items={featureList}/>
		</div>
	);
});
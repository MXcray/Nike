import cls from './FooterContent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { memo, useEffect } from 'react';
import { getHeaderLinks } from '@/widgets/Header/model/selectors/getHeaderLinks.ts';
import { FooterContentItemDesktop } from '../FooterContentItem/FooterContentItemDesktop.tsx';
import { getHeaderCategories } from '@/widgets/Header/model/selectors/getHeaderCategories.ts';
import { getRouteMain } from '@/shared/const/router.ts';
import { HeaderLinkType } from '@/widgets/Header/model/types/header.ts';

interface FooterContentDesktopProps {
	className?: string;
}

export const FooterContentDesktop = memo((props: FooterContentDesktopProps) => {
	const {
		className,
	} = props;

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
			<>
				<FooterContentItemDesktop title={'Информация'} items={linksList}/>
				<FooterContentItemDesktop title={'Товары'} items={categoryList}/>
				<FooterContentItemDesktop title={'Магазин'} items={featureList}/>
			</>
	);
});
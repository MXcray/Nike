import { HeaderLinkType } from '../types/header.ts';
import {
	getRouteAbout,
	getRouteBlog, getRouteCatalog, getRouteContacts,
	getRouteDelivery, getRouteIndividualOrder,
	getRoutePayment,
} from '@/shared/const/router.ts';

export const getHeaderLinks = () => {
	const headerLinksList: HeaderLinkType[] = [
		{
			text: 'О магазине',
			path: getRouteAbout(),
		},
		{
			text: 'Наш блог',
			path: getRouteBlog(),
		},
		{
			text: 'Доставка',
			path: getRouteDelivery(),
		},
		{
			text: 'Оплата',
			path: getRoutePayment(),
		},
		{
			text: 'Контакты',
			path: getRouteContacts(),
		},
		{
			text: 'Индивидуальный заказ',
			path: getRouteCatalog(),
		},
	]

	return headerLinksList;
}
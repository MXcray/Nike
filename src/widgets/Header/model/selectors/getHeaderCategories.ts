import { HeaderCategoryType } from '../types/header.ts';
import { getRouteMain } from '../../../../shared/const/router.ts';

const headerCategoriesList: HeaderCategoryType[] = [
	{
		accordion: true,
		title: 'Лето',
		items: [
			{
				text: 'Для бега',
				path: getRouteMain(),
			},
			{
				text: 'Повседневная',
				path: getRouteMain(),
			},
			{
				text: 'Треккинговая',
				path: getRouteMain(),
			},
			{
				text: 'Для футбола',
				path: getRouteMain(),
			},
			{
				text: 'Для волейбола',
				path: getRouteMain(),
			},
			{
				text: 'Для баскетбола',
				path: getRouteMain(),
			},
			{
				text: 'Для тенниса',
				path: getRouteMain(),
			},
			{
				text: 'Для водных видов спорта',
				path: getRouteMain(),
			},
			{
				text: 'Спортивный',
				path: getRouteMain(),
			},{
				text: 'Для бега',
				path: getRouteMain(),
			},
		]
	},
	{
		accordion: true,
		title: 'Демисезон',
		items: [
			{
				text: 'Для бега',
				path: getRouteMain(),
			},
			{
				text: 'Повседневная',
				path: getRouteMain(),
			},
			{
				text: 'Треккинговая',
				path: getRouteMain(),
			},
			{
				text: 'Кожаные',
				path: getRouteMain(),
			},
		]
	},
	{
		accordion: true,
		title: 'Зима',
		items: [
			{
				text: 'Утепленные',
				path: getRouteMain(),
			},
			{
				text: 'Повседневная',
				path: getRouteMain(),
			},
			{
				text: 'Кожаные',
				path: getRouteMain(),
			},
		]
	},
	{
		accordion: true,
		title: 'Коллекции',
		items: [
			{
				text: 'Коллекция 1',
				path: getRouteMain(),
			},
			{
				text: 'Коллекция 2',
				path: getRouteMain(),
			},
			{
				text: 'Коллекция 3',
				path: getRouteMain(),
			},
			{
				text: 'Коллекция 4',
				path: getRouteMain(),
			},
			{
				text: 'Коллекция 5',
				path: getRouteMain(),
			},
		]
	},
	{
		title: 'Мужские',
		path: getRouteMain(),
	},
	{
		title: 'Женские',
		path: getRouteMain(),
	},
	{
		title: 'Детские',
		path: getRouteMain(),
	},
	{
		title: 'Распродажа',
		path: getRouteMain(),
	},
]

export const getHeaderCategories = () => headerCategoriesList;
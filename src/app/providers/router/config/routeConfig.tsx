import React from 'react';
import {
	AppRoutes,
	getRouteAbout,
	getRouteBlog,
	getRouteCatalog, getRouteContacts, getRouteDelivery, getRouteIndividualOrder,
	getRouteMain, getRoutePayment,
} from '@/shared/const/router.ts';
import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { ProductsPage } from '@/pages/ProductsPage';

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	[AppRoutes.CATALOG]: {
		path: getRouteCatalog(),
		element: <ProductsPage/>,
	},
	[AppRoutes.ABOUT]: {
		path: getRouteAbout(),
		element: <div>getRouteAbout</div>
	},
	[AppRoutes.BLOG]: {
		path: getRouteBlog(),
		element: <div>getRouteBlog</div>
	},
	[AppRoutes.DELIVERY]: {
		path: getRouteDelivery(),
		element: <div>getRouteDelivery</div>
	},
	[AppRoutes.PAYMENT]: {
		path: getRoutePayment(),
		element: <div>getRoutePayment</div>
	},
	[AppRoutes.CONTACTS]: {
		path: getRouteContacts(),
		element: <div>getRouteContacts</div>
	},
	[AppRoutes.INDIVIDUAL_ORDER]: {
		path: getRouteIndividualOrder(),
		element: <div>getRouteIndividualOrder</div>
	},

	// last
	[AppRoutes.NOT_FOUND]: {
		path: '*',
		element: <div>not found</div>
	}
};


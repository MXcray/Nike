import React from 'react';
import {
	AppRoutes,
	getRouteAbout, getRouteAuth,
	getRouteBlog,
	getRouteCatalog, getRouteContacts, getRouteDelivery, getRouteIndividualOrder,
	getRouteMain, getRoutePayment, getRouteProfile,
} from '@/shared/const/router.ts';
import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { AuthPage } from '@/pages/AuthPage/ui/AuthPage/AuthPage.tsx';
import { ProfilePage } from '@/pages/ProfilePage/ui/ProfilePage.tsx';

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	[AppRoutes.AUTH]: {
		path: getRouteAuth(),
		element: <AuthPage />,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(),
		element: <ProfilePage/>
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


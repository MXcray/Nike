import React from 'react';
import {
	AppRoutes,
	getRouteAbout, getRouteAuth,
	getRouteBlog,
	getRouteCatalog, getRouteContacts, getRouteDelivery, getRouteFavorites, getRouteIndividualOrder,
	getRouteMain, getRoutePayment, getRouteProfile,
} from '@/shared/const/router.ts';
import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { AuthPage } from '@/pages/AuthPage';
import { ProfilePage } from '@/pages/ProfilePage';

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
	[AppRoutes.FAVORITES]: {
		path: getRouteFavorites(),
		element: <FavoritesPage/>,
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


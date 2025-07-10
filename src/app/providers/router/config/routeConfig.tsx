import React from 'react';
import {
	AppRoutes,
	getRouteAbout,
	getRouteBlog,
	getRouteCatalog, getRouteContacts, getRouteDelivery, getRouteFavorites, getRouteIndividualOrder, getRouteLogin,
	getRouteMain, getRoutePayment, getRouteProductDetails, getRouteProfile, getRouteRegister,
} from '@/shared/const/router.ts';
import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { LoginPage } from '@/pages/LoginPage';

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	[AppRoutes.LOGIN]: {
		path: getRouteLogin(),
		element: <LoginPage />,
	},
	[AppRoutes.REGISTER]: {
		path: getRouteRegister(),
		element: <RegisterPage />,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(),
		element: <ProfilePage/>
	},
	[AppRoutes.CATALOG]: {
		path: getRouteCatalog(),
		element: <ProductsPage/>,
	},
	[AppRoutes.PRODUCT_DETAILS]: {
		path: getRouteProductDetails(':id'),
		element: <ProductDetailsPage/>,
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


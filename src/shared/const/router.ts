export enum AppRoutes {
	MAIN = 'main',
	AUTH = 'auth',
	PROFILE = 'profile',
	CATALOG = 'catalog',
	FAVORITES = 'favorites',
	ABOUT = 'about',
	BLOG = 'blog',
	DELIVERY = 'delivery',
	PAYMENT = 'payment',
	CONTACTS = 'contacts',
	INDIVIDUAL_ORDER = 'individual_order',

	// last
	NOT_FOUND ='not_found'
}

export const getRouteMain = () => '/';
export const getRouteAuth = () => '/auth';
export const getRouteProfile = () => '/profile';
export const getRouteCatalog = () => '/catalog';
export const getRouteFavorites = () => '/favorites';
export const getRouteAbout = () => '/about';
export const getRouteBlog = () => '/blog';
export const getRouteDelivery = () => '/delivery';
export const getRoutePayment = () => '/payment';
export const getRouteContacts = () => '/contacts';
export const getRouteIndividualOrder = () => '/individual_order';
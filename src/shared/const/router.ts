export enum AppRoutes {
	MAIN = 'main',
	LOGIN = 'login',
	REGISTER = 'register',
	PROFILE = 'profile',
	CATALOG = 'catalog',
	PRODUCT_DETAILS = 'article_details',
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
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';
export const getRouteProfile = () => '/profile';
export const getRouteCatalog = () => '/catalog';
export const getRouteProductDetails = (id: string) => `/product/${id}`;
export const getRouteFavorites = () => '/favorites';
export const getRouteAbout = () => '/about';
export const getRouteBlog = () => '/blog';
export const getRouteDelivery = () => '/delivery';
export const getRoutePayment = () => '/payment';
export const getRouteContacts = () => '/contacts';
export const getRouteIndividualOrder = () => '/individual_order';
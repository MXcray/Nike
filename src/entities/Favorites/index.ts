import { getFavoriteProductsData } from './model/selectors/getFavoriteProductsData';
import { getFavoriteProductsError } from './model/selectors/getFavoriteProductsError';
import { getFavoriteProductsIsLoading } from './model/selectors/getFavoriteProductsIsLoading';
import { getTotalFavorites } from './model/selectors/getTotalFavorites';
import { addToFavorites } from './model/services/addToFavorites/addToFavorites';
import { initFavorites } from './model/services/initFavorites/initFavorites';
import { removeFromFavorites } from './model/services/removeFromFavorites/removeFromFavorites';
import { favoriteReducer, favoriteActions } from './model/slices/favoriteSlice';
import { FavoriteProducts, FavoriteProductSchema } from './model/types/favorites';


export {
	type FavoriteProducts,
	type FavoriteProductSchema,
	favoriteReducer,
	favoriteActions,
	getTotalFavorites,
	getFavoriteProductsData,
	getFavoriteProductsError,
	getFavoriteProductsIsLoading,
	initFavorites,
	addToFavorites,
	removeFromFavorites
}
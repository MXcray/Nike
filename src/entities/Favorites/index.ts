import { getFavoriteProductsData } from './model/selectors/getFavoriteProductsData';
import { getFavoriteProductsError } from './model/selectors/getFavoriteProductsError';
import { getFavoriteProductsIds } from './model/selectors/getFavoriteProductsIds';
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
	getFavoriteProductsIds,
	getFavoriteProductsError,
	getFavoriteProductsIsLoading,
	initFavorites,
	addToFavorites,
	removeFromFavorites
}
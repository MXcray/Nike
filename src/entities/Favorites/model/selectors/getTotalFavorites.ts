import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const getTotalFavorites = (state: StateSchema) => {
	return state.favoriteProducts.data?.productId.length || undefined;
};
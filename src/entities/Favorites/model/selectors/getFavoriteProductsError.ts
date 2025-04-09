import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const getFavoriteProductsError = (state: StateSchema) => state.favoriteProducts?.error;
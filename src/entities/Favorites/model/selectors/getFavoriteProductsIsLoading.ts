import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const getFavoriteProductsIsLoading = (state: StateSchema) => state.favoriteProducts?.isLoading || false;
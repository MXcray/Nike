import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const getFavoriteProductsIds = (state: StateSchema) => state.favoriteProducts?.data?.productId || [];
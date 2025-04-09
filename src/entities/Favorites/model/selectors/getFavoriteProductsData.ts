import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const getFavoriteProductsData = (state: StateSchema) => state.favoriteProducts?.data;
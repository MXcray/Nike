import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const getProductsPageNum = (state: StateSchema) => state.productsPage.page || 1;
export const getProductsPageLimit = (state: StateSchema) => state.productsPage.limit || 9;
export const getProductsPageSize = (state: StateSchema) => state.productsPage.size || '45';
export const getProductsPageColor = (state: StateSchema) => state.productsPage.color || 'white';
export const getProductsPageMaterial = (state: StateSchema) => state.productsPage.material || 'кожа';
export const getProductsPageMinPrice = (state: StateSchema) => state.productsPage.minPrice || 3500;
export const getProductsPageMaxPrice = (state: StateSchema) => state.productsPage.maxPrice || 17500;
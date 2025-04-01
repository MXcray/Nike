import {
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { ProductsPageSchema } from '../../model/types/productsPageSchema.ts';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList.ts';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

const productsAdapter = createEntityAdapter<Product, string>({
	selectId: (product) => product.id,
});

export const getProducts = productsAdapter.getSelectors<StateSchema>(
	(state) => state.productsPage || productsAdapter.getInitialState(),
);

const productsPageSlice = createSlice({
	name: 'productsPageSlice',
	initialState: productsAdapter.getInitialState<ProductsPageSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductsList.pending, (state, action) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchProductsList.fulfilled, (state, action) => {
				state.isLoading = false;
				productsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchProductsList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: productsPageReducer } = productsPageSlice;
export const { actions: productsPageActions } = productsPageSlice;

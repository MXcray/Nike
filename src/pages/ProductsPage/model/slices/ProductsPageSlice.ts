import { createSlice } from '@reduxjs/toolkit';
import { ProductsPageSchema } from '../../model/types/productsPageSchema.ts';

const initialState: ProductsPageSchema = {
	isLoading: false,
	error: undefined,
	page: 1,
	limit: 9,
	// hasMore: true,
	size: '45',
	color: 'white',
	minPrice: 3500,
	maxPrice: 17500,
	material: 'кожа',
}

const productsPageSlice = createSlice({
	name: 'productsPageSlice',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setLimit: (state, action) => {
			state.limit = action.payload;
		},
		setSize: (state, action) => {
			state.size = action.payload;
		},
		setColor: (state, action) => {
			state.color = action.payload;
		},
		setMinPrice: (state, action) => {
			state.minPrice = action.payload;
		},
		setMaxPrice: (state, action) => {
			state.maxPrice = action.payload;
		},
		setMaterial: (state, action) => {
			state.material = action.payload;
		},
		resetFilters: (state) => {
			state.size = '45';
			state.color = 'white';
			state.minPrice = 3500;
			state.maxPrice = 17500;
			state.material = 'кожа';
		}
	},
});

export const { reducer: productsPageReducer } = productsPageSlice;
export const { actions: productsPageActions } = productsPageSlice;

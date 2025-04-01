import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '@/entities/Product';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema.ts';

// interface FetchArticlesListProps {
// 	replace?: boolean;
// }

export const fetchProductsList = createAsyncThunk<
	Product[],
	void,
	ThunkConfig<string>
>('productsPage/fetchProductsList', async (props, thunkAPI) => {
	const { extra, rejectWithValue, getState } = thunkAPI;


	try {
		const response = await extra.api.get<Product[]>(`/products`);
		if (!response.data) {
			throw new Error();
		}

		return response.data;
	} catch (e) {
		return rejectWithValue('error');
	}
});

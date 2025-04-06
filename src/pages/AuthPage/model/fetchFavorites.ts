import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '@/entities/Product';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const fetchFavorites = createAsyncThunk<
	any,
	void,
	ThunkConfig<string>
>('AuthPage/fetchFavorites', async (props, thunkAPI) => {
	const { extra, rejectWithValue, getState } = thunkAPI;


	try {
		const response = await extra.api.get<any>(`/favoriteProducts`, {
			params: {
				// userId: userId
			}
		});
		if (!response.data) {
			throw new Error();
		}

		return response.data;
	} catch (e) {
		return rejectWithValue('error');
	}
});

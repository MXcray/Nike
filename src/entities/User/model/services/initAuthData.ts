import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByTokenQuery } from '../../api/userApi';
import { UserData, UserDataDto } from '../types/user';

export const initAuthData = createAsyncThunk<
  UserData,
  void,
  ThunkConfig<string>
>(
	'user/initAuthData',
	async (_, thunkApi) => {
		const { rejectWithValue, dispatch } = thunkApi;

		const token = localStorage.getItem('token');

		if (!token) {
			return rejectWithValue('Нет данных авторизации');
		}

		try {
			const response = await dispatch(getUserDataByTokenQuery()).unwrap();

			return response;
		} catch (e) {
			console.log(e);
			return rejectWithValue('Ошибка получения данных пользователя');
		}
	},
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataDto, UserSchema } from '@/entities/User';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
	_inited: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, { payload }: PayloadAction<UserDataDto>) => {
			state.authData = payload.user;
			state._inited = true;

			localStorage.setItem('token', payload.accessToken);
		},
		logout: (state) => {
			state.authData = undefined;
			state._inited = true;

			localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initAuthData.fulfilled, (state, action) => {
			state.authData = action.payload;
			state._inited = true;
		});
		builder.addCase(initAuthData.rejected, (state) => {
			state._inited = true;
		});
	}
})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
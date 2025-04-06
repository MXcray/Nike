import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';
import { loginByCredentials, registerByEmail, getUserProfile } from '../../api/userApi';

const initialState: UserSchema = {
	_inited: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<any>) => {
			state.authData = action.payload;
		},
		logout: (state) => {
			state.authData = undefined;
		},
		setInited: (state) => {
			state._inited = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginByCredentials.fulfilled, (state, action) => {
				state.authData = action.payload.user;
			})
			.addCase(registerByEmail.fulfilled, (state, action) => {
				state.authData = action.payload.user;
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.authData = action.payload;
				state._inited = true;
			});
	}
})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
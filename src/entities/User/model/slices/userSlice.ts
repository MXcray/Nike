import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, UserSchema } from '@/entities/User';

const initialState: UserSchema = {
	_inited: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, {payload}: PayloadAction<UserData>) => {
			state.authData = payload;

		}
	},
	extraReducers: (builder) => {}
})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
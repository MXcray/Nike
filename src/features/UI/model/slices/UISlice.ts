import { createSlice } from '@reduxjs/toolkit';
import { UISchema } from '../types/UISchema.ts';

const initialState: UISchema = {
	isMenuOpen: false,
};

export const UISlice = createSlice({
	name: 'UI',
	initialState,
	reducers: {
		toggleHeaderMenu: (state) => {
			state.isMenuOpen = !state.isMenuOpen;
		},
	}
})

export const { actions: UIActions} = UISlice;
export const { reducer: UIReducer } = UISlice
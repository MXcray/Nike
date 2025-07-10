import { createSlice } from '@reduxjs/toolkit';
import { loginByEmail } from '../services/loginByEmail';
import { RegisterSchema } from '../types/registerSchema';

const initialState: RegisterSchema = {
    isLoading: false,
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;


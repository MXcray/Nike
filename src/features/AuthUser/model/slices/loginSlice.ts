import { createSlice } from '@reduxjs/toolkit';
import { loginByEmail } from '../services/loginByEmail';

interface LoginSchema {
    isLoading: boolean;
    error?: string;
}

const initialState: LoginSchema = {
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
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

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;


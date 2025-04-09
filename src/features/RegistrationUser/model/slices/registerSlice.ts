import { createSlice } from '@reduxjs/toolkit';
import { registerByEmail } from '../services/registerByEmail';

interface RegisterSchema {
    isLoading: boolean;
    error?: string;
}

const initialState: RegisterSchema = {
    isLoading: false,
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registerByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
}); 

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;

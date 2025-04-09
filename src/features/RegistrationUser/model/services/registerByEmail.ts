import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions, UserDataDto } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import axios from 'axios';

interface RegisterByEmailProps {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
}

export const registerByEmail = createAsyncThunk<
    UserDataDto,
    RegisterByEmailProps,
    ThunkConfig<string>
>(
    'register/registerByEmail',
    async (authData, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<UserDataDto>(`${__API_URL__}/register`, authData);

            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
); 
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions, UserDataDto } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<
    UserDataDto,
    LoginByEmailProps,
    ThunkConfig<string>
>(
    'login/loginByEmail',
    async (authData, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<UserDataDto>(`${__API_URL__}/login`, authData);
            
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
); 
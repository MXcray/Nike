import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../model/types/user';

const API_URL = 'http://localhost:3001';

// Функция для определения типа введенных данных (email или логин)
const isEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const loginByCredentials = createAsyncThunk(
    'user/login',
    async (authData: { username: string; password: string }, thunkAPI) => {
        try {
            // Определяем, является ли введенное значение email или логином
            const isEmailLogin = isEmail(authData.username);
            
            // Формируем данные для запроса в зависимости от типа
            const requestData = isEmailLogin 
                ? { email: authData.username, password: authData.password }
                : { login: authData.username, password: authData.password };
            
            const response = await axios.post(`${API_URL}/login`, requestData);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const registerByEmail = createAsyncThunk(
    'user/register',
    async (authData: { email: string; password: string; login: string; name?: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/register`, authData);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const getUserProfile = createAsyncThunk(
    'user/getProfile',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<User>(`${API_URL}/600/users/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const userApi = {
    async logout() {
        localStorage.removeItem('token');
    },
}; 
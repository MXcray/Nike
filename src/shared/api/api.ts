import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const api = axios.create({
	baseURL: __API_URL__,
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/auth';
		}
		return Promise.reject(error);
	}
)
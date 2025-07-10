import { rtkApi } from '@/shared/api/rtkApi';
import { userActions } from '@/entities/User';
import { useNavigate } from 'react-router-dom';

export interface LoginUserRequest {
	email: string;
	password: string;
}

export interface LoginUserResponse {
	accessToken: string;
	user: {
		id: string;
		email: string;
		name: string;
		phoneNumber: string;
	};
}

export interface ApiErrorResponse {
	code: string;
	message: string;
}


export const loginApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		loginUser: build.mutation<LoginUserResponse, LoginUserRequest>({
			query: (userData) => ({
				url: `/login`,
				method: 'POST',
				body: userData,
			}),
			// invalidatesTags: ['UserData'],

			// async onQueryStarted(arg, { dispatch, queryFulfilled }) {
			// 	try {
			// 		const { data } = await queryFulfilled;
			//
			// 		if (data.accessToken) {
			// 			localStorage.setItem('token', data.accessToken);
			// 		}
			//
			// 		// лучше в компоненте или хуке
			// 		dispatch(userActions.setAuthData(data));
			// 	} catch (error) {
			// 		console.log('LoginApi:', error);
			// 		throw error;
			// 	}
			// },

			transformErrorResponse: (response, meta, arg) => {
				if (response?.data === 'Incorrect password' || response?.data === 'Incorrect email') {
					return {
						message: 'Неверный логин или пароль',
						code: 'INCORRECT_EMAIL_OR_PASSWORD'
					}
				}

				switch (response.status) {
					case 'FETCH_ERROR':
						return {
							message: 'Ошибка соединения с сервером. Проверьте подключение к интернету',
							code: 'FETCH_ERROR'
						};

					case 'TIMEOUT_ERROR':
						return {
							message: 'Превышено время ожидания. Попробуйте еще раз',
							code: 'TIMEOUT_ERROR'
						};

					case 'PARSING_ERROR':
						return {
							message: 'Ошибка обработки ответа сервера',
							code: 'PARSING_ERROR'
						};

					case 'CUSTOM_ERROR':
						return {
							message: 'Произошла ошибка при авторизации',
							code: 'CUSTOM_ERROR'
						};

					default:
						return {
							message: 'Произошла непредвиденная ошибка',
							code: 'UNKNOWN_STRING_ERROR'
						};
				}
			}
		}),
	}),
});

export const { useLoginUserMutation } = loginApi;

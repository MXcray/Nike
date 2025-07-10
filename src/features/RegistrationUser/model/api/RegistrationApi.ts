import { rtkApi } from '@/shared/api/rtkApi';

export interface RegisterUserRequest {
	email: string;
	name: string;
	phoneNumber: string;
	password: string;
}

export interface RegisterUserResponse {
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

const registrationApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		registerUser: build.mutation<RegisterUserResponse, RegisterUserRequest>({
			query: (userData) => ({
				url: `/register`,
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['UserData'],

			transformResponse: (response: RegisterUserResponse) => {
				if (response.accessToken) {
					localStorage.setItem('token', response.accessToken);
				}
				return response;
			},

			transformErrorResponse: (response, meta, arg) => {
				console.log('RegistrationApi error: ', response);

				if (response?.data === 'Email already exists') {
					return {
						message: 'Пользователь с таким email уже существует',
						code: 'EMAIL_ALREADY_EXIST'
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
							message: 'Произошла ошибка при регистрации',
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
		// Дополнительный эндпоинт для проверки доступности email
		checkEmailAvailability: build.query<{ available: boolean }, string>({
			query: (email) => ({
				url: `/users?email=${encodeURIComponent(email.trim().toLowerCase())}`,
				method: 'GET',
			}),
			transformResponse: (response: unknown) => {
				if (Array.isArray(response)) {
					return {
						available: response.length === 0
					}
				} else {
					return {
						available: false
					}
				}
			},
			transformErrorResponse: (response) => {
				return {
					message: 'Не удалось проверить доступность email',
					code: 'CHECK_EMAIL_ERROR'
				};
			},
		}),
	}),
});

// export const getUserDataByTokenQuery =
// 	userApi.endpoints.getUserDataByToken.initiate;

export const {
	useRegisterUserMutation,
	useCheckEmailAvailabilityQuery,
	useLazyCheckEmailAvailabilityQuery,
} = registrationApi;

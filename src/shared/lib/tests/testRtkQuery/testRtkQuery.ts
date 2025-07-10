import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import { vi, MockedFunction } from 'vitest';

// Мокируем fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>;
} : T;
/**
 * @deprecated
 */
export class TestRtkQuery<T extends Record<string, any>> {
	store: ReturnType<typeof configureStore>;
	mockFetch: MockedFunction<any>;
	navigate: MockedFunction<any>;

	constructor(
		apiSlice: T & { reducerPath: string; reducer: any; middleware: any },
		initialState?: DeepPartial<StateSchema>,
	) {
		this.mockFetch = mockFetch;
		this.navigate = vi.fn();

		// Создаем тестовый store с API slice
		this.store = configureStore({
			reducer: {
				[apiSlice.reducerPath]: apiSlice.reducer,
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					thunk: {
						extraArgument: {
							navigate: this.navigate,
						},
					},
				}).concat(apiSlice.middleware),
			preloadedState: initialState,
		});
	}

	// Метод для выполнения mutation запросов
	async executeMutation<TResult, TArg>(
		endpoint: (arg: TArg) => any,
		arg: TArg,
	): Promise<{
		data?: TResult;
		error?: any;
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	}> {
		const mutationAction = endpoint(arg);

		try {
			const result = await this.store.dispatch(mutationAction);

			if ('data' in result) {
				return {
					data: result.data,
					error: undefined,
					isLoading: false,
					isSuccess: true,
					isError: false,
				};
			} else if ('error' in result) {
				return {
					data: undefined,
					error: result.error,
					isLoading: false,
					isSuccess: false,
					isError: true,
				};
			}
		} catch (error) {
			return {
				data: undefined,
				error: error,
				isLoading: false,
				isSuccess: false,
				isError: true,
			};
		}

		return {
			data: undefined,
			error: undefined,
			isLoading: false,
			isSuccess: false,
			isError: false,
		};
	}

	// Метод для выполнения query запросов
	async executeQuery<TResult, TArg>(
		endpoint: (arg: TArg) => any,
		arg: TArg,
	): Promise<{
		data?: TResult;
		error?: any;
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	}> {
		return this.executeMutation(endpoint, arg);
	}

	// Получение текущего состояния store
	getState() {
		return this.store.getState();
	}

	// Мокирование успешного ответа
	mockSuccessResponse(data: any, status: number = 200) {
		this.mockFetch.mockResolvedValueOnce({
			ok: true,
			status,
			statusText: 'OK',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			json: async () => data,
			text: async () => JSON.stringify(data),
			clone: () => ({
				json: async () => data,
				text: async () => JSON.stringify(data),
			}),
		} as Response);
	}

	// Мокирование ошибки
	mockErrorResponse(error: any, status: number = 500) {
		this.mockFetch.mockResolvedValueOnce({
			ok: false,
			status,
			statusText: 'Error',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			json: async () => error,
			text: async () => typeof error === 'string' ? error : JSON.stringify(error),
			clone: () => ({
				json: async () => error,
				text: async () => typeof error === 'string' ? error : JSON.stringify(error),
			}),
		} as Response);
	}

	// Мокирование сетевой ошибки
	mockNetworkError(message: string = 'Network Error') {
		this.mockFetch.mockRejectedValueOnce(new Error(message));
	}

	// Очистка всех моков
	clearMocks() {
		vi.clearAllMocks();
		this.mockFetch.mockClear();
	}
}
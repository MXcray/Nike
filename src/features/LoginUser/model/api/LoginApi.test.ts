import { describe, it, expect, beforeEach } from 'vitest';
import { TestRtkQuery } from '@/shared/lib/tests/testRtkQuery/testRtkQuery';
import { loginApi } from '@/features/LoginUser/model/api/LoginApi';

describe('LoginApi', () => {
	let testRtkQuery: TestRtkQuery<typeof loginApi>;

	beforeEach(() => {
		// Создаем экземпляр утилиты с нужным API slice
		testRtkQuery = new TestRtkQuery(loginApi);
	});

	afterEach(() => {
		// Очищаем моки после каждого теста
		testRtkQuery.clearMocks();
	});

	it('должен успешно авторизовать пользователя', async () => {
		// Мокируем успешный ответ
		const mockResponse = {
			accessToken: 'test-token',
			user: {
				id: '1',
				email: 'test@example.com',
				name: 'Test User',
				phoneNumber: '+1234567890'
			}
		};

		testRtkQuery.mockSuccessResponse(mockResponse);

		// Выполняем mutation
		const result = await testRtkQuery.executeMutation(
			loginApi.endpoints.loginUser.initiate,
			{ email: 'test@example.com', password: 'password123' }
		);
		// Проверяем результат
		expect(result.isSuccess).toBe(true);
		expect(result.data).toEqual(mockResponse);
		expect(result.error).toBeUndefined();
	});

	it('должен обработать ошибку авторизации', async () => {
		// Мокируем ошибку
		testRtkQuery.mockErrorResponse('Incorrect password', 401);

		const result = await testRtkQuery.executeMutation(
			loginApi.endpoints.loginUser.initiate,
			{ email: 'test@example.com', password: 'wrong-password' }
		);

		// Проверяем ошибку
		expect(result.isError).toBe(true);
		expect(result.data).toBeUndefined();
		expect(result.error).toBeDefined();
	});
});
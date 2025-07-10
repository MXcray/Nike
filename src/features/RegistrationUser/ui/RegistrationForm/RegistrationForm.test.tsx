import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationForm } from './RegistrationForm';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender.tsx';

// Мокаем RTK Query хуки
const mockRegisterUser = vi.fn();
const mockRTKQueryResult = {
	isLoading: false,
	error: null,
	isSuccess: false,
};

vi.mock('../../model/api/RegistrationApi', () => ({
	useRegisterUserMutation: () => [mockRegisterUser, mockRTKQueryResult],
	ApiErrorResponse: {}, // Добавляем тип для избежания ошибок импорта
}));

// Валидные тестовые данные
const validFormData = {
	email: 'test@example.com',
	fullName: 'Иван Иванов',
	phone: '+7 (123) 456-78-90',
	password: 'Password123',
	confirmPassword: 'Password123',
};

describe('RegistrationForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockRegisterUser.mockReturnValue({
			unwrap: vi.fn().mockResolvedValue({
				user: { id: '1', email: 'test@example.com' },
				accessToken: 'token123'
			})
		});
		// Сбрасываем состояние RTK Query мока
		Object.assign(mockRTKQueryResult, {
			isLoading: false,
			error: null,
			isSuccess: false,
		});
	});

	describe('Рендеринг компонента', () => {
		test('должен отрендерить все обязательные поля формы', () => {
			componentRender(<RegistrationForm />);

			expect(screen.getByTestId('RegistrationForm.email')).toBeInTheDocument();
			expect(screen.getByTestId('RegistrationForm.name')).toBeInTheDocument();
			expect(screen.getByTestId('RegistrationForm.phone')).toBeInTheDocument();
			expect(screen.getByTestId('RegistrationForm.password')).toBeInTheDocument();
			expect(screen.getByTestId('RegistrationForm.confirmPassword')).toBeInTheDocument();
			expect(screen.getByTestId('RegistrationForm.policy')).toBeInTheDocument();
			expect(screen.getByTestId('RegistrationForm.submitBtn')).toBeInTheDocument();
		});

		test('должен отрендерить форму с правильными атрибутами доступности', () => {
			componentRender(<RegistrationForm />);

			const form = screen.getByTestId('RegistrationForm');
			expect(form).toHaveAttribute('aria-label', 'Форма регистрации');
			expect(form).toHaveAttribute('noValidate');
		});

		test('должен отрендерить кнопку отправки с правильным текстом', () => {
			componentRender(<RegistrationForm />);

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			expect(submitButton).toHaveTextContent('Создать аккаунт');
			expect(submitButton).toHaveAttribute('type', 'submit');
		});
	});

	describe('Валидация полей', () => {
		test('должен показать ошибку для невалидного email', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const emailInput = screen.getByTestId('RegistrationForm.email');
			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');

			await user.type(emailInput, 'invalid-email');
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText('Email адрес заполнен некорректно')).toBeInTheDocument();
			});
		});

		test('должен показать ошибку для пустого поля ФИО', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText('Поле ФИО обязательно для заполнения')).toBeInTheDocument();
			});
		});

		test('должен показать ошибку для невалидного номера телефона', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const phoneInput = screen.getByTestId('RegistrationForm.phone');
			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');

			await user.type(phoneInput, '123456789');
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText('Номер телефона заполнен некорректно')).toBeInTheDocument();
			});
		});

		test('должен показать ошибку для слабого пароля', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const passwordInput = screen.getByTestId('RegistrationForm.password');
			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');

			await user.type(passwordInput, '123');
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText('Пароль должен содержать минимум 6 символов')).toBeInTheDocument();
			});
		});

		test('должен показать ошибку когда пароли не совпадают', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const passwordInput = screen.getByTestId('RegistrationForm.password');
			const confirmPasswordInput = screen.getByTestId('RegistrationForm.confirmPassword');
			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');

			await user.type(passwordInput, 'Password123');
			await user.type(confirmPasswordInput, 'DifferentPassword123');
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument();
			});
		});

		test('должен показать ошибку если не согласился с политикой конфиденциальности', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText('Вы должны согласиться с политикой конфиденциальности')).toBeInTheDocument();
			});
		});
	});

	describe('Отправка формы через RTK Query', () => {
		test('должен вызвать registerUser с правильными данными при валидной форме', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			// Заполняем все поля валидными данными
			await user.type(screen.getByTestId('RegistrationForm.email'), validFormData.email);
			await user.type(screen.getByTestId('RegistrationForm.name'), validFormData.fullName);
			await user.type(screen.getByTestId('RegistrationForm.phone'), validFormData.phone);
			await user.type(screen.getByTestId('RegistrationForm.password'), validFormData.password);
			await user.type(screen.getByTestId('RegistrationForm.confirmPassword'), validFormData.confirmPassword);
			await user.click(screen.getByTestId('RegistrationForm.policy'));

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			await user.click(submitButton);

			await waitFor(() => {
				expect(mockRegisterUser).toHaveBeenCalledWith({
					email: validFormData.email,
					name: validFormData.fullName,
					phoneNumber: validFormData.phone,
					password: validFormData.password,
				});
			});
		});

		test('должен вызвать onSuccess при успешной регистрации', async () => {
			const user = userEvent.setup();
			const mockOnSuccess = vi.fn();

			componentRender(<RegistrationForm onSuccess={mockOnSuccess} />);

			// Заполняем форму валидными данными
			await user.type(screen.getByTestId('RegistrationForm.email'), validFormData.email);
			await user.type(screen.getByTestId('RegistrationForm.name'), validFormData.fullName);
			await user.type(screen.getByTestId('RegistrationForm.phone'), validFormData.phone);
			await user.type(screen.getByTestId('RegistrationForm.password'), validFormData.password);
			await user.type(screen.getByTestId('RegistrationForm.confirmPassword'), validFormData.confirmPassword);
			await user.click(screen.getByTestId('RegistrationForm.policy'));

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			await user.click(submitButton);

			await waitFor(() => {
				expect(mockOnSuccess).toHaveBeenCalledTimes(1);
			});
		});

		test('должен показать ошибку при неудачной регистрации', async () => {
			const user = userEvent.setup();
			const errorMessage = 'Пользователь с таким email уже существует';

			// Мокаем ошибку
			mockRegisterUser.mockReturnValue({
				unwrap: vi.fn().mockRejectedValue({
					message: errorMessage,
					field: 'email'
				})
			});

			componentRender(<RegistrationForm />);

			// Заполняем форму валидными данными
			await user.type(screen.getByTestId('RegistrationForm.email'), validFormData.email);
			await user.type(screen.getByTestId('RegistrationForm.name'), validFormData.fullName);
			await user.type(screen.getByTestId('RegistrationForm.phone'), validFormData.phone);
			await user.type(screen.getByTestId('RegistrationForm.password'), validFormData.password);
			await user.type(screen.getByTestId('RegistrationForm.confirmPassword'), validFormData.confirmPassword);
			await user.click(screen.getByTestId('RegistrationForm.policy'));

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			await user.click(submitButton);

			await waitFor(() => {
				expect(screen.getByText(errorMessage)).toBeInTheDocument();
			});
		});
	});

	describe('Состояние загрузки RTK Query', () => {
		test('должен показать состояние загрузки во время отправки', () => {
			// Устанавливаем состояние загрузки
			Object.assign(mockRTKQueryResult, { isLoading: true });

			componentRender(<RegistrationForm />);

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			expect(submitButton).toHaveTextContent('Создание аккаунта...');
			expect(submitButton).toBeDisabled();
		});

		test('должен отключить все поля при загрузке', () => {
			// Устанавливаем состояние загрузки
			Object.assign(mockRTKQueryResult, { isLoading: true });

			componentRender(<RegistrationForm />);

			expect(screen.getByTestId('RegistrationForm.email')).toBeDisabled();
			expect(screen.getByTestId('RegistrationForm.name')).toBeDisabled();
			expect(screen.getByTestId('RegistrationForm.phone')).toBeDisabled();
			expect(screen.getByTestId('RegistrationForm.password')).toBeDisabled();
			expect(screen.getByTestId('RegistrationForm.confirmPassword')).toBeDisabled();
			expect(screen.getByTestId('RegistrationForm.policy')).toBeDisabled();
			expect(screen.getByTestId('RegistrationForm.submitBtn')).toBeDisabled();
		});
	});

	describe('Маска телефона', () => {
		test('должен применить маску к полю телефона', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const phoneInput = screen.getByTestId('RegistrationForm.phone');
			expect(phoneInput).toHaveAttribute('placeholder', '+7 (___) ___-__-__');
		});
	});

	describe('Доступность', () => {
		test('должен иметь правильные aria-атрибуты для ошибок', async () => {
			const user = userEvent.setup();
			componentRender(<RegistrationForm />);

			const submitButton = screen.getByTestId('RegistrationForm.submitBtn');
			await user.click(submitButton);

			await waitFor(() => {
				const errorsContainer = screen.getByTestId('RegistrationForm.errorContainer');
				expect(errorsContainer).toHaveAttribute('aria-live', 'polite');
				expect(errorsContainer).toHaveAttribute('role', 'alert');
			});
		});

		test('должен иметь правильный displayName', () => {
			expect(RegistrationForm.displayName).toBe('RegistrationForm');
		});
	});

	describe('Ссылка на политику конфиденциальности', () => {
		test('должен отрендерить ссылку на политику конфиденциальности', () => {
			componentRender(<RegistrationForm />);

			const policyLink = screen.getByRole('link', { name: /политикой конфиденциальности/i });
			expect(policyLink).toBeInTheDocument();
			expect(policyLink).toHaveAttribute('href', '/policy');
		});
	});
});
import { RegisterForm } from '../../ui/RegistrationForm/RegistrationForm';

export const DEFAULT_FORM_VALUES: RegisterForm = {
	email: '',
	fullName: '',
	phone: '',
	password: '',
	confirmPassword: '',
	policy: false,
};

export const VALIDATION_RULES = {
	email: {
		required: "Введите Email",
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: "Email адрес заполнен некорректно",
		},
	},
	fullName: {
		required: "Поле ФИО обязательно для заполнения",
	},
	phone: {
		required: "Введите номер телефона",
		pattern: {
			value: /^\+7\s?\(\d{3}\)\s?\d{3}-?\d{2}-?\d{2}$/,
			message: "Номер телефона заполнен некорректно"
		}
	},
	password: {
		required: "Введите пароль",
		minLength: {
			value: 6,
			message: "Пароль должен содержать минимум 6 символов"
		},
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
			message: "Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру"
		}
	},
	policy: {
		required: "Вы должны согласиться с политикой конфиденциальности"
	}
} as const;
import { LoginForm } from '../../ui/LoginForm/LoginForm';

export const DEFAULT_FORM_VALUES: LoginForm = {
	email: '',
	password: '',
};

export const VALIDATION_RULES = {
	email: {
		required: "Введите Email",
		// pattern: {
		// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		// 	message: "Email адрес заполнен некорректно",
		// },
	},
	password: {
		required: "Введите пароль",
		minLength: {
			value: 6,
			message: "Пароль должен содержать минимум 6 символов"
		},
		// pattern: {
		// 	value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
		// 	message: "Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру"
		// }
	},
} as const;
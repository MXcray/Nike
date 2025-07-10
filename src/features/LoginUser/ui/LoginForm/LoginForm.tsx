import { memo, useCallback } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DEFAULT_FORM_VALUES, VALIDATION_RULES } from '@/features/LoginUser/model/const/loginConsts.ts';
import { Input } from '@/shared/ui/Input/Input.tsx';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import cls from './LoginForm.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-right.svg?react';
import { ApiErrorResponse } from '@/features/RegistrationUser/model/api/RegistrationApi.ts';
import { useLogin } from '@/features/LoginUser/hooks/useLogin.ts';

export interface LoginForm {
	email: string;
	password: string;
}

interface LoginFormProps {
	className?: string;
	onSuccess?: () => void;
}

export const LoginForm = memo((props: LoginFormProps) => {
	const {
		className,
		onSuccess,
	} = props;

	const {
		handleSubmit,
		control,
		resetField,
		reset,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<LoginForm>({
		defaultValues: DEFAULT_FORM_VALUES,
	});

	const [ login, { isLoading } ] = useLogin();

	const onSubmit: SubmitHandler<LoginForm> = useCallback(async (data) => {
		try {
			clearErrors();

			await login({
				email: data.email,
				password: data.password,
			});

			onSuccess?.();
		} catch (error) {
			const apiError = error as ApiErrorResponse;
			setError('root', {
				type: 'server',
				message: apiError.message
			})
		} finally {
			reset(DEFAULT_FORM_VALUES, { keepErrors: true });
		}
	}, [clearErrors, login, onSuccess, setError, reset]);

	const errorsList = (
		Object.entries(errors).map(([field, err]) => (
			<p
				className={cls.errorField}
				key={field}
				role="alert"
				aria-live="polite"
			>
				{err.message}
			</p>
		))
	);

	const isFormDisabled = isLoading;

	return (
		<form
			className={classNames(cls.LoginForm, {}, [className])}
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			aria-label={'Форма авторизации'}
			data-testid={'LoginForm'}
		>
			{errorsList.length > 0 && (
				<div
					className={cls.errors}
					role="alert"
					aria-live="polite"
					data-testid={'LoginForm.errorContainer'}
				>
					{errorsList}
				</div>
			)}
			<Controller
				name={'email'}
				control={control}
				rules={VALIDATION_RULES.email}
				render={({ field, fieldState }) => (
					<Input
						{...field}
						className={cls.input}
						required
						variant={'default'}
						label={'Email или логин'}
						placeholder={'Введите данные для авторизации'}
						autoComplete={'email'}
						disabled={isFormDisabled}
						isError={!!fieldState.error}
						aria-describedby={fieldState.error ? `email-error` : undefined}
						data-testid={'LoginForm.email'}
					/>
				)}
			/>
			<Controller
				name={'password'}
				control={control}
				rules={VALIDATION_RULES.password}
				render={({ field, fieldState }) => (
					<Input
						{...field}
						className={cls.input}
						required
						variant={'default'}
						label={'Пароль'}
						placeholder={'Введите пароль от аккаунта'}
						type="password"
						autoComplete="new-password"
						isError={!!fieldState.error}
						disabled={isFormDisabled}
						aria-describedby={fieldState.error ? `password-error` : undefined}
						data-testid={'LoginForm.password'}
					/>
				)}
			/>
			<Button
				className={cls.button}
				max
				buttonType={'filled'}
				buttonColor={'black'}
				icon={ArrowIcon}
				wrapperClassName={cls.btnIconWrapper}
				type="submit"
				disabled={isFormDisabled}
				aria-label={isFormDisabled ? "Вход в кабинет..." : "Войти в кабинет"}
				data-testid={'LoginForm.submitBtn'}
			>
				{isFormDisabled ? 'Вход в кабинет...' : 'Войти в кабинет'}
			</Button>
		</form>
	);
});

LoginForm.displayName = 'LoginForm';
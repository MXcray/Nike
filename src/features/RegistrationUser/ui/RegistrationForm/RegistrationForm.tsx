import { memo, useCallback, useMemo, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './RegistrationForm.module.scss';
import { Input } from '@/shared/ui/Input/Input.tsx';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import ArrowIcon from '@/shared/assets/icons/arrow-right.svg?react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
	useRegisterUserMutation,
	ApiErrorResponse
} from '@/features/RegistrationUser/model/api/RegistrationApi.ts';
import { DEFAULT_FORM_VALUES, VALIDATION_RULES } from '../../model/const/registrationConsts';

export interface RegisterForm {
	email: string;
	fullName: string;
	phone: string;
	password: string;
	confirmPassword: string;
	policy: boolean;
}

interface RegistrationFormProps {
	className?: string;
	onSuccess?: () => void;
}

export const RegistrationForm = memo((props: RegistrationFormProps) => {
	const {
		className,
		onSuccess
	} = props;

	const {
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<RegisterForm>({
		defaultValues: DEFAULT_FORM_VALUES,
	});

	const password = watch('password');

	const validateConfirmPassword = useCallback((value: string) => {
		return value === password || "Пароли не совпадают";
	}, [password]);

	const [ registerUserMutation, { isLoading } ] = useRegisterUserMutation();

	const onSubmit: SubmitHandler<RegisterForm> = useCallback(async (data) => {
		try {
			clearErrors();

			await registerUserMutation({
				email: data.email,
				name: data.fullName,
				phoneNumber: data.phone,
				password: data.password,
			}).unwrap();

			onSuccess?.();
		} catch (error) {
			const apiError = error as ApiErrorResponse;
			setError('root', {
				type: 'server',
				message: apiError.message
			})
		} finally {
			reset(DEFAULT_FORM_VALUES, { keepErrors: true })
		}
	}, [clearErrors, registerUserMutation, onSuccess, setError, reset]);

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
			className={classNames(cls.RegistrationForm, {}, [className])}
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			aria-label={'Форма регистрации'}
			data-testid={'RegistrationForm'}
		>
			{errorsList.length > 0 && (
				<div
					className={cls.errors}
					role="alert"
					aria-live="polite"
					data-testid={'RegistrationForm.errorContainer'}
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
						label={'Email'}
						placeholder={'Введите email адрес'}
						autoComplete={'email'}
						disabled={isFormDisabled}
						isError={!!fieldState.error}
						aria-describedby={fieldState.error ? `email-error` : undefined}
						data-testid={'RegistrationForm.email'}
					/>
				)}
			/>
			<Controller
				name={'fullName'}
				control={control}
				rules={VALIDATION_RULES.fullName}
				render={({ field, fieldState }) => (
					<Input
						{...field}
						className={cls.input}
						required
						variant={'default'}
						label={'ФИО'}
						placeholder={'Ваше полное имя'}
						autoComplete="name"
						disabled={isFormDisabled}
						isError={!!fieldState.error}
						aria-describedby={fieldState.error ? `fullName-error` : undefined}
						data-testid={'RegistrationForm.name'}
					/>
				)}
			/>
			<Controller
				name={'phone'}
				control={control}
				rules={VALIDATION_RULES.phone}
				render={({ field, fieldState }) => (
					<Input
						{...field}
						className={cls.input}
						required
						variant={'default'}
						label={'Номер телефона'}
						placeholder={'+7 (___) ___-__-__'}
						autoComplete="tel"
						disabled={isFormDisabled}
						isError={!!fieldState.error}
						mask={{
							mask: '+7 (000) 000-00-00',
							lazy: true,
							unmask: false,
							placeholderChar: '_',
						}}
						aria-describedby={fieldState.error ? `phone-error` : undefined}
						data-testid={'RegistrationForm.phone'}
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
						placeholder={'Придумайте пароль'}
						type="password"
						autoComplete="new-password"
						isError={!!fieldState.error}
						disabled={isFormDisabled}
						aria-describedby={fieldState.error ? `password-error` : undefined}
						data-testid={'RegistrationForm.password'}
					/>
				)}
			/>
			<Controller
				name={'confirmPassword'}
				control={control}
				rules={{
					required: "Повторите пароль",
					validate: validateConfirmPassword
				}}
				render={({ field, fieldState }) => (
					<Input
						{...field}
						className={cls.input}
						required
						variant={'default'}
						label={'Повторите пароль'}
						placeholder={'Повторите пароль'}
						autoComplete="new-password"
						type="password"
						isError={!!fieldState.error}
						disabled={isFormDisabled}
						aria-describedby={fieldState.error ? `confirmPassword-error` : undefined}
						data-testid={'RegistrationForm.confirmPassword'}
					/>
				)}
			/>
			<Controller
				name={'policy'}
				control={control}
				rules={VALIDATION_RULES.policy}
				render={({ field, fieldState }) => (
					<Checkbox
						{...field}
						className={cls.policy}
						checked={field.value}
						onChange={field.onChange}
						isError={!!fieldState.error}
						disabled={isFormDisabled}
						aria-describedby={fieldState.error ? `policy-error` : undefined}
						data-testid={'RegistrationForm.policy'}
						label={
							<>
								Я соглашаюсь на обработку персональных данных в соответствии с{' '}
								<AppLink variant={'underline'} to={'/policy'}>
									политикой конфиденциальности
								</AppLink>
							</>
						}
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
				aria-label={isFormDisabled ? "Создание аккаунта..." : "Создать аккаунт"}
				data-testid={'RegistrationForm.submitBtn'}
			>
				{isFormDisabled ? 'Создание аккаунта...' : 'Создать аккаунт'}
			</Button>
		</form>
	);
});

RegistrationForm.displayName = 'RegistrationForm';
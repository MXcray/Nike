import { memo, useCallback, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './RegistrationForm.module.scss';
import { userActions } from '@/entities/User';
import { registerByEmail } from '../../model/services/registerByEmail';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import { useSelector } from 'react-redux';
import { getRegisterIsLoading } from '../../model/selectors/getRegisterIsLoading/getRegisterIsLoading';

interface RegistrationFormProps {
	className?: string;
}

export const RegistrationForm = memo((props: RegistrationFormProps) => {
	const {
		className,
	} = props;

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getRegisterIsLoading);

	const onChangeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);

	const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}, []);

	const onChangePhoneNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	}, []);

	const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}, []);

	const onChangePasswordConfirm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirm(e.target.value);
	}, []);

	const onRegisterClick = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			console.error('Passwords do not match');
			return;
		}
		dispatch(registerByEmail({ email, name, phoneNumber, password }));
	}, [email, name, phoneNumber, password, passwordConfirm, dispatch]);

	return (
		<div className={classNames(cls.RegistrationForm, {}, [className])}>
			<form onSubmit={onRegisterClick}>
				<input
					type="email"
					onChange={onChangeLogin}
					value={email}
					placeholder="Email"
				/>
				<input
					type="text"
					onChange={onChangeName}
					value={name}
					placeholder="Имя"
				/>
				<input
					type="tel"
					onChange={onChangePhoneNumber}
					value={phoneNumber}
					placeholder="Номер телефона"
				/>
				<input
					type="password"
					onChange={onChangePassword}
					value={password}
					placeholder="Пароль"
				/>
				<input
					type="password"
					onChange={onChangePasswordConfirm}
					value={passwordConfirm}
					placeholder="Подтвердите пароль"
				/>
				<button 
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
				</button>
			</form>

			{/* <AuthByEmail /> */}
		</div>
	);
});
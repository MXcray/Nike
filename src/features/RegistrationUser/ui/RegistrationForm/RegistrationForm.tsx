import { memo, useCallback, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './RegistrationForm.module.scss';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import axios from 'axios';
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

	const onChangeLogin = useCallback((e: any) => {
		setEmail(e.target.value);
	}, []);

	const onChangeName = useCallback((e: any) => {
		setName(e.target.value);
	}, []);

	const onChangePhoneNumber = useCallback((e: any) => {
		setPhoneNumber(e.target.value);
	}, []);

	const onChangePassword = useCallback((e: any) => {
		setPassword(e.target.value);
	}, []);

	const onChangePasswordConfirm = useCallback((e: any) => {
		setPasswordConfirm(e.target.value);
	}, []);

	const onRegisterClick = useCallback( async(e: any) => {
		e.preventDefault();
		axios.post(`${__API_URL__}/register`, {email, name, phoneNumber, password});
	}, [email, name, phoneNumber, password])

	console.log(email, password);

	return (
		<div className={classNames(cls.RegistrationForm, {}, [className])}>
			<form onSubmit={onRegisterClick}>
				<input
					type="text"
					onChange={onChangeLogin}
					value={email}
				/>
				<input
					type="text"
					onChange={onChangeName}
					value={name}
				/>
				<input
					type="text"
					onChange={onChangePhoneNumber}
					value={phoneNumber}
				/>
				<input
					type="text"
					onChange={onChangePassword}
					value={password}
				/>
				<input
					type="text"
					onChange={onChangePasswordConfirm}
					value={passwordConfirm}
				/>
				<button type='submit'>submit</button>
			</form>

			{/* <AuthByEmail /> */}
		</div>
	);
});
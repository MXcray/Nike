import { memo, useCallback, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './LoginForm.module.scss';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import axios from 'axios';

interface RegistrationFormProps {
	className?: string;
}

export const LoginForm = memo((props: RegistrationFormProps) => {
	const {
		className,
	} = props;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();

	const onChangeLogin = useCallback((e: any) => {
		setEmail(e.target.value);
	}, []);

	const onChangePassword = useCallback((e: any) => {
		setPassword(e.target.value);
	}, []);

	const onLoginClick = useCallback( async(e: any) => {
		e.preventDefault();
		axios.post(`${__API_URL__}/login`, {email, password});
	}, [email, password])

	console.log(email, password);

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<form onSubmit={onLoginClick}>
				<input
					type="text"
					onChange={onChangeLogin}
					value={email}
				/>
				<input
					type="text"
					onChange={onChangePassword}
					value={password}
				/>
				<button type='submit'>submit</button>
			</form>

			{/* <AuthByEmail /> */}
		</div>
	);
});
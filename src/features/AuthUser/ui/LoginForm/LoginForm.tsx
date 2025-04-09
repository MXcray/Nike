import { memo, useCallback, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './LoginForm.module.scss';
import { userActions } from '@/entities/User';
import { loginByEmail } from '../../model/services/loginByEmail';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import { useSelector } from 'react-redux';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';

interface LoginFormProps {
	className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
	const {
		className,
	} = props;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getLoginIsLoading);

	const onChangeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);

	const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}, []);

	const onLoginClick = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(loginByEmail({ email, password }));
	}, [email, password, dispatch]);

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<form onSubmit={onLoginClick}>
				<input
					type="email"
					onChange={onChangeLogin}
					value={email}
					placeholder="Email"
				/>
				<input
					type="password"
					onChange={onChangePassword}
					value={password}
					placeholder="Password"
				/>
				<button 
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Загрузка...' : 'Войти'}
				</button>
			</form>

			{/* <AuthByEmail /> */}
		</div>
	);
});
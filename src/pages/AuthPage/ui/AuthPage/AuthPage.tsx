import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './AuthPage.module.scss';
import { RegistrationForm } from '@/features/RegistrationUser';
import { LoginForm } from '@/features/AuthUser/ui/LoginForm/LoginForm.tsx';

interface AuthPageProps {
	className?: string;
}

export const AuthPage = memo((props: AuthPageProps) => {
	const { className } = props;

	return (
		<div className={classNames(cls.AuthPage, {}, [className])}>
			AuthPage
			<LoginForm />
			<br />
			<hr />
			<br/>
			<RegistrationForm />
			<div></div>
		</div>
	);
});
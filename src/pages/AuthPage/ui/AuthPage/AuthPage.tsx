import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './AuthPage.module.scss';
import { RegistrationForm } from '@/features/RegistrationUser';

interface AuthPageProps {
	className?: string;
}

export const AuthPage = memo((props: AuthPageProps) => {
	const {
		className,
	} = props;



	return (
			<div className={classNames(cls.AuthPage, {}, [className])}>
				AuthPage
				<RegistrationForm />
			</div>
	);
});
import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './RegisterPage.module.scss';
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { LoginRedirect } from '@/widgets/RedirectPlugs';
import { RegistrationForm } from '@/features/RegistrationUser';
import { useNavigate } from 'react-router-dom';
import { getRouteCatalog } from '@/shared/const/router.ts';

interface RegisterPageProps {
	className?: string;
}

export const RegisterPage = memo((props: RegisterPageProps) => {
	const { className } = props;

	const navigate = useNavigate();

	return (
		<div className={classNames(cls.AuthPage, {}, [className])}>
			<AuthLayout
				title={'Регистрация'}
				form={<RegistrationForm onSuccess={() => navigate(getRouteCatalog())} />}
				renderSlot={<LoginRedirect />}
			/>
		</div>
	);
});
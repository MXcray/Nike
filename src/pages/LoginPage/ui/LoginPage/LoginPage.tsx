import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { RegisterRedirect } from '@/widgets/RedirectPlugs';
import { LoginForm } from '@/features/LoginUser';
import { useNavigate } from 'react-router-dom';
import { getRouteCatalog } from '@/shared/const/router.ts';

interface LoginPageProps {
	className?: string;
}

export const LoginPage = memo((props: LoginPageProps) => {
	const {
		className,
	} = props;

	const navigate = useNavigate();

	return (
			<div className={classNames('', {}, [className])}>
				<AuthLayout
					title={'Авторизация'}
					form={<LoginForm onSuccess={() => navigate(getRouteCatalog())} />}
					renderSlot={<RegisterRedirect />}
				/>
			</div>
	);
});
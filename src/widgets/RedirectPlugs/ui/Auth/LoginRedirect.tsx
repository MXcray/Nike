import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './Redirect.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import userPlusIcon from '@/shared/assets/icons/user-plus.svg?react';
import arrowIcon from '@/shared/assets/icons/arrow-right.svg?react';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { getRouteLogin } from '@/shared/const/router';

interface LoginRedirectProps {
	className?: string;
}

export const LoginRedirect = memo((props: LoginRedirectProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.Redirect, {}, [className])}>
				<Icon
					Svg={userPlusIcon}
					width={38}
					height={45}
				/>
				<div className={cls.content}>
					<h3 className={cls.title}>Уже есть аккаунт?</h3>
					<div className={cls.text}>
						<p>
							Перейдите к <b>авторизации</b> если у вас уже есть зарегистрированный аккаунт.
						</p>
					</div>
					<Button
						className={cls.button}
						buttonColor={'orange'}
						buttonType={'filled'}
						icon={arrowIcon}
						wrapperClassName={cls.iconBtnWrapper}
						href={getRouteLogin()}
					>
						Авторизоваться
					</Button>
				</div>
			</div>
	);
});
import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './Redirect.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import userPlusIcon from '@/shared/assets/icons/user-plus.svg?react';
import arrowIcon from '@/shared/assets/icons/arrow-right.svg?react';
import { getRouteRegister } from '@/shared/const/router.ts';

interface RegisterRedirectProps {
	className?: string;
}

export const RegisterRedirect = memo((props: RegisterRedirectProps) => {
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
					<h3 className={cls.title}>Еще нет аккаунта?</h3>
					<div className={cls.text}>
						<p>
							<b>Регистрация на сайте</b> позволяет получить доступ к статусу и истории вашего заказа.
							Просто заполните поля ниже, и вы получите учетную запись.
						</p>
						<br/>
						<p>
							Мы запрашиваем у вас только информацию, необходимую для того,
							чтобы сделать процесс покупки более быстрым и легким.
						</p>
					</div>
					<Button
						className={cls.button}
						buttonColor={'orange'}
						buttonType={'filled'}
						icon={arrowIcon}
						wrapperClassName={cls.iconBtnWrapper}
						href={getRouteRegister()}
					>
						Зарегистрироваться
					</Button>
				</div>
			</div>
	);
});
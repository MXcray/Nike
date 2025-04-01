import cls from './FooterSubscribe.module.scss';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Input } from '@/shared/ui/Input/Input.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';
import { getRouteMain } from '@/shared/const/router.ts';

interface FooterSubscribeProps {
	className?: string;
}

export const FooterSubscribe = memo((props: FooterSubscribeProps) => {
	const {
		className,
	} = props;

	const InputBtn = (
		<Button
			className={cls.inputBtn}
		>
			Подписаться
		</Button>
	)

	return (
		<div className={classNames(cls.FooterSubscribe, {}, [className])}>
			<div className={cls.text}>
				<h5 className={cls.title}>Подписка на новости</h5>
				<span className={cls.desc}>Подпишитесь на новости и скидки</span>
			</div>
			<div className={cls.inputAndPolicy}>
				<Input
					className={cls.input}
					type={'email'}
					placeholder={'Email'}
					variant={'split'}
					withBtn={InputBtn}
				/>
				<p className={cls.policy}>
					Согласен с
					<AppLink to={getRouteMain()}> политикой конфиденциальности</AppLink>
				</p>
			</div>
		</div>
	);
});
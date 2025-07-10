import { memo, ReactElement } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './AuthLayout.module.scss';

interface AuthLayoutProps {
	className?: string;
	title?: string;
	form: ReactElement;
	renderSlot?: ReactElement;
}

export const AuthLayout = memo((props: AuthLayoutProps) => {
	const {
		className,
		title,
		form,
		renderSlot,
	} = props;

	return (
			<div className={classNames(cls.AuthLayout, {}, [className])}>
				<h2 className={cls.title}>{title}</h2>
				<div className={cls.content}>
					{/*<div className={cls.form}>{form}</div>*/}
					{/*<div className={cls.action}>{renderSlot}</div>*/}
					{form}
					{renderSlot}
				</div>
			</div>
	);
});
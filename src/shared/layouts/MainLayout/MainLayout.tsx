import { memo, ReactElement } from 'react';
import cls from './MainLayout.module.scss';
import { classNames } from '../../lib/classNames/classNames.ts';

interface MainLayoutProps {
	className?: string;
	header: ReactElement;
	content: ReactElement;
	footer: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
	const {
		header,
		footer,
		content,
		className
	} = props;

	return (
		<div className={classNames(cls.MainLayout, {}, [className])}>
			<div className={cls.header}>{header}</div>
			<div className={cls.content}>{content}</div>
			<div className={cls.footer}>{footer}</div>
		</div>
	);
});

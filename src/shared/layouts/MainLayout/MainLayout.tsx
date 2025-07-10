import { memo, ReactElement } from 'react';
import cls from './MainLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useSelector } from 'react-redux';
import { getIsHeaderMenuOpened } from '@/features/UI/index.ts';

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

	const isHeaderMenuOpened = useSelector(getIsHeaderMenuOpened);

	return (
		<div className={classNames(cls.MainLayout, { [cls.menuOpen]: isHeaderMenuOpened }, [className])}>
			<div className={cls.header}>{header}</div>
			<div className={cls.content}>{content}</div>
			<div className={cls.footer}>{footer}</div>
		</div>
	);
});

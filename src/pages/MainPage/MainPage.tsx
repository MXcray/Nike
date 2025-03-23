import { memo } from 'react';
import cls from './MainPage.module.scss';
import { classNames } from '../../shared/lib/classNames/classNames';

interface MainPageProps {
	className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.MainPage, {}, [className])}>
				MainPage
			</div>
	);
});
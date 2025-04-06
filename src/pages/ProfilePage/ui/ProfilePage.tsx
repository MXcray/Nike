import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
	className?: string;
}

export const ProfilePage = memo((props: ProfilePageProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.ProfilePage, {}, [className])}>
				ProfilePage
			</div>
	);
});
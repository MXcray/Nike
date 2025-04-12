import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './FavoritesPage.module.scss';
import { FavoritesList } from '../FavoritesList/FavoritesList.tsx';

interface FavoritesPageProps {
	className?: string;
}

export const FavoritesPage = memo((props: FavoritesPageProps) => {
	const {
		className,
	} = props;

	return (
			<div className={classNames(cls.FavoritesPage, {}, [className])}>
				<FavoritesList />
			</div>
	);
});
import { memo, useCallback, useMemo, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import cls from './AddToFavoriteBtn.module.scss';
import FavoriteIcon from '@/shared/assets/icons/favorite.svg?react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import { addToFavorites, getFavoriteProductsIds } from '@/entities/Favorites';
import { useSelector } from 'react-redux';
import {
	removeFromFavorites,
} from '@/entities/Favorites';

interface AddToFavoriteBtnProps {
	className?: string;
	productId: string;
}

export const AddToFavoriteBtn = memo((props: AddToFavoriteBtnProps) => {
	const {
		className,
		productId,
	} = props;

	const dispatch = useAppDispatch();
	const favoriteProducts = useSelector(getFavoriteProductsIds);

	const isFavorites = useMemo(() => {
		if (!favoriteProducts) return false;
		return favoriteProducts.includes(productId);
	}, [favoriteProducts, productId]);

	const [optimisticIsFavorite, setOptimisticIsFavorite] = useState(isFavorites);

	// Синхронизируем локальное состояние с данными из Redux
	useMemo(() => {
		setOptimisticIsFavorite(isFavorites);
	}, [isFavorites]);

	const onClick = useCallback(() => {
		const newState = !optimisticIsFavorite;
		setOptimisticIsFavorite(newState);

		const action = newState
			? addToFavorites(productId)
			: removeFromFavorites(productId);

		dispatch(action).unwrap()
			.catch(() => {
				console.error('Ошибка при обновлении избранного');
				setOptimisticIsFavorite(!newState);
			});
	}, [dispatch, optimisticIsFavorite, productId]);

	return (
			<Icon
				className={classNames(cls.AddToFavoriteBtn, { [cls.active]: optimisticIsFavorite }, [className])}
				Svg={FavoriteIcon} width={23} height={20}
				clickable
				onClick={onClick}
			/>
	);
});
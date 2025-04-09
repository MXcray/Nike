import { memo, useCallback, useMemo, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import cls from './AddToFavoriteBtn.module.scss';
import FavoriteIcon from '@/shared/assets/icons/favorite.svg?react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import { addToFavorites } from '@/entities/Favorites';
import { useSelector } from 'react-redux';
import {
	getFavoriteProductsData,
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
	const favoriteProducts = useSelector(getFavoriteProductsData);

	const isFavorites = useMemo(() => {
		if (!favoriteProducts?.productId) return false;
		return favoriteProducts.productId.includes(productId);
	}, [favoriteProducts, productId]);

	// Локальное состояние для оптимистичного UI
	const [optimisticIsFavorite, setOptimisticIsFavorite] = useState(isFavorites);

	// Синхронизируем локальное состояние с данными из Redux
	useMemo(() => {
		setOptimisticIsFavorite(isFavorites);
	}, [isFavorites]);

	const onClick = useCallback(() => {
		// Оптимистично обновляем UI
		const newState = !optimisticIsFavorite;
		setOptimisticIsFavorite(newState);

		// Выполняем действие в зависимости от нового состояния
		const action = newState
			? addToFavorites(productId)
			: removeFromFavorites(productId);

		// Отправляем запрос и обрабатываем возможную ошибку
		dispatch(action).unwrap()
			.catch(() => {
				// В случае ошибки возвращаем предыдущее состояние
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
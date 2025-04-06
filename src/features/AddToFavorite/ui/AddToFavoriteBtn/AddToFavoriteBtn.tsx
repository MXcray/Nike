import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { Icon } from '@/shared/ui/Icon/Icon.tsx';
import cls from './AddToFavoriteBtn.module.scss';
import FavoriteIcon from '@/shared/assets/icons/favorite.svg?react';

interface AddToFavoriteBtnProps {
	className?: string;
	productId: string;
}

export const AddToFavoriteBtn = memo((props: AddToFavoriteBtnProps) => {
	const {
		className,
		productId,
	} = props;

	const onClick = () => {
		console.log('add to favorite: ' + productId);
	}

	return (
			<Icon
				className={classNames(cls.AddToFavoriteBtn, {}, [className])}
				Svg={FavoriteIcon} width={23} height={20}
				clickable
				onClick={onClick}
			/>
	);
});
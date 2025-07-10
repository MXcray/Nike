import { memo } from 'react';
import cls from './FavoritesList.module.scss';
import { AddToFavoriteBtn } from '@/features/AddToFavorite/ui/AddToFavoriteBtn/AddToFavoriteBtn.tsx';
import { ProductList } from '@/entities/Product/ui/ProductList/ProductList.tsx';
import { useSelector } from 'react-redux';
import { getFavoriteProductsIds } from '@/entities/Favorites';
import { useGetProductsByIdsQuery } from '@/entities/Product/model/api/ProductsApi.ts';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState.tsx';
import noFavoriteIcon from '@/shared/assets/icons/no-favorites.svg?react';
import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { getRouteCatalog } from '@/shared/const/router.ts';

interface FavoritesListProps {
	className?: string;
}

export const FavoritesList = memo((props: FavoritesListProps) => {
	const {
		className,
	} = props;

	const favoriteIds = useSelector(getFavoriteProductsIds);

	const {
		data,
		isLoading,
		error
	} = useGetProductsByIdsQuery(favoriteIds, {
			skip: favoriteIds.length === 0
	});

	if (favoriteIds.length === 0) {
		return (
			<EmptyState
				icon={noFavoriteIcon}
				title={'Ваш список желаний пуст'}
				description={
					<>
						<p>У вас пока нет товаров в списке желаний.</p>
						<p>На странице <b>"Каталог"</b> вы найдете много интересных товаров.</p>
					</>
				}
				action={
					<Button
						buttonType={'filled'}
						buttonColor={'orange'}
						icon={arrowRight}
						iconFull
						href={getRouteCatalog()}
					>
						Перейти в каталог
					</Button>
				}
			/>
		)
	}

	return (
		<ProductList
			className={className}
			products={data}
			isLoading={isLoading}
			error={error}
			addToFavoriteRender={(productId: string) => <AddToFavoriteBtn productId={productId} />}
		/>
	);
});
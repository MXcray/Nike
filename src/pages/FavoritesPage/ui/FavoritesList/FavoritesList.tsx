import { memo } from 'react';
import { AddToFavoriteBtn } from '@/features/AddToFavorite/ui/AddToFavoriteBtn/AddToFavoriteBtn.tsx';
import { ProductList } from '@/entities/Product/ui/ProductList/ProductList.tsx';
import { useSelector } from 'react-redux';
import { getFavoriteProductsIds } from '@/entities/Favorites';
import { useGetProductsByIdsQuery } from '@/entities/Product/model/api/ProductsApi.ts';

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
	} = useGetProductsByIdsQuery(favoriteIds);

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
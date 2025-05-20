import { useSelector } from 'react-redux';
import {
	getProductsPageColor, getProductsPageMaterial, getProductsPageMaxPrice, getProductsPageMinPrice,
	getProductsPageSize,
} from '@/pages/ProductsPage/model/selectors/ProductsPageSelectors.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';
import { useCallback } from 'react';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/ProductsPageSlice.ts';

export function useProductsFilters() {
	const size = useSelector(getProductsPageSize);
	const color = useSelector(getProductsPageColor);
	const material = useSelector(getProductsPageMaterial);
	const minPrice = useSelector(getProductsPageMinPrice);
	const maxPrice = useSelector(getProductsPageMaxPrice);

	const dispatch = useAppDispatch();

	const onChangeSize = useCallback((newSize: string) => {
		dispatch(productsPageActions.setSize(newSize));
		dispatch(productsPageActions.setPage(1));
	}, [dispatch]);

	const onChangeColor = useCallback((newColor: string) => {
		dispatch(productsPageActions.setColor(newColor));
		dispatch(productsPageActions.setPage(1));
	}, [dispatch]);

	const onChangeMaterial = useCallback((newMaterial: string) => {
		dispatch(productsPageActions.setMaterial(newMaterial));
		dispatch(productsPageActions.setPage(1));
	}, [dispatch]);

	const onChangePrice = useCallback((newMinPrice: number, newMaxPrice: number) => {
		dispatch(productsPageActions.setMinPrice(newMinPrice));
		dispatch(productsPageActions.setMaxPrice(newMaxPrice));
		dispatch(productsPageActions.setPage(1));
	}, [dispatch]);

	const resetFilters = useCallback(() => {
		dispatch(productsPageActions.resetFilters());
		dispatch(productsPageActions.setPage(1));
	}, [dispatch]);

	return {
		size,
		minPrice,
		maxPrice,
		color,
		material,
		onChangeSize,
		onChangePrice,
		onChangeColor,
		onChangeMaterial,
		resetFilters,
	};
}
import { EntityState } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';



// export interface ProductsPageSchema extends EntityState<Product, string> {
export interface ProductsPageSchema {
	isLoading?: boolean;
	error?: string;

	// pagination
	page: number;
	limit: number;
	// hasMore: boolean;

	//filters
	size: string;
	minPrice: number;
	maxPrice: number;
	color: string;
	material: string;
}
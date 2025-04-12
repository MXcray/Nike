import { EntityState } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';

export interface ProductsPageSchema extends EntityState<Product, string> {
	isLoading?: boolean;
	error?: string;

	// pagination
	page: number;
	limit: number;
	hasMore: boolean;
}
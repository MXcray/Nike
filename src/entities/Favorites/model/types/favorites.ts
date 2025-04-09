export interface FavoriteProducts {
	id: string;
	productId: string[];
	userId?: string;
}

export interface FavoriteProductSchema {
	data?: FavoriteProducts;
	isLoading?: boolean;
	error?: string;
}
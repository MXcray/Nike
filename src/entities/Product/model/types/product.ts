import { ProductBadge, ProductImageVariant, ProductSex } from '../../model/consts/productConsts.ts';
import { Currency } from '@/shared/types/currency.ts';

export interface ProductPrice {
	oldPrice?: number;
	currentPrice: number;
	currency: Currency;
}

export type ProductImageType = ProductImageVariant.MAIN | ProductImageVariant.SIDE;

export interface ProductImage {
	title: string;
	src: string;
	type: ProductImageType;
}

export interface ProductSize {
	eu: string;
	inStock: boolean;
	quantity: number;
	isSelected?: boolean;
}

export interface ProductVariant {
	color: string;
	colorHex: string;
	isSelected: boolean;
	images: ProductImage[];
	availableSizes: ProductSize[];
}

export interface ProductSpecifications {
	sex: ProductSex;
	country: string;
	material: string[];
	collection: string;
	warranty: string;
	releaseYear: string;
}

export interface Product {
	id: string;
	type: string;
	name: string;
	brand: string;
	model: string;
	shortDescription: string;
	description: string[];
	specifications: ProductSpecifications;
	variants: ProductVariant[];
	price: ProductPrice;
	images: ProductImage[];
	isStock: boolean;
	rating: number;
	reviewCount: number;
	badge?: ProductBadge;
	discount?: string;
	category: string[];
	tags: string[];
}
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import { ProductItemGallery, ProductSize } from '@/entities/Product';
import { useGetProductByIdQuery } from '@/entities/Product/model/api/ProductsApi.ts';
import { AddToFavoriteBtn } from '@/features/AddToFavorite/ui/AddToFavoriteBtn/AddToFavoriteBtn.tsx';
import { Img } from '@/shared/ui/Img/Img.tsx';
import { ColorVariant, ProductColorPicker } from '@/entities/Product/ui/ProductColorPicker/ProductColorPicker.tsx';
import { formatPrice } from '@/shared/lib/formatPrice/formatPrice.ts';
import { mapCurrencyToSymbol } from '@/shared/lib/mapCurrencyToSymbol/mapCurrencyToSymbol.ts';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { Input } from '@/shared/ui/Input/Input.tsx';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import { Modal } from '@/shared/ui/Modal/Modal.tsx';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { SizesTableModal } from '@/pages/ProductDetailsPage/ui/SizesTableModal/SizesTableModal.tsx';

interface ProductDetailsPageProps {
	className?: string;
}

export const ProductDetailsPage = memo((props: ProductDetailsPageProps) => {
	const {
		className,
	} = props;

	const { id } = useParams<{id: string}>();

	if (!id) {
		throw new Error('not id');
	}

	const {
		data: product,
		isLoading,
		isError,
	} = useGetProductByIdQuery(id);

	const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
	const [sizesModalIsOpen, setSizesModalIsOpen] = useState<boolean>(false);
	const [availableSizes, setAvailableSizes] = useState<ProductSize[]>([]);
	const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>();
	const [isDefaultSizeSelected, setIsDefaultSizeSelected] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<string>('1');

	const mainImage = useMemo(() => {
		return product?.images?.find(img => img.type === 'main')
	}, [product?.images]);

	const subImages = useMemo(() => {
		return product?.images?.filter(img => img.type !== 'main')?.slice(0, 4) || []
	}, [product?.images]);

	const availableColors = useMemo(() =>
			product?.variants?.map((variant): ColorVariant => ({
				name: variant.color,
				code: variant.colorHex,
			})) || [],
		[product?.variants]
	);

	const updateSizesForColor = useCallback((color: ColorVariant) => {
		setSelectedColor(color);

		if (!product) return;

		const selectedVariant = product.variants.find(
			variant => variant.color === color.name && variant.colorHex === color.code
		);

		if (selectedVariant) {
			const newAvailableSizes = selectedVariant.availableSizes;
			setAvailableSizes(newAvailableSizes);

			const defaultSize = newAvailableSizes.find(size => size.isSelected);
			if (defaultSize) {
				setSelectedSize(defaultSize);
				setIsDefaultSizeSelected(true);
			} else {
				setSelectedSize(undefined);
			}
		} else {
			setAvailableSizes([]);
			setSelectedSize(undefined);
		}
	}, [product]);

	// При первой загрузке устанавливаем первый доступный цвет как выбранный
	useEffect(() => {
		if (availableColors.length > 0 && !selectedColor) {
			updateSizesForColor(availableColors[0]);
		}
	}, [availableColors, selectedColor, updateSizesForColor]);

	const onChangeSize = useCallback((size: ProductSize) => {
		if (size.inStock) {
			setSelectedSize(size);
			setIsDefaultSizeSelected(false);
		}
	}, [setSelectedSize])

	const onIncrease = useCallback(() => {
		const currentValue = parseInt(quantity || '1', 10);
		const maxAvailable = selectedSize?.quantity || 99;

		if (currentValue < maxAvailable) {
			setQuantity(String(currentValue + 1));
		}
	}, [quantity, selectedSize?.quantity]);

	const onDecrease = useCallback(() => {
		const currentValue = parseInt(quantity || '1', 10);

		if (currentValue > 1) {
			setQuantity(String(currentValue - 1));
		}
	}, [quantity]);

	const onChangeQuantity = useCallback((value: string) => {
		if (value === '') {
			setQuantity('');
			return;
		}

		const numValue = parseInt(value, 10);
		if (isNaN(numValue)) return;

		const maxAvailable = selectedSize?.quantity || 99;
		if (numValue > 0 && numValue <= maxAvailable) {
			setQuantity(String(numValue));
		}
	}, [selectedSize?.quantity]);

	const onInputBlur = useCallback(() => {
		if (quantity === '') {
			setQuantity('1');
		}
	}, [quantity]);

	// Получаем числовое значение для использования в бизнес-логике
	const getNumericQuantity = useCallback(() => {
		return parseInt(quantity || '1', 10);
	}, [quantity]);

	const showSizesTable = useCallback(() => {
		setSizesModalIsOpen(true);
	}, []);

	const closeSizesModal = useCallback(() => {
		setSizesModalIsOpen(false);
	}, [])

	if (isLoading) {
		return <div>загрузка....</div>
	}

	if (!product) {
		return <div>Продукт не найден</div>;
	}

	const currency = mapCurrencyToSymbol[product.price.currency];

	console.log(availableSizes);

	return (
			<div className={classNames(cls.ProductDetailsPage, {}, [className])}>
				<div className={cls.gallery}>
					<ProductItemGallery
						className={cls.mainImage}
						images={mainImage}
						productId={id}
						badge={product.badge}
						isLoading={isLoading}
						addToFavoriteRender={
							(id) => <AddToFavoriteBtn productId={id} />
						}
					/>

					<div className={cls.subGallery}>
						{subImages.map((image, index) => {
							return (
								<Img
									className={cls.subGalleryItem}
									src={image.src}
									alt={image.src}
									key={image.src + index}
								/>
							);
						})}
					</div>
				</div>

				<div className={cls.content}>
					<h2 className={cls.title}>{product.name}</h2>
					<span className={cls.shortDescription}>{product.shortDescription}</span>
					<a className={cls.anchorLink} href={"#description"}>Полное описание</a>
					<ProductColorPicker
						className={cls.colors}
						colors={availableColors}
						selectedColor={selectedColor}
						onSelectColor={(color) => updateSizesForColor(color)}
					/>
					<div className={cls.sizes}>
						<div className={cls.sizesHeader}>
							<span>Размер (EU):</span>
							<span
								className={cls.sizesTableBtn}
								onClick={showSizesTable}
							>
								Размерная таблица
							</span>
							<SizesTableModal
								isOpen={sizesModalIsOpen}
								onClose={closeSizesModal}
							/>
						</div>
						<div className={cls.sizeList}>
							{availableSizes.map((size) => {
								return (
									<button
										className={classNames(cls.sizeItem, {
											[cls.outOfStock]: !size.inStock,
											[cls.selectedSize]: selectedSize?.eu === size.eu,
										})}
										key={size.eu}
										onClick={() => onChangeSize(size)}
									>
										{size.eu}
									</button>
								);
							})}
						</div>
					</div>
					<div className={cls.price}>
						{product.price.oldPrice &&
							<div className={cls.oldPrice}>{formatPrice(product.price.oldPrice)} {currency}</div>
						}
						<div className={cls.currentPrice}>{formatPrice(product.price.currentPrice)} {currency}</div>
					</div>
					<div className={cls.shop}>
						<div className={cls.counter}>
							<Button
								className={cls.counterBtn}
								onClick={() => onDecrease()}>
								-
							</Button>
							<Input
								className={cls.counterInput}
								value={quantity}
								onChange={onChangeQuantity}
								onBlur={onInputBlur}
								variant={'default'}
								min={1}
								max={99}
							/>
							<Button
								className={cls.counterBtn}
								onClick={() => onIncrease()}>
								+
							</Button>
						</div>
						<Button
							className={cls.cartBtn}
							wrapperClassName={cls.cartBtnWrapper}
							buttonType={'filled'}
							buttonColor={'black'}
							icon={BagIcon}
							iconHeight={17}
							iconWidth={15}
						>
							Добавить в корзину
						</Button>
					</div>
					<TabGroup className={cls.tabs} id={'description'}>
						<TabList className={cls.tabList}>
							<Tab as={Fragment}>
								{({ hover, selected }) => (
									<Button className={classNames(cls.tab, {
										[cls.tabIsSelected]: selected,
										[cls.tabIsHovered]: hover,
									})}>
										Описание
									</Button>
								)}
							</Tab>
							<Tab as={Fragment}>
								{({ hover, selected }) => (
									<Button className={classNames(cls.tab, {
										[cls.tabIsSelected]: selected,
										[cls.tabIsHovered]: hover,
									})}>
										Характеристики
									</Button>
								)}
							</Tab>
							<Tab as={Fragment}>
								{({ hover, selected }) => (
									<Button className={classNames(cls.tab, {
										[cls.tabIsSelected]: selected,
										[cls.tabIsHovered]: hover,
									})}>
										Отзывы
									</Button>
								)}
							</Tab>
						</TabList>
						<TabPanels className={cls.tabPanels}>
							<TabPanel>
								{product.description.map((p, index) => (
									<>
										<p className={cls.descriptionParagraph} key={index}>{p}</p>
										<br/>
									</>
								))}
							</TabPanel>
							<TabPanel>В разработке...</TabPanel>
							<TabPanel>В разработке...</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
	);
});
import { memo, useCallback, useEffect, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { RangeSlider } from '@/shared/ui/RangeSlider/RangeSlider.tsx';
// import cls from './PriceFilter.module.scss';

interface PriceFilterProps {
	className?: string;
	minValue?: number;
	maxValue?: number;
	initialMinValue?: number;
	initialMaxValue?: number;
	onPriceChange?: (minPrice: number, maxPrice: number) => void;
	debounceTime?: number;
}

export const PriceFilter = memo((props: PriceFilterProps) => {
	const {
		className,
		minValue,
		maxValue,
		initialMinValue,
		initialMaxValue,
		onPriceChange,
		debounceTime = 300,
	} = props;

	const [currentMinPrice, setCurrentMinPrice] = useState<number>(initialMinValue || 0);
	const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(initialMaxValue || 0);

	const handlePriceChange = useCallback((minPrice: number, maxPrice: number) => {
		setCurrentMinPrice(minPrice);
		setCurrentMaxPrice(maxPrice);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			onPriceChange?.(currentMinPrice, currentMaxPrice);
		}, debounceTime);

		return () => {
			clearTimeout(timer);
		};
	}, [currentMinPrice, currentMaxPrice, onPriceChange, debounceTime]);

	return (
		<div className={classNames('', {}, [className])}>
			<RangeSlider
				minPrice={minValue}
				maxPrice={maxValue}
				initialMinValue={initialMinValue}
				initialMaxValue={initialMaxValue}
				onChange={handlePriceChange}
			/>
		</div>
	);
});
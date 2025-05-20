import { memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import cls from './RangeSlider.module.scss';

interface RangeSliderProps {
	className?: string;
	minPrice?: number;
	maxPrice?: number;
	initialMinValue?: number;
	initialMaxValue?: number;
	onChange?: (minValue: number, maxValue: number) => void;
}

export const RangeSlider = memo((props: RangeSliderProps) => {
	const {
		className,
		minPrice = 0,
		maxPrice = 50000,
		initialMinValue = minPrice,
		initialMaxValue = maxPrice,
		onChange
	} = props;

	const [values, setValues] = useState<[number, number]>([
		initialMinValue,
		initialMaxValue
	]);

	const [minInputValue, setMinInputValue] = useState(initialMinValue.toString());
	const [maxInputValue, setMaxInputValue] = useState(initialMaxValue.toString());

	// Синхронизация внутреннего состояния с props
	useEffect(() => {
		setValues([initialMinValue, initialMaxValue]);
		setMinInputValue(initialMinValue.toString());
		setMaxInputValue(initialMaxValue.toString());
	}, [initialMinValue, initialMaxValue]);

	// Обработчик изменения слайдера
	const handleSliderChange = useCallback((newValues: number | number[]) => {
		if (Array.isArray(newValues) && newValues.length === 2) {
			setValues(newValues as [number, number]);
			setMinInputValue(newValues[0].toString());
			setMaxInputValue(newValues[1].toString());
			onChange?.(newValues[0], newValues[1]);
		}
	}, [onChange]);

	// Обработчик изменения минимального значения в input
	const handleMinInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setMinInputValue(e.target.value);
	}, []);

	// Обработчик изменения максимального значения в input
	const handleMaxInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setMaxInputValue(e.target.value);
	}, []);

	// Обработчик потери фокуса для минимального значения
	const handleMinInputBlur = useCallback(() => {
		let newMin = parseInt(minInputValue);

		if (isNaN(newMin)) {
			newMin = values[0];
			setMinInputValue(newMin.toString());
			return;
		}

		if (newMin < minPrice) {
			newMin = minPrice;
		}

		if (newMin > values[1] - 500) {
			newMin = values[1] - 500;
		}

		setMinInputValue(newMin.toString());
		setValues([newMin, values[1]]);
		onChange?.(newMin, values[1]);
	}, [minInputValue, values, minPrice, onChange]);

	// Обработчик потери фокуса для максимального значения
	const handleMaxInputBlur = useCallback(() => {
		let newMax = parseInt(maxInputValue);

		if (isNaN(newMax)) {
			newMax = values[1];
			setMaxInputValue(newMax.toString());
			return;
		}

		if (newMax > maxPrice) {
			newMax = maxPrice;
		}

		if (newMax < values[0] + 500) {
			newMax = values[0] + 500;
		}

		setMaxInputValue(newMax.toString());
		setValues([values[0], newMax]);
		onChange?.(values[0], newMax);
	}, [maxInputValue, values, maxPrice, onChange]);

	// Обработчик нажатия Enter для минимального значения
	const handleMinInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleMinInputBlur();
		}
	}, [handleMinInputBlur]);

	// Обработчик нажатия Enter для максимального значения
	const handleMaxInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleMaxInputBlur();
		}
	}, [handleMaxInputBlur]);

	return (
		<div className={classNames(cls.priceRangeSlider, {}, [className])}>
			<div className={cls.priceLabel}>
				Цена:
			</div>

			<div className={cls.sliderWrapper}>
				<div className={cls.sliderContainer}>
					<Slider
						range
						min={minPrice}
						max={maxPrice}
						value={values}
						onChange={handleSliderChange}
						className={cls.slider}
						trackStyle={{ backgroundColor: '#000', height: 2 }}
						railStyle={{ backgroundColor: '#e0e0e0', height: 2 }}
						handleStyle={[
							{
								backgroundColor: '#fff',
								borderColor: '#000',
								height: 10,
								width: 10,
								marginTop: -4,
								boxShadow: 'none'
							},
							{
								backgroundColor: '#fff',
								borderColor: '#000',
								height: 10,
								width: 10,
								marginTop: -4,
								boxShadow: 'none'
							}
						]}
					/>
				</div>
			</div>

			<div className={cls.priceInputs}>
				<div className={cls.inputWrapper}>
					<input
						type="text"
						className={cls.priceInput}
						value={minInputValue}
						onChange={handleMinInputChange}
						onBlur={handleMinInputBlur}
						onKeyDown={handleMinInputKeyDown}
					/>
					<span className={cls.currencySymbol}>₽</span>
				</div>
				<span className={cls.separator}>—</span>
				<div className={cls.inputWrapper}>
					<input
						type="text"
						className={cls.priceInput}
						value={maxInputValue}
						onChange={handleMaxInputChange}
						onBlur={handleMaxInputBlur}
						onKeyDown={handleMaxInputKeyDown}
					/>
					<span className={cls.currencySymbol}>₽</span>
				</div>
			</div>
		</div>
	);
});
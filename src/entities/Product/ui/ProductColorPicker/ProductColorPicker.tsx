import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductColorPicker.module.scss';

export interface ColorVariant {
	name: string;
	code: string;
}

interface ProductColorPickerProps {
	className?: string;
	colors: ColorVariant[];
	selectedColor?: ColorVariant | null;
	onSelectColor?: (color: ColorVariant) => void;
}

export const ProductColorPicker = memo((props: ProductColorPickerProps) => {
	const {
		className,
		colors,
		selectedColor,
		onSelectColor,
	} = props;

	if (!colors || colors.length === 0) {
		return null;
	}

	const handleColorClick = (color: ColorVariant) => {
		if (onSelectColor) {
			onSelectColor(color);
		}
	};

	const isColorSelected = (color: ColorVariant) => {
		if (!selectedColor) return false;
		return color.code === selectedColor.code || color.name === selectedColor.name;
	};

	return (
		<div className={classNames(cls.ProductColorPicker, {}, [className])}>
			<span className={cls.label}>Цвета: </span>
				{colors.map((color, index) => (
					<div
						key={index}
						className={classNames(cls.color, {
							[cls.selected]: isColorSelected(color)
						})}
						style={{ backgroundColor: `#${color.code}` }}
						title={color.name}
						onClick={() => handleColorClick(color)}
					/>
				))}
		</div>
	);
});
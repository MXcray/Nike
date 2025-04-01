import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ProductColorPicker.module.scss';

interface ColorVariant {
	name: string;
	code: string;
}

interface ProductColorPickerProps {
	className?: string;
	colors: ColorVariant[];
	onSelectColor?: (color: ColorVariant) => void;
}

export const ProductColorPicker = memo((props: ProductColorPickerProps) => {
	const {
		className,
		colors,
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

	return (
		<div className={classNames(cls.ProductColorPicker, {}, [className])}>
			<span className={cls.label}>Цвета: </span>
				{colors.map((color, index) => (
					<div
						key={index}
						className={cls.color}
						style={{ backgroundColor: `#${color.code}` }}
						title={color.name}
						onClick={() => handleColorClick(color)}
					/>
				))}
		</div>
	);
});
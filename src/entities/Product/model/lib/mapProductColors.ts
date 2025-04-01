import { DEFAULT_COLOR_MAP } from '../consts/colorMap';
import { ProductVariant } from '../types/product';

interface ColorVariant {
	name: string;
	code: string;
}

/**
 * Преобразует варианты продукта в массив цветовых объектов
 * @param variants Варианты продукта
 * @param limit Максимальное количество цветов для отображения
 * @returns Массив цветовых объектов
 */
export function mapProductColors(variants?: ProductVariant[], limit = 4): ColorVariant[] {
	if (!variants || variants.length === 0) {
		return [];
	}

	const colorVariants = variants.map(variant => {
		// Если у варианта есть hex-код цвета, используем его
		if (variant.colorHex) {
			return {
				name: variant.color || '',
				code: variant.colorHex
			};
		}
		// Если есть только название цвета, ищем соответствующий hex-код в карте цветов
		else if (variant.color && !variant.colorHex) {
			const colorName = variant.color.toLowerCase();
			return {
				name: variant.color,
				code: DEFAULT_COLOR_MAP[colorName] || 'CCCCCC' // Если цвет не найден, используем серый
			};
		}
		// Если нет ни кода, ни названия, используем серый цвет
		return {
			name: 'Неизвестный',
			code: 'CCCCCC'
		};
	});

	return colorVariants.slice(0, limit);
}
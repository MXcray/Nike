import React from 'react';
import cls from './Plug.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

// Предопределенные типы плагинов
export type PredefinedPlugType = 'hit' | 'new' | 'discount';
type PlugSize = 's' | 'm';

// Дискриминированные объединения для разных типов плагинов
type BasePlugProps = {
	className?: string;
	size?: PlugSize;
};

type StandardPlugProps = BasePlugProps & {
	plugType: 'hit' | 'new';
	plugText?: string; // Опционально для стандартных типов };
}
type DiscountPlugProps = BasePlugProps & {
	plugType: 'discount';
	plugText?: string; // Опционально для типа 'discount', по умолчанию '-20%' };
}
type CustomPlugProps = BasePlugProps & {
	plugType: 'text';
	plugText: string; // Обязательно для типа 'text' };
}

// Объединенный тип для всех возможных пропсов
export type PlugProps = StandardPlugProps | DiscountPlugProps | CustomPlugProps;

// Предопределенные тексты для каждого типа
const plugTextMap: Record<PredefinedPlugType, string> = {
	hit: 'хит',
	new: 'новинка',
	discount: '-20%',
};

const mapSizeToClass: Record<PlugSize, string> = {
	s: 'size_s',
	m: 'suze_m',
}

// Объединенный тип для всех возможных пропсов
// export type PlugProps = PredefinedPlugProps | CustomPlugProps;
//
// // Предопределенные тексты для каждого типа
// const plugTextMap: Record<PredefinedPlugType, string> = {
// 	hit: 'хит',
// 	new: 'новинка',
// 	discount: '-20%',
// };

export const Plug = (props: PlugProps) => {
	const {
		className,
		plugType,
		plugText,
		size ,
	} = props;

	let displayText: string;

	const sizeClass = size && mapSizeToClass[size];

	if (plugText) {
		displayText = plugText;
	} else if (plugType === 'text') {
		throw new Error('plugText is required when plugType is "text"');
	} else {
		displayText = plugTextMap[plugType];
	}

	return (
		<div className={classNames(cls.Plug, {}, [className, cls[plugType], sizeClass && cls[sizeClass]])}>
			{displayText}
		</div>
	);
};


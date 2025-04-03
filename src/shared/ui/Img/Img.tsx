import { memo, ImgHTMLAttributes, ReactElement, useLayoutEffect, useState, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

const VITE_API = import.meta.env.VITE_API;

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	src: string;
	alt?: string;
	fallback?: ReactElement;
	errorFallback?: ReactElement;
}

/**
 * Компонент для отображения изображений с учетом источника (локальный или серверный)
 */
export const Img = memo((props: ImageProps) => {
	const {
		className,
		src,
		alt = '',
		fallback,
		errorFallback,
		...otherProps
	} = props;

	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useLayoutEffect(() => {
		if (!src) {
			setIsLoading(false);
			setHasError(true);
			return;
		}

		const img = new Image();
		img.src = src;

		const handleLoad = () => {
			setIsLoading(false);
		};

		const handleError = () => {
			setIsLoading(false);
			setHasError(true);
		};

		img.addEventListener('load', handleLoad);
		img.addEventListener('error', handleError);

		return () => {
			img.removeEventListener('load', handleLoad);
			img.removeEventListener('error', handleError);
		};
	}, [src]);

	// Определяем источник изображения
	const imageSrc = !src ? '' : (
		(src.startsWith('http') || src.startsWith('/src') || src.startsWith('/assets'))
			? src // Если путь уже содержит http,src,dist, оставляем как есть
			: `${VITE_API}${src.startsWith('/') ? '' : '/'}${src}` // Добавляем базовый URL
	);

	if (isLoading && fallback) {
		return fallback;
	}

	if (hasError && errorFallback) {
		return errorFallback;
	}

	return (
		<img
			className={classNames('', {}, [className])}
			src={imageSrc}
			alt={alt}
			{...otherProps}
		/>
	);
});
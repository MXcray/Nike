import { memo, ImgHTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

const VITE_API = import.meta.env.VITE_API ;

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	src: string;
	alt?: string;
}

/**
 * Компонент для отображения изображений с учетом источника (локальный или серверный)
 */
export const Img = memo((props: ImageProps) => {
	const {
		className,
		src,
		alt = '',
		...otherProps
	} = props;

	const imageSrc= (src.startsWith('http') || src.startsWith('/src') || src.startsWith('/assets'))
		? src // Если путь уже содержит http,src,dist, оставляем как есть
		: `${VITE_API}${src.startsWith('/') ? '' : '/'}${src}` // Добавляем базовый URL (localhost:3000 или реальный сервак)

	return (
		<img
			className={classNames('', {}, [className])}
			src={imageSrc}
			alt={alt}
			{...otherProps}
		/>
	);
});
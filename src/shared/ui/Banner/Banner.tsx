import React, { memo, ReactElement, useCallback } from 'react';
import cls from './Banner.module.scss';
import { AppLink } from '../AppLink/AppLink.tsx';
import { classNames } from '../../lib/classNames/classNames.ts';
import { Plug, PredefinedPlugType } from '../Plug/Plug.tsx';

// Базовые пропсы для всех вариантов баннера
interface BaseBannerProps {
	className?: string;
	title: string;
	pathText: string;
	path: string;
	imgUrl: string;
	width?: number;
	height?: number;
	date?: string;
	darken?: boolean;
}

// Пропсы для баннера с готовым компонентом плага
interface BannerWithPlugComponent extends BaseBannerProps {
	plug: ReactElement;
	plugType?: never;
	plugText?: never;
}

// Пропсы для баннера с предопределенным типом плага
interface BannerWithPredefinedPlugType extends BaseBannerProps {
	plug?: never;
	plugType: PredefinedPlugType;
	plugText?: string;
}

// Пропсы для баннера с текстовым типом плага
interface BannerWithTextPlugType extends BaseBannerProps {
	plug?: never;
	plugType: 'text';
	plugText: string; // Обязательное поле для типа 'text'
}

// Пропсы для баннера без плага
interface BannerWithoutPlug extends BaseBannerProps {
	plug?: never;
	plugType?: never;
	plugText?: never;
}

// Объединенный тип для всех вариантов баннера
export type BannerProps =
	| BannerWithPlugComponent
	| BannerWithPredefinedPlugType
	| BannerWithTextPlugType
	| BannerWithoutPlug;

export const Banner = memo((props: BannerProps) => {
	const {
		className,
		title,
		imgUrl,
		width,
		height,
		date,
		plug,
		plugType,
		plugText,
		pathText,
		path,
		darken = true,
	} = props;

	const renderPlug = useCallback(() => {
		// Если передан готовый компонент, используем его
		if (plug) {
			return plug;
		}
		// Если указан тип плага, создаем компонент Plug
		if (plugType) {
			if (plugType === 'text') {
				// TypeScript уже гарантирует, что plugText определен для типа 'text'
				return <Plug plugType="text" plugText={plugText!} />;
			}
			// Для предопределенных типов
			return <Plug plugType={plugType} plugText={plugText} />;
		}
		return null;
	}, [plug, plugType, plugText]);

	const plugElement = renderPlug();

	return (
		<div
			className={classNames(cls.Banner, { [cls.darken]: darken }, [className])}
			style={{
				width: width ? `${width}px` : undefined,
				height: height ? `${height}px` : undefined,
				backgroundImage: `url(${imgUrl})`,
			}}
		>
			{plugElement && <div className={cls.plug}>{plugElement}</div>}
			<h4 className={cls.title}>{title}</h4>
			<div className={cls.bannerBottom}>
				<AppLink className={cls.link} to={path}>
					{pathText}
				</AppLink>
				{date && <span className={cls.date}>{date}</span>}
			</div>
		</div>
	);
});
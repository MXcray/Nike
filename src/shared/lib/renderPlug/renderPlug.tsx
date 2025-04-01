import { ReactElement } from 'react';
import { Plug, PredefinedPlugType } from '@/shared/ui/Plug/Plug';

interface RenderPlugOptions {
	plug?: ReactElement;
	plugType?: PredefinedPlugType | 'text';
	plugText?: string;
}

/**
 * Утилита для рендеринга плагов в компонентах
 * @param options - Опции для рендеринга плага
 * @returns ReactElement | null - Отрендеренный плаг или null
 */
export const renderPlug = (options: RenderPlugOptions): ReactElement | null => {
	const { plug, plugType, plugText } = options;

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
};
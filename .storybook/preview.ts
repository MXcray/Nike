import type { Preview } from '@storybook/react-vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { RouterDecorator } from '../src/shared/config/storybook/RouterDecorator/RouterDecorator';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { StyleDecorator } from '../src/shared/config/storybook/StyleDecorator/StyleDecorator';

const preview: Preview = {
	decorators: [RouterDecorator, StyleDecorator],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		chromatic: {
			// Разные размеры экрана для тестирования
			viewports: [320, 768, 1400],
			// Задержка перед скриншотом
			delay: 300,
			// Отключить анимации
			// pauseAnimationAtEnd: true,
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
};

export default preview;

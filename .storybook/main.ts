import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    // "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
		'msw-storybook-addon',
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
	// Добавляем статическую директорию для MSW
	staticDirs: ['./static'],
};
export default config;
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Decorator } from '@storybook/react';

interface RouterParams {
	path?: string;
	initialEntry?: string;
	useRoutes?: boolean; // Нужно ли использовать Routes/Route
}

// Гибкий декоратор который можно переопределить через параметры
export const RouterDecorator: Decorator = (Story, context) => {
	// Получаем параметры из context.parameters.router
	const routerParams: RouterParams = context.parameters?.router || {};

	const {
		path = '/',
		initialEntry = '/',
		useRoutes = false
	} = routerParams;

	return (
		<MemoryRouter initialEntries={[initialEntry]}>
			{useRoutes ? (
				<Routes>
					<Route path={path} element={<Story {...context} />} />
				</Routes>
			) : (
				<Story {...context} />
			)}
		</MemoryRouter>
	);
};
import React, { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig.tsx';

const AppRouter = () => {
	const renderWithWrapper = useCallback((route: RouteProps) => {
		const element = (
			<Suspense fallback={<div>Page loader...</div>}>{route.element}</Suspense>
		)

		return (
			<Route
				key={route.path}
				path={route.path}
				element={element}
			/>
		);
	}, [])

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
};

export default memo(AppRouter)

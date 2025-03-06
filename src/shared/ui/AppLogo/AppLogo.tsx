import React, { memo, useCallback } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import Logo from '../../assets/icons/logo.svg?react';
import { useNavigate } from 'react-router-dom';
import { getRouteMain } from '../../const/router.ts';

interface AppLogoProps {
	wrapperClassName?: string;
	className?: string;
	width?: number;
	height?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
	const {
		wrapperClassName,
		className,
		height = 58,
		width = 20,
	} = props;

	const navigate = useNavigate();

	const handleNavigateToHome = useCallback(() => {
		navigate(getRouteMain());
	}, [navigate]);

	return (
		<Icon
			wrapperClassName={wrapperClassName}
			className={className}
			Svg={Logo}
			width={height}
			height={width}
			clickable
			onClick={handleNavigateToHome}
		/>
	);
});

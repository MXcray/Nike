import React, { ButtonHTMLAttributes, memo } from 'react';
import MenuSvg from '../../../../shared/assets/icons/menu.svg?react';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';
import cls from './HeaderCatalogBtn.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import { useAppMedia } from '../../../../shared/hooks/useAppMedia/useAppMedia.tsx';

interface HeaderCatalogBtn extends ButtonHTMLAttributes<HTMLButtonElement>{
	isMenuOpened?: boolean;
}

export const HeaderCatalogBtn = memo((props: HeaderCatalogBtn) => {
	const { onClick, isMenuOpened } = props;
	const { isMedia768, isMedia480 } = useAppMedia();

	return (
		<button
			className={classNames(
				cls.HeaderCatalogBtn,
				{ [cls.opened]: isMenuOpened },
				[],
			)}
			type="button"
			onClick={onClick}
		>
			<Icon className={cls.icon} Svg={MenuSvg} width={36} height={8} />
			<span>{isMedia480 ? (isMedia768 ? 'Каталог' : 'Меню') : ''}</span>
		</button>
	);
});

HeaderCatalogBtn.displayName = 'HeaderCatalogBtn';
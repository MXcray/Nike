import React, { ButtonHTMLAttributes, memo } from 'react';
import MenuSvg from '../../../../shared/assets/icons/menu.svg?react';
import { Icon } from '../../../../shared/ui/Icon/Icon.tsx';
import cls from './HeaderCatalogBtn.module.scss';
import { classNames } from '../../../../shared/lib/classNames/classNames.ts';
import { useAppMedia } from '../../../../shared/hooks/useAppMedia/useAppMedia.tsx';

interface HeaderCatalogBtn extends ButtonHTMLAttributes<HTMLButtonElement>{
	collapsed?: boolean;
}

export const HeaderCatalogBtn = memo((props: HeaderCatalogBtn) => {
	const { onClick, collapsed } = props;
	const { isMedia768 } = useAppMedia();

	return (
		<button
			className={classNames(
				cls.HeaderCatalogBtn,
				{ [cls.collapsed]: !collapsed },
				[],
			)}
			type="button"
			onClick={onClick}
		>
			<Icon className={cls.icon} Svg={MenuSvg} width={36} height={8} />
			<span>{isMedia768 ? 'Каталог' : 'Меню'}</span>
		</button>
	);
});

HeaderCatalogBtn.displayName = 'HeaderCatalogBtn';
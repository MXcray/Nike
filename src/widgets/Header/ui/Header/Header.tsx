import React from 'react';
import { HeaderTop } from '../HeaderTop/HeaderTop.tsx';
import { HeaderBottom } from '../HeaderBottom/HeaderBottom.tsx';
import cls from './Header.module.scss';
import { useAppMedia } from '@/shared/hooks/useAppMedia/useAppMedia.tsx';


export const Header = () => {
	const { isMedia768 } = useAppMedia()

	return (
		<div className={cls.Header}>
			{isMedia768 && <HeaderTop />}
			<HeaderBottom />
		</div>
	);
};

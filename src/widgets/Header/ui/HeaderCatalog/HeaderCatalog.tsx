import React, { lazy, memo, Suspense } from 'react';
import { useAppMedia } from '../../../../shared/hooks/useAppMedia/useAppMedia.tsx';
// import { HeaderCatalogMobile } from './HeaderCatalogMobile.tsx';
// import { HeaderCatalogDesktop } from './HeaderCatalogDesktop.tsx';

const HeaderCatalogMobile = lazy(() => import('./HeaderCatalogMobile.tsx'));
const HeaderCatalogDesktop = lazy(() => import('./HeaderCatalogDesktop.tsx'));

export const HeaderCatalog = memo(() => {
	const { isMedia768 } = useAppMedia();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{isMedia768 ? <HeaderCatalogDesktop /> : <HeaderCatalogMobile />}
		</Suspense>
	);
});

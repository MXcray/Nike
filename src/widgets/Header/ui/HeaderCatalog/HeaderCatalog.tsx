import React, { lazy, memo, Suspense } from 'react';
import { useAppMedia } from '@/shared/hooks/useAppMedia/useAppMedia.tsx';

const HeaderCatalogMobile = lazy(() => import('./HeaderCatalogMobile.tsx'));
const HeaderCatalogDesktop = lazy(() => import('./HeaderCatalogDesktop.tsx'));

interface HeaderCatalogProps {
	onClose: () => void;
}

export const HeaderCatalog = memo(({ onClose }: HeaderCatalogProps) => {
	const { isMedia768 } = useAppMedia();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{isMedia768
				? <HeaderCatalogDesktop />
				: <HeaderCatalogMobile onClose={onClose} />
			}
		</Suspense>
	);
});

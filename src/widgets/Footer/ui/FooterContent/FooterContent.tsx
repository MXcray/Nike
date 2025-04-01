import cls from './FooterContent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { memo, Suspense } from 'react';
import { useAppMedia } from '@/shared/hooks/useAppMedia/useAppMedia.tsx';
import { FooterContentDesktop } from './FooterContentDesktop.tsx';
import { FooterContentMobile } from './FooterContentMobile.tsx';

export const FooterContent = memo(() => {
	const { isMedia768 } = useAppMedia();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{isMedia768
				? <FooterContentDesktop />
				: <FooterContentMobile />
			}
		</Suspense>
	);
});
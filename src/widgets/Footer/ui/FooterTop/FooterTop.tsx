import React, { memo } from 'react';
import { FooterHeading } from '../FooterHeading/FooterHeading.tsx';
import { FooterContent } from '../FooterContent/FooterContent.tsx';
import { FooterSubscribe } from '../FooterSubscribe/FooterSubscribe.tsx';
import cls from './FooterTop.module.scss';

export const FooterTop = memo(() => {
	return (
		<div className={cls.FooterTop}>
			<FooterHeading className={cls.heading} />
			<FooterContent />
			<FooterSubscribe className={cls.subscribe} />
		</div>
	);
});

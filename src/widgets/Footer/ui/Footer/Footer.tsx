import React, { memo } from 'react';
import cls from './Footer.module.scss';
import { FooterTop } from '../FooterTop/FooterTop.tsx';
import { FooterBottom } from '../FooterBottom/FooterBottom.tsx';

export const Footer = memo(() => {
	return (
		<div className={cls.Footer}>
			<FooterTop/>
			<FooterBottom/>
		</div>
	);
});

Footer.displayName = 'Footer';
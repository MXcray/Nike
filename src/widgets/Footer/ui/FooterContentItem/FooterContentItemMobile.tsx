import { memo, useMemo } from 'react';
import { classNames } from "../../../../shared/lib/classNames/classNames.ts";
import cls from './FooterContentItemMobile.module.scss';
import { Accordion } from '../../../../shared/ui/Accordion/Accordion.tsx';
import { HeaderCategoryType, HeaderLinkType } from '../../../Header/model/types/header.ts';
import { AppLink } from '../../../../shared/ui/AppLink/AppLink.tsx';

interface FooterContentItemMobileProps {
	className?: string;
	title: string;
	items: HeaderLinkType[] | HeaderCategoryType[];
}

export const FooterContentItemMobile = memo((props: FooterContentItemMobileProps) => {
	const {
		className,
		title,
		items
	} = props;

	const linksMarkup = useMemo(() => {
		return items.map((item) => {
			if ('text' in item) {
				// Обработка HeaderLinkType
				return (
					<AppLink
						className={cls.link}
						to={item.path}
						key={item.text}
					>
						{item.text}
					</AppLink>
				);
			} else if ('title' in item && 'path' in item) {
				// Обработка HeaderCategoryType
				return (
					<AppLink
						className={cls.link}
						to={item.path}
						key={item.title}
					>
						{item.title}
					</AppLink>
				);
			} else {
				return null;
			}
		}).filter(Boolean);
	}, [items]);

	return (
			<div className={classNames(cls.FooterContentItemMobile, {}, [className])}>
				<Accordion
					title={title}
					className={cls.accordion}
					titleClassName={cls.title}
					arrowClassName={cls.arrow}
					arrowPadding={'default'}
					textAlign={'center'}
				>
					<div className={cls.content}>
						{linksMarkup}
					</div>
				</Accordion>
			</div>
	);
});
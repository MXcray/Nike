import { memo, useMemo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './FooterContentItemDesktop.module.scss';
import { HeaderCategoryType, HeaderLinkType } from '@/widgets/Header/model/types/header.ts';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';

interface FooterContentItemDesktopProps {
	className?: string;
	title: string;
	items: HeaderLinkType[] | HeaderCategoryType[];
}

export const FooterContentItemDesktop = memo((props: FooterContentItemDesktopProps) => {
	const {
		className,
		title,
		items,
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
			<div className={classNames(cls.FooterContentItemDesktop, {}, [className])}>
				<h5 className={cls.title}>{title}</h5>
				{linksMarkup}
			</div>
	);
});
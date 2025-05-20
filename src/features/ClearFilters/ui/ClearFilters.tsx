import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ClearFilters.module.scss';
import { Button } from '@/shared/ui/Button/Button.tsx';
import closeIcon from '@/shared/assets/icons/close.svg?react';

interface ClearFiltersProps {
	className?: string;
	onClick: () => void;
}

export const ClearFilters = memo((props: ClearFiltersProps) => {
	const {
		className,
		onClick,
	} = props;

	return (
			<Button
				className={classNames(cls.ClearFilters, {}, [className])}
				wrapperClassName={cls.wrapperIcon}
				icon={closeIcon}
				iconWidth={10}
				iconHeight={10}
				iconPosition={'left'}
				onClick={onClick}
			>
				Сбросить все
			</Button>
	);
});
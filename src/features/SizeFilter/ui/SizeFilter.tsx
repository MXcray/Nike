import { memo, useCallback, useMemo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
// import cls from './SizeFilter.module.scss';
import { ListBox } from '@/shared/ui/ListBox/ListBox.tsx';

interface SizeFilterProps {
	className?: string;
	size: string;
	onChangeSize: (newSize: string) => void;
}

export const SizeFilter = memo((props: SizeFilterProps) => {
	const {
		className,
		size,
		onChangeSize,
	} = props;

	const sizes = useMemo(() => [
		{ value: '36', content: '36 (EU)' },
		{ value: '37', content: '37 (EU)', disabled: true },
		{ value: '38', content: '38 (EU)' },
		{ value: '39', content: '39 (EU)' },
		{ value: '40', content: '40 (EU)' },
		{ value: '41', content: '41 (EU)' },
		{ value: '42', content: '42 (EU)' },
		{ value: '43', content: '43 (EU)' },
		{ value: '44', content: '44 (EU)' },
		{ value: '45', content: '45 (EU)' },
	], []);

	return (
		<ListBox
			className={classNames('', {}, [className])}
			label={'Размер'}
			items={sizes}
			value={size}
			onChange={onChangeSize}
			defaultValue={'Выберите размер'}
		/>
	);
});
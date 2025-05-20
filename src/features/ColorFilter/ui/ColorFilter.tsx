import { memo, useMemo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { ListBox } from '@/shared/ui/ListBox/ListBox.tsx';

interface ColorFilterProps {
	className?: string;
	color: string;
	onChangeColor: (newColor: string) => void;
}

export const ColorFilter = memo((props: ColorFilterProps) => {
	const {
		className,
		color,
		onChangeColor,
	} = props;

	const colors = useMemo(() => [
		{ value: 'white', content: 'белый' },
		{ value: 'black', content: 'черный' },
		{ value: 'red', content: 'красный' },
	], [])

	return (
		<ListBox
			className={classNames('', {}, [className])}
			label={'Цвет'}
			items={colors}
			value={color}
			onChange={onChangeColor}
			defaultValue={'Выберите цвет'}
		/>
	);
});
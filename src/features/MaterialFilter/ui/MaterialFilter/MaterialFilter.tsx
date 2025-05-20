import { memo, useMemo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { ListBox } from '@/shared/ui/ListBox/ListBox.tsx';

interface MaterialFilterProps {
	className?: string;
	material: string;
	onChangeMaterial: (newMaterial: string) => void;
}

export const MaterialFilter = memo((props: MaterialFilterProps) => {
	const {
		className,
		material,
		onChangeMaterial,
	} = props;

	const materials = useMemo(() => [
		{ value: 'кожа', content: 'кожа' },
		{ value: 'синтетика', content: 'синтетика' },
		{ value: 'текстиль', content: 'текстиль' },
		{ value: 'резина', content: 'резина' },
		{ value: 'замша', content: 'замша' },
		{ value: 'пена', content: 'пена' },
		{ value: 'EVA', content: 'EVA' },
		{ value: 'полиуретан', content: 'полиуретан' },
	], [])

	return (
		<ListBox
			className={classNames('', {}, [className])}
			label={'Материал'}
			items={materials}
			value={material}
			onChange={onChangeMaterial}
			defaultValue={'Выберите материал'}
		/>
	);
});
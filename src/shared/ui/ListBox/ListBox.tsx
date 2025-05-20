import { memo, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './ListBox.module.scss';
import {
	Listbox as HListBox,
	ListboxOptions as HListBoxOptions,
	ListboxOption as HListBoxOption,
	ListboxButton as HListBoxButton,
} from '@headlessui/react';
import { Button } from '@/shared/ui/Button/Button.tsx';
import arrowIcon from '@/shared/assets/icons/accordion-arrow.svg?react';

interface ListBoxItem {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

interface ListBoxProps {
	className?: string;
	items?: ListBoxItem[];
	value?: string;
	defaultValue?: string;
	onChange: (value: string) => void;
	label?: string;
}

export const ListBox = memo((props: ListBoxProps) => {
	const {
		className,
		onChange,
		value,
		label,
		defaultValue,
		items,
	} = props;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const [wrapperWidth, setWrapperWidth] = useState<number | undefined>(undefined);

	// Обновляем ширину при монтировании и изменении размера окна
	useEffect(() => {
		const updateWidth = () => {
			if (wrapperRef.current) {
				setWrapperWidth(wrapperRef.current.getBoundingClientRect().width);
			}
		};
		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	}, []);

	const selectedItem = useMemo(() => {
		return items?.find(item => item.value === value);
	}, [items, value])

	return (
		<div className={classNames(cls.wrapper, {}, [className])} ref={wrapperRef}>
			{label && (
				<span className={cls.label}>{label}</span>
			)}
			<HListBox
				as={'div'}
				className={cls.Listbox}
				value={value}
				onChange={onChange}
			>
				<HListBoxButton
					as={Button}
					className={cls.trigger}
					icon={arrowIcon}
					iconWidth={10}
					wrapperClassName={cls.iconWrapper}
				>
					{selectedItem?.content ?? defaultValue}
				</HListBoxButton>
				<HListBoxOptions
					className={cls.options}
					style={{ width: wrapperWidth }}
				>
					{items?.map(item => (
						<HListBoxOption
							key={item.value}
							value={item.value}
							disabled={item.disabled}
						>
							{({ focus, selected }) => (
								<li
									className={classNames(cls.option,
										{
											[cls.focus]: focus,
											[cls.disabled]: item.disabled,
											[cls.selected]: selected
										},
										[]
									)}
								>
									{item.content}
								</li>
							)}
						</HListBoxOption>
					))}
				</HListBoxOptions>
			</HListBox>
		</div>
	);
});
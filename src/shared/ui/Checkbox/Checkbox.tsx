import { InputHTMLAttributes, memo, ReactElement } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Checkbox.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

interface CheckboxProps extends HTMLInputProps {
	className?: string;
	checked?: boolean;
	onChange?: (value: boolean) => void;
	label?: string | ReactElement;
	variant?: 'default' | 'square' | 'round';
	disabled?: boolean;
	isError?: boolean;
}

export const Checkbox = memo((props: CheckboxProps) => {
	const {
		className,
		checked = false,
		onChange,
		label,
		variant = 'default',
		disabled = false,
		isError = false,
		...otherProps
	} = props;

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.checked);
	};

	const mods: Mods = {
		[cls.disabled]: disabled,
		[cls.isError]: isError,
	};

	return (
		<div className={classNames(cls.CheckboxWrapper, mods, [className, cls[variant]])}>
			<label className={cls.label}>
				<input
					type="checkbox"
					checked={checked}
					onChange={onChangeHandler}
					disabled={disabled}
					className={cls.input}
					{...otherProps}
				/>
				<span className={cls.checkmark}></span>
				{label && <span className={cls.labelText}>{label}</span>}
			</label>
		</div>
	);
});
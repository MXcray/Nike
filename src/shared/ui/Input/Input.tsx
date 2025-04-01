import { InputHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Input.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'required'
>;

type InputVariant = 'default' | 'underline' | 'split';

interface InputProps extends HTMLInputProps{
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	label?: string;
	required?: boolean;
	autofocus?: boolean;
	variant?: InputVariant;
	withBtn?: ReactNode;
	btnWrap?: boolean;
	btnGap?: number;
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		label,
		onChange,
		type = 'text',
		placeholder,
		autofocus = false,
		withBtn,
		btnWrap = false,
		required = false,
		btnGap,
		variant = 'default',
		...otherProps
	} = props;

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	}

	const mods: Mods = {
		[cls.btnWrapped]: btnWrap,
	}

	const input = (
		<div className={classNames(cls.InputWrapper, mods, [className, cls[variant]])} style={{ gap: btnGap }}>
			<div className={cls.border}>
				<input
					className={classNames(cls.input, {}, [cls[variant]])}
					type={type}
					value={value}
					onChange={onChangeHandler}
					placeholder={placeholder}
					autoFocus={autofocus}
					{...otherProps}
				/>
				{withBtn && withBtn}
			</div>
		</div>
	);

	if (label) {
		return (
			<div className={cls.labelWrapper}>
				<span className={classNames(cls.label, {}, [cls[variant]])}>
					{label}
					{required && <sup> *</sup>}
				</span>
				{input}
			</div>
		);
	}

	return input;

});
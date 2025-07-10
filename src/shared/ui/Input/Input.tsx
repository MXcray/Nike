import { InputHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Input.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { IMaskInput } from 'react-imask';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'required'
>;

type InputVariant = 'default' | 'underline' | 'split';

interface MaskOptions {
	mask?: string;
	unmask?: boolean;
	lazy?: boolean;
	placeholderChar?: string;
}

interface InputProps extends HTMLInputProps{
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	label?: string;
	required?: boolean;
	isError?: boolean;
	autofocus?: boolean;
	variant?: InputVariant;
	withBtn?: ReactNode;
	btnWrap?: boolean;
	btnGap?: number;
	mask?: MaskOptions;
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
		isError = false,
		btnGap,
		variant = 'default',
		mask,
		...otherProps
	} = props;

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	}

	const onAcceptHandler = (value: string) => {
		onChange?.(value);
	}

	const mods: Mods = {
		[cls.btnWrapped]: btnWrap,
		[cls.isError]: isError,
	}

	const inputElement = mask ? (
		<IMaskInput
			className={classNames(cls.input, {}, [cls[variant]])}
			mask={mask?.mask}
			value={value?.toString() || ''}
			onAccept={onAcceptHandler}
			placeholder={placeholder}
			unmask={mask?.unmask}
			lazy={mask?.lazy}
			placeholderChar={mask.placeholderChar}
			{...otherProps}
		/>
	) : (
		<input
			className={classNames(cls.input, {}, [cls[variant]])}
			type={type}
			value={value}
			onChange={onChangeHandler}
			placeholder={placeholder}
			autoFocus={autofocus}
			{...otherProps}
		/>
	);

	const input = (
		<div className={classNames(cls.InputWrapper, mods, [className, cls[variant]])} style={{ gap: btnGap }}>
			<div className={cls.border}>
				{inputElement}
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
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
	wrapperClassName?: string;
	className?: string;
	Svg: React.FC<React.SVGProps<SVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
	clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
	clickable: true;
	onClick: () => void;
	disabled?: boolean;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
	const {
		wrapperClassName,
		className,
		Svg,
		width = 15,
		height = 15,
		clickable,
		...otherProps
	} = props;

	// Обработчик клика с остановкой всплытия события
	const handleClick = (event: React.MouseEvent) => {
		event.preventDefault(); // Также предотвращаем действие по умолчанию

		// Вызываем onClick только если он есть
		if (clickable && props.onClick) {
			props.onClick();
		}
	};

	const icon = (
		<Svg
			className={classNames(cls.Icon, {}, [className])}
			// otherProps обязательно выше, что бы onClick не вызывался на обоих компонентах
			{...otherProps}
			width={width}
			height={height}
			onClick={undefined}
		/>
	);

	if (clickable) {
		return (
			<button
				className={wrapperClassName}
				type={'button'}
				onClick={handleClick}
				disabled={props.disabled}
			>
				{icon}
			</button>
		);
	}

	if (wrapperClassName) {
		return <div className={wrapperClassName}>{icon}</div>;
	}

	return icon;
});

Icon.displayName = 'Icon';
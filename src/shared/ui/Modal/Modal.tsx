import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './Modal.module.scss';
import { Portal } from '@/shared/ui/Portal/Portal.tsx';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

export const Modal = memo((props: ModalProps) => {
	const {
		className,
		children,
		isOpen,
		onClose,
		lazy,
	} = props;

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const closeHandler = useCallback(() => {
		if (onClose) {
			onClose();
		}
	}, [onClose]);

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const mods = {
		[cls.opened]: isOpen,
	};

	// Если включена ленивая загрузка и компонент не был смонтирован, не рендерим ничего
	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className])}>
				<div
					className={cls.overlay}
					onClick={closeHandler}
				>
					<div
						className={cls.content}
						onClick={onContentClick}
					>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
});
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';
import { CSSProperties, memo } from 'react';

interface SkeletonProps {
	className?: string;
	height?: string | number;
	width?: string | number;
	borderRad?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
	const { className, height, width, borderRad } = props;

	const styles: CSSProperties = {
		width,
		height,
		borderRadius: borderRad,
	};

	return (
		<div className={classNames(cls.Skeleton, {}, [className])} style={styles} />
	);
});

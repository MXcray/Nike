import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './SocialWarning.module.scss';

interface SocialWarningProps {
	className?: string;
}

export const SocialWarning = memo((props: SocialWarningProps) => {
	const {
		className,
	} = props;

	return (
			<span className={classNames(cls.SocialWarning, {}, [className])}>
				Instagram является запрещенной соц.сетью в РФ
			</span>
	);
});
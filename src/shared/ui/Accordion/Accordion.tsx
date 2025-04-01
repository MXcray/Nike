import React, { memo, ReactElement, ReactNode } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './Accordion.module.scss';
import Arrow from '@/shared/assets/icons/accordion-arrow.svg?react';
import { Icon } from '../Icon/Icon.tsx';
import { AnimatePresence, motion } from 'motion/react';

type arrowPaddingType = 'default' | 'max';
type textAlignType = 'default' | 'center';

interface AccordionProps {
	className?: string;
	titleClassName?: string;
	arrowClassName?: string;
	title: string;
	// content: ReactNode[] | ReactNode;
	children: ReactNode;
	arrowPadding?: arrowPaddingType;
	textAlign?: textAlignType;
}

export const Accordion = memo((props: AccordionProps) => {
	const {
		className,
		title,
		titleClassName,
		arrowClassName,
		children,
		arrowPadding = 'default',
		textAlign = 'default',
	} = props;

	return (
		<Disclosure
			className={classNames(cls.Accordion, {}, [className])}
			as={'div'}
		>
			{({ open }) => (
				<>
					<DisclosureButton
						className={classNames( cls.btn,{},[titleClassName, cls[arrowPadding], cls[textAlign]])}
					>
						{title}
						<Icon
							className={
								classNames(cls.arrow, { [cls.opened] : open }, [arrowClassName, cls[arrowPadding]])
							}
							Svg={Arrow}
							width={10}
							height={10}
						/>
					</DisclosureButton>

					<AnimatePresence initial={false}>
						{open && (
							<DisclosurePanel static>
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{
										height: {
											type: 'spring',
											stiffness: 500,
											damping: 50,
										},
										opacity: { duration: 0.2 }
									}}
									className={cls.panel}
								>
									{children}
								</motion.div>
							</DisclosurePanel>
						)}
					</AnimatePresence>
				</>
				)}
		</Disclosure>
	)
});

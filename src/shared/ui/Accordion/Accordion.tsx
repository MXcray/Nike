import React, { ReactElement, ReactNode } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { classNames } from '../../lib/classNames/classNames.ts';
import cls from './Accordion.module.scss';
import Arrow from '../../assets/icons/accordion-arrow.svg?react';
import { Icon } from '../Icon/Icon.tsx';
import { AnimatePresence, motion } from 'motion/react';

type arrowPaddingType = 'default' | 'max';

interface AccordionProps {
	className?: string;
	title: string;
	// content: ReactNode[] | ReactNode;
	children: ReactNode;
	arrowPadding?: arrowPaddingType;
}

export const Accordion = (props: AccordionProps) => {
	const {
		className,
		title,
		// content,
		children,
		arrowPadding = 'default',
	} = props;

	// const renderContent = () => (
	// 	Array.isArray(content)
	// 		? content.map((item, index) => (
	// 			<div key={index}>{item}</div>
	// 		))
	// 		: content
	// )

	return (
		<Disclosure
			className={classNames(cls.Accordion, {}, [className])}
			as={'div'}
		>
			{({ open }) => (
				<>
					<DisclosureButton className={cls.btn}>
						{title}
						<Icon
							className={classNames(cls.arrow, { [cls.opened] : open }, [cls[arrowPadding]])}
							Svg={Arrow}
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
										duration: 0.3,
										height: {
											type: 'spring',
											stiffness: 500,
											damping: 30
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
};

import { memo, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	container?: HTMLElement;
}

export const Portal = memo((props: PortalProps) => {
	const {
		children,
		container = document.body,
	} = props;

	return createPortal(children, container);
});
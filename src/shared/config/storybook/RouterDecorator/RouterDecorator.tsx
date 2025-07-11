import { MemoryRouter } from 'react-router-dom';
import type { Decorator } from '@storybook/react';

export const RouterDecorator: Decorator = (Story, context) => {
	return (
		<MemoryRouter initialEntries={['/']}>
			<Story {...context} />
		</MemoryRouter>
	);
};
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';

const meta = {
	title: 'Pages/ProductDetailsPage',
	component: ProductDetailsPage,
	tags: ['autodocs'],
	args: {},
	parameters: {
		router: {
			path: '/product/:id',
			initialEntry: '/product/1',
			useRoutes: true
		}
	}
} satisfies Meta<typeof ProductDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
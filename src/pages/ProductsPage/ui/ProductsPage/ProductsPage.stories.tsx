import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductsPage } from './ProductsPage';

const meta = {
	title: 'Pages/ProductsPage',
	component: ProductsPage,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof ProductsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
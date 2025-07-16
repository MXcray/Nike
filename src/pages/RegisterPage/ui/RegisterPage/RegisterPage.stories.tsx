import type { Meta, StoryObj } from '@storybook/react-vite';
import { RegisterPage } from '@/pages/RegisterPage';

const meta = {
	title: 'Pages/RegisterPage',
	component: RegisterPage,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
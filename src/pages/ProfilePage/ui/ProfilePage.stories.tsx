import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfilePage } from '@/pages/ProfilePage';

const meta = {
	title: 'Pages/ProfilePage',
	component: ProfilePage,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};